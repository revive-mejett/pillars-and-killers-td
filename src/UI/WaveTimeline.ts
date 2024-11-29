import { WaveManager } from "src/managers/WaveManager";
import * as PIXI from "pixi.js";

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
}