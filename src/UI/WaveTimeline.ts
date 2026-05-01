import { WaveManager } from "src/managers/WaveManager";
import * as PIXI from "pixi.js";
import { UIHelper } from "./UIHelper";
import { EventDispatcher } from "../utils/EventDispatcher";
import { HUD } from "./HUD";
import { InfoPanel } from "./InfoPanel";

const eventDispatcher = new EventDispatcher()

const timelineWidth = 50
const timeToYScaleFactor = 100

type SmokeParticle = {
    graphics: PIXI.Graphics
    vx: number
    vy: number
    life: number
    maxLife: number
    drift: number
    baseAlpha: number
}

function parseHexColour(s: string): number {
    const n = parseInt(String(s).replace(/^0x/i, ""), 16)
    return Number.isFinite(n) ? n : 0xe7e7e7
}

function mixColour(smoke: number, accent: number, t: number): number {
    const ar = (smoke >> 16) & 0xff
    const ag = (smoke >> 8) & 0xff
    const ab = smoke & 0xff
    const br = (accent >> 16) & 0xff
    const bg = (accent >> 8) & 0xff
    const bb = accent & 0xff
    const r = Math.round(ar + (br - ar) * t)
    const g = Math.round(ag + (bg - ag) * t)
    const b = Math.round(ab + (bb - ab) * t)
    return (r << 16) | (g << 8) | b
}

export class WaveTimeline {
    container: PIXI.Container<PIXI.DisplayObject>;
    waveManager: WaveManager;
    waveBlocks: PIXI.Container<PIXI.DisplayObject>[];
    innerContainer: PIXI.Container<PIXI.DisplayObject>;
    hud: HUD
    private readonly particleLayer: PIXI.Container<PIXI.DisplayObject>
    private readonly smokeParticles: SmokeParticle[] = []
    private readonly smokeTickBound: (delta: number) => void
    private smokeSpawnBudget = 0
    private smokeBedLeft = 0
    private smokeBedTop = 0
    private smokeBedW = 0
    private smokeBedH = 0
    private smokeEffectAccent = 0xe7e7e7
    private readonly onWaveStartedBound: () => void

    /**
     *
     */
    constructor(waveManager: WaveManager, hud: HUD) {
        this.container = new PIXI.Container()
        this.container.zIndex = 100
        this.waveBlocks = []
        this.waveManager = waveManager
        this.hud = hud
        this.smokeTickBound = this.tickSmokeParticles.bind(this)
        this.onWaveStartedBound = () => this.onWaveStarted()

        const bg = new PIXI.Graphics()
        bg.lineStyle(1, 0x770000)
        bg.beginFill(0x111111)
        bg.drawRect(timelineWidth, 0, 50, 1000)
        bg.endFill()
        this.container.addChild(bg)

        this.innerContainer = new PIXI.Container()
        this.container.addChild(this.innerContainer)

        this.particleLayer = new PIXI.Container()
        this.particleLayer.zIndex = 200
        this.container.sortableChildren = true
        this.container.addChild(this.particleLayer)

        PIXI.Ticker.shared.add(this.smokeTickBound)

        eventDispatcher.on("waveStarted", this.onWaveStartedBound)
        eventDispatcher.on("boss1Killed", () => {

            if (this.waveManager.difficulty === "1Pill2Nil") {
                return
            }
            this.renderNextWaves()
        })
        eventDispatcher.on("boss2Killed", () => {
            if (this.waveManager.difficulty === "1Pill2Nil") {
                return
            }
            this.renderNextWaves()
        })
        eventDispatcher.on("boss3Killed", () => {
            if (this.waveManager.difficulty === "1Pill2Nil") {
                return
            }
            this.renderNextWaves()
        })
        eventDispatcher.on("boss4Killed", () => {
            if (this.waveManager.difficulty === "1Pill2Nil") {
                return
            }
            //chill mode has no waves past 80
            if (this.waveManager.bossWaves.find(wave => wave === 100)) {
                this.renderNextWaves()
            }
        })

        this.renderNextWaves()

    }

    cleanUpResources() {
        PIXI.Ticker.shared.remove(this.smokeTickBound)
        eventDispatcher.off("waveStarted", this.onWaveStartedBound)
        this.smokeParticles.forEach(p => {
            if (p.graphics.parent) {
                p.graphics.parent.removeChild(p.graphics)
            }
            p.graphics.destroy()
        })
        this.smokeParticles.length = 0
        this.smokeSpawnBudget = 0
    }

