import { WaveManager } from "src/managers/WaveManager";
import * as PIXI from "pixi.js";
import { UIHelper } from "./UIHelper";
import { EventDispatcher } from "../utils/EventDispatcher";
import { HUD } from "./HUD";
import { InfoPanel } from "./InfoPanel";

const eventDispatcher = new EventDispatcher()

const timelineWidth = 50
const timeToYScaleFactor = 100

export class WaveTimeline {
    container: PIXI.Container<PIXI.DisplayObject>;
    waveManager: WaveManager;
    waveBlocks: PIXI.Container<PIXI.DisplayObject>[];
    innerContainer: PIXI.Container<PIXI.DisplayObject>;
    hud: HUD

    /**
     *
     */
    constructor(waveManager: WaveManager, hud: HUD) {
        this.container = new PIXI.Container()
        this.waveBlocks = []
        this.waveManager = waveManager
        this.hud = hud
        const bg = new PIXI.Graphics()
        bg.lineStyle(1, 0x770000)
        bg.beginFill(0x111111)
        bg.drawRect(timelineWidth, 0, 50, 1000)
        bg.endFill()
        this.container.addChild(bg)

        this.innerContainer = new PIXI.Container()
        this.container.addChild(this.innerContainer)

        eventDispatcher.on("waveStarted", () => this.renderNextWaves())
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
        const stoneHeight = (currentWave.waveDurationMillis() + this.waveManager.delaySecondsToNextWave * 1000) / timeToYScaleFactor


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

        timeToWaveStart += (currentWave.waveDurationMillis() + this.waveManager.delaySecondsToNextWave * 1000)
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
        const stoneHeight = (currentWave.waveDurationMillis() + this.waveManager.delaySecondsToNextWave * 1000) / timeToYScaleFactor



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

        timeToWaveStart += (currentWave.waveDurationMillis() + this.waveManager.delaySecondsToNextWave * 1000)
        return timeToWaveStart
    }
}