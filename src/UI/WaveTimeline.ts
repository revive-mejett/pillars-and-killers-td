import { WaveManager } from "src/managers/WaveManager";
import * as PIXI from "pixi.js";
import { UIHelper } from "./UIHelper";

const timelineWidth = 50

export class WaveTimeline {
    container: PIXI.Container<PIXI.DisplayObject>;
    waveManager: WaveManager;

    /**
     *
     */
    constructor(waveManager : WaveManager) {
        this.container = new PIXI.Container()
        this.waveManager = waveManager
    }

    render() {
        this.container.removeChildren()
        const bg = new PIXI.Graphics()
        bg.lineStyle(1, 0x770000)
        bg.beginFill(0x111111)
        bg.drawRect(timelineWidth,0,50,1000)
        bg.endFill()
        this.container.addChild(bg)
        this.renderNextWaves()
    }

    renderNextWaves() {
        //render all wave stones, starting from wave 1
        const timeToYScaleFactor = 50

        //stone position and size are based on time till that wave arrives, and the length of the wave
        let timeToWaveStart = this.waveManager.cooldownToNextWave

        for (let i = this.waveManager.currentWave; i < this.waveManager.waves.length; i++) {
            const currentWave = this.waveManager.waves[i]
            const waveNumber = i + 1
            const waveStone = new PIXI.Graphics()
            waveStone.lineStyle(1, 0x440000)
            waveStone.beginFill(0x222222)
            waveStone.drawRect(50,timeToWaveStart/timeToYScaleFactor, 50, currentWave.waveDurationMillis()/timeToYScaleFactor)
            waveStone.endFill()
            this.container.addChild(waveStone)
            const txtWaveNumber = UIHelper.createText(0,0,`${waveNumber}`, 50, "0xFFFFFF")
            txtWaveNumber.x = 50
            txtWaveNumber.y = timeToWaveStart/timeToYScaleFactor
            this.container.addChild(txtWaveNumber)
            timeToWaveStart += currentWave.waveDurationMillis()
        }

    }
}