    private onWaveStarted() {
        const waveIndex = this.waveManager.currentWave - 1
        this.smokeEffectAccent = this.smokeAccentColour(waveIndex)
        let captured = false

        const first = this.innerContainer.children[0] as PIXI.DisplayObject | undefined
        if (first) {
            const lb = first.getLocalBounds()
            const corners = [
                { x: lb.x, y: lb.y },
                { x: lb.x + lb.width, y: lb.y },
                { x: lb.x, y: lb.y + lb.height },
                { x: lb.x + lb.width, y: lb.y + lb.height }
            ]
            let minX = Infinity
            let minY = Infinity
            let maxX = -Infinity
            let maxY = -Infinity
            for (const c of corners) {
                const g = first.toGlobal(c)
                const l = this.particleLayer.toLocal(g)
                minX = Math.min(minX, l.x)
                minY = Math.min(minY, l.y)
                maxX = Math.max(maxX, l.x)
                maxY = Math.max(maxY, l.y)
            }
            this.smokeBedLeft = minX
            this.smokeBedTop = minY
            this.smokeBedW = Math.max(8, maxX - minX)
            this.smokeBedH = Math.max(8, maxY - minY)
            captured = this.smokeBedW > 0 && this.smokeBedH > 0
        }

        this.renderNextWaves()

        if (!captured) {
            return
        }

        this.smokeSpawnBudget = 32
        this.spawnSmokeBurst(this.smokeBedLeft, this.smokeBedTop, this.smokeBedW, this.smokeBedH, this.smokeEffectAccent, 48)
    }

    private smokeAccentColour(waveIndex: number): number {
        if (this.waveManager.isFreeplay || waveIndex < 0 || waveIndex >= this.waveManager.waves.length) {
            return 0xff00ff
        }
        const { outlineColour } = this.determineWaveStoneColours(waveIndex)
        return parseHexColour(outlineColour)
    }

    private spawnSmokeBurst(left: number, top: number, w: number, h: number, accent: number, count: number) {
        const baseSmoke = 0x2a2a2a
        for (let i = 0; i < count; i++) {
            const x = left + Math.random() * w
            const y = top + Math.random() * h
            const colour = mixColour(baseSmoke, accent, 0.25 + Math.random() * 0.55)
            const radius = 1.8 + Math.random() * 4.5
            const graphics = new PIXI.Graphics()
            graphics.beginFill(colour)
            graphics.drawCircle(0, 0, radius)
            graphics.endFill()
            graphics.x = x
            graphics.y = y
            const baseAlpha = 0.38 + Math.random() * 0.42
            graphics.alpha = baseAlpha
            this.particleLayer.addChild(graphics)

            const maxLife = 55 + Math.random() * 50
            this.smokeParticles.push({
                graphics,
                vx: (Math.random() - 0.5) * 0.35,
                vy: -0.25 - Math.random() * 0.85,
                life: maxLife,
                maxLife,
                drift: (Math.random() - 0.5) * 0.012,
                baseAlpha
            })
        }
    }

