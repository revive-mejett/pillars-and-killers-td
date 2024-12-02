import { WaveManager } from "src/managers/WaveManager";
import * as PIXI from "pixi.js";
import { UIHelper } from "./UIHelper";
import { EventDispatcher } from "../utils/EventDispatcher";

const eventDispatcher = new EventDispatcher()

const timelineWidth = 50
const timeToYScaleFactor = 100

export class WaveTimeline {
    container: PIXI.Container<PIXI.DisplayObject>;
    waveManager: WaveManager;
    waveBlocks: PIXI.Container<PIXI.DisplayObject>[];
    innerContainer: PIXI.Container<PIXI.DisplayObject>;

    /**
     *
     */
    constructor(waveManager: WaveManager) {
        this.container = new PIXI.Container()
        this.waveBlocks = []
        this.waveManager = waveManager
        const bg = new PIXI.Graphics()
        bg.lineStyle(1, 0x770000)
        bg.beginFill(0x111111)
        bg.drawRect(timelineWidth, 0, 50, 1000)
        bg.endFill()
        this.container.addChild(bg)

        this.innerContainer = new PIXI.Container()
        this.container.addChild(this.innerContainer)

        eventDispatcher.on("waveStarted", () => this.renderNextWaves())
        this.renderNextWaves()

    }

    render() {
        this.innerContainer.y = this.waveManager.cooldownToNextWave / timeToYScaleFactor
    }

    renderNextWaves() {
        this.innerContainer.y = this.waveManager.cooldownToNextWave / timeToYScaleFactor
        this.innerContainer.removeChildren()
        //render all wave stones, starting from wave 1
        console.log("render next waves")



        //stone position and size are based on time till that wave arrives, and the length of the wave
        let timeToWaveStart = 0
        let numberofWaveStones = 5
        if (this.waveManager.waves.length - this.waveManager.currentWave < 5 && !this.waveManager.isFreeplay) {
            numberofWaveStones = this.waveManager.waves.length - this.waveManager.currentWave
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

        let outlineColour = "0xE7E7E7"
        let colour = 0x333333

        if (this.waveManager.waves[i].waveParts.find(wavePart => wavePart.enemy === "Brave Proxima Centauri")) {
            outlineColour = "0xFFEE00"
            colour = 0x7C2F00
        }
        waveStone.lineStyle(1, outlineColour)
        waveStone.beginFill(colour)
        waveStone.drawRect(50, timeToWaveStart / timeToYScaleFactor, 50, stoneHeight)
        waveStone.endFill()
        this.innerContainer.addChild(waveStone)

        const txtWaveNumber = UIHelper.createText(0, 0, `${waveNumber}`, 50, outlineColour)
        txtWaveNumber.x = 50;
        txtWaveNumber.y = timeToWaveStart / timeToYScaleFactor
        txtWaveNumber.pivot.set(txtWaveNumber.width, 0)
        txtWaveNumber.rotation = -Math.PI/2
        this.innerContainer.addChild(txtWaveNumber)

        timeToWaveStart += (currentWave.waveDurationMillis() + this.waveManager.delaySecondsToNextWave * 1000)
        return timeToWaveStart
    }

    private buildWaveStoneFreeplay(i: number, timeToWaveStart: number) {
        if (!this.waveManager.extraWaves) {
            return
        }
        const currentWave = this.waveManager.extraWaves[i]

        const waveNumber = this.waveManager.currentWave + i
        const stoneHeight = (currentWave.waveDurationMillis() + this.waveManager.delaySecondsToNextWave * 1000) / timeToYScaleFactor



        const waveStone = new PIXI.Graphics()
        waveStone.lineStyle(1, 0xC7C7C7)
        waveStone.beginFill(0x999999)
        waveStone.drawRect(50, timeToWaveStart / timeToYScaleFactor, 50, stoneHeight)
        waveStone.endFill()
        this.innerContainer.addChild(waveStone)

        const txtWaveNumber = UIHelper.createText(0, 0, `${waveNumber}`, 50, "0xFFFFFF")
        txtWaveNumber.x = 50;
        txtWaveNumber.y = timeToWaveStart / timeToYScaleFactor
        txtWaveNumber.pivot.set(txtWaveNumber.width, 0)
        txtWaveNumber.rotation = -Math.PI/2
        this.innerContainer.addChild(txtWaveNumber)

        timeToWaveStart += (currentWave.waveDurationMillis() + this.waveManager.delaySecondsToNextWave * 1000)
        return timeToWaveStart
    }
}