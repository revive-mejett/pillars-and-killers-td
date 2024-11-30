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

        eventDispatcher.on("waveStarted", () => this.render())

    }

    render() {
        console.log("re rendwer")
        this.innerContainer.y = this.waveManager.cooldownToNextWave / timeToYScaleFactor

        this.renderNextWaves()
    }

    renderNextWaves() {
        this.innerContainer.removeChildren()
        //render all wave stones, starting from wave 1
        


        //stone position and size are based on time till that wave arrives, and the length of the wave
        let timeToWaveStart = 0
        let numberofWaveStones = 5
        if (this.waveManager.waves.length - this.waveManager.currentWave < 5) {
            numberofWaveStones = this.waveManager.waves.length - this.waveManager.currentWave
        }

        const startIndex = this.waveManager.currentWave

        // if (this.waveManager.wavesStarted) {
        //     startIndex = this.waveManager.currentWave
        // }

        for (let i = startIndex; i < this.waveManager.currentWave + numberofWaveStones; i++) {
            const currentWave = this.waveManager.waves[i]
            const waveNumber = i + 1
            const stoneHeight = (currentWave.waveDurationMillis() + this.waveManager.delaySecondsToNextWave * 1000)



            const waveStone = new PIXI.Graphics()
            waveStone.lineStyle(1, 0x440000)
            waveStone.beginFill(0x222222)
            waveStone.drawRect(50, timeToWaveStart / timeToYScaleFactor, 50, stoneHeight)
            waveStone.endFill()
            this.innerContainer.addChild(waveStone)

            const txtWaveNumber = UIHelper.createText(0, 0, `${waveNumber}`, 50, "0xFFFFFF")
            txtWaveNumber.x = 50
            txtWaveNumber.y = timeToWaveStart / timeToYScaleFactor
            this.innerContainer.addChild(txtWaveNumber)

            timeToWaveStart += stoneHeight
        }

    }
}