    private tickSmokeParticles(delta: number) {
        if (this.smokeSpawnBudget > 0) {
            const perFrame = 2 + Math.floor(Math.random() * 2)
            for (let s = 0; s < perFrame && this.smokeSpawnBudget > 0; s++) {
                this.spawnSmokeBurst(
                    this.smokeBedLeft,
                    this.smokeBedTop,
                    this.smokeBedW,
                    this.smokeBedH,
                    this.smokeEffectAccent,
                    1
                )
                this.smokeSpawnBudget--
            }
        }

        for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
            const p = this.smokeParticles[i]
            p.life -= delta
            if (p.life <= 0) {
                if (p.graphics.parent) {
                    p.graphics.parent.removeChild(p.graphics)
                }
                p.graphics.destroy()
                this.smokeParticles.splice(i, 1)
                continue
            }
            p.vx += p.drift * delta
            p.graphics.x += p.vx * delta
            p.graphics.y += p.vy * delta
            const t = p.life / p.maxLife
            p.graphics.alpha = p.baseAlpha * t
            p.graphics.scale.set(1 + (1 - t) * 0.75)
        }
    }

    render() {
        this.innerContainer.y = this.waveManager.cooldownToNextWave / timeToYScaleFactor
    }

    renderNextWaves() {
        this.innerContainer.y = this.waveManager.cooldownToNextWave / timeToYScaleFactor
        this.innerContainer.removeChildren()


        //stone position and size are based on time till that wave arrives, and the length of the wave
        let timeToWaveStart = 0
        let numberofWaveStones = 5
        if (this.waveManager.checkpointWave - this.waveManager.currentWave < 5 && !this.waveManager.isFreeplay) {
            numberofWaveStones = this.waveManager.checkpointWave - this.waveManager.currentWave
        }

        const startIndex = this.waveManager.currentWave

        // if (this.waveManager.wavesStarted) {
        //     startIndex = this.waveManager.currentWave
        // }
        if (!this.waveManager.isFreeplay) {
            //regular waves
            for (let i = startIndex; i < this.waveManager.currentWave + numberofWaveStones; i++) {
                timeToWaveStart = this.buildWaveStone(i, timeToWaveStart);
            }
        } else {
            //freeplay waves
            for (let i = 0; i < 10; i++) {
                timeToWaveStart = this.buildWaveStoneFreeplay(i, timeToWaveStart) || 0
            }
        }



    }

    private buildWaveStone(i: number, timeToWaveStart: number) {
        const currentWave = this.waveManager.waves[i]
        const waveNumber = i + 1
        const interWaveDelaySeconds = this.waveManager.getDelaySecondsAfterWave(waveNumber)
        const stoneHeight = (currentWave.waveDurationMillis() + interWaveDelaySeconds * 1000) / timeToYScaleFactor


        const waveStone = new PIXI.Graphics()

        const { outlineColour, colour } = this.determineWaveStoneColours(i);

        waveStone.lineStyle(1, outlineColour)
        waveStone.beginFill(colour)
        waveStone.drawRect(50, timeToWaveStart / timeToYScaleFactor, 50, stoneHeight)
        waveStone.endFill()
        this.innerContainer.addChild(waveStone)
        waveStone.on("pointerdown", () => {
            const infoPanel = InfoPanel.createWaveInfoPanel(waveNumber, currentWave, outlineColour)
            this.hud.clearInfoPanel()
            this.hud.infoPanel?.addChild(infoPanel)
        })
        waveStone.eventMode = "static"

        const txtWaveNumber = UIHelper.createText(0, 0, `${waveNumber}`, 50, outlineColour)
        txtWaveNumber.x = 50;
        txtWaveNumber.y = timeToWaveStart / timeToYScaleFactor
        txtWaveNumber.pivot.set(txtWaveNumber.width, 0)
        txtWaveNumber.rotation = -Math.PI/2
        this.innerContainer.addChild(txtWaveNumber)

        timeToWaveStart += (currentWave.waveDurationMillis() + interWaveDelaySeconds * 1000)
        return timeToWaveStart
    }

    private determineWaveStoneColours(i: number) {
        let outlineColour = "0xE7E7E7";
        let colour = 0x333333;

        //wave 21-39 colours
        if (i >= 20 && i < 40) {
            outlineColour = "0xF7FF68";
            colour = 0x303030;
        }
        if (i >= 40 && i < 60) {
            outlineColour = "0x00FFD0";
            colour = 0x2A2A2A;
        }
        if (i >= 60 && i < 80) {
            outlineColour = "0xE100FF";
            colour = 0x222222;
        }
        if (i >= 80 && i < 100) {
            outlineColour = "0xFF140C";
            colour = 0x171717;
        }


        // boss #1 marker
        if (this.waveManager.waves[i].waveParts.find(wavePart => wavePart.enemy === "Brave Proxima Centauri")) {
            outlineColour = "0xFFEE00";
            colour = 0x7C2F00;
        }
        // boss #2 marker
        if (this.waveManager.waves[i].waveParts.find(wavePart => wavePart.enemy === "Serious Sirius")) {
            outlineColour = "0x337777";
            colour = 0xAAFFFF;
        }
        // boss #3 marker
        if (this.waveManager.waves[i].waveParts.find(wavePart => wavePart.enemy === "Remorseless Rigel")) {
            outlineColour = "0x0000FF";
            colour = 0x609EFF;
        }
        // boss #4 marker
        if (this.waveManager.waves[i].waveParts.find(wavePart => wavePart.enemy === "Unforgiving Stephenson 2-18")) {
            outlineColour = "0xFF0000";
            colour = 0xFFFF00;
        }
        // boss #5 marker
        if (this.waveManager.waves[i].waveParts.find(wavePart => wavePart.enemy === "TON 618")) {
            outlineColour = "0xFFFFFF";
            colour = 0x000000;
        }

        //red waves
        if (this.waveManager.waves[i].waveParts.find(wavePart => wavePart.enemy === "Merciless Loch Ness")) {
            outlineColour = "0xFF0000";
            colour = 0x220000;
        }
        return { outlineColour, colour };
    }

    private buildWaveStoneFreeplay(i: number, timeToWaveStart: number) {
        if (!this.waveManager.extraWaves) {
            return
        }
        const currentWave = this.waveManager.extraWaves[i]

        const waveNumber = this.waveManager.currentWave + i + 1
        const interWaveDelaySeconds = this.waveManager.getDelaySecondsAfterWave(waveNumber)
        const stoneHeight = (currentWave.waveDurationMillis() + interWaveDelaySeconds * 1000) / timeToYScaleFactor



        const waveStone = new PIXI.Graphics()
        waveStone.lineStyle(1, 0xFF00FF)
        waveStone.beginFill(0x360077)
        waveStone.drawRect(50, timeToWaveStart / timeToYScaleFactor, 50, stoneHeight)
        waveStone.endFill()
        this.innerContainer.addChild(waveStone)
        waveStone.on("pointerdown", () => {
            const infoPanel = InfoPanel.createWaveInfoPanel(waveNumber, currentWave, "0xFF00FF")
            this.hud.clearInfoPanel()
            this.hud.infoPanel?.addChild(infoPanel)
        })
        waveStone.eventMode = "static"

        const txtWaveNumber = UIHelper.createText(0, 0, `${waveNumber}`, 50, "0xFF00FF")
        txtWaveNumber.x = 50;
        txtWaveNumber.y = timeToWaveStart / timeToYScaleFactor
        txtWaveNumber.pivot.set(txtWaveNumber.width, 0)
        txtWaveNumber.rotation = -Math.PI/2
        this.innerContainer.addChild(txtWaveNumber)

        timeToWaveStart += (currentWave.waveDurationMillis() + interWaveDelaySeconds * 1000)
        return timeToWaveStart
    }
}