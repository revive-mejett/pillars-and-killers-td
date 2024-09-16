import { WaveManager } from "../objects/WaveManager.js"
import { displayPath, displayTiles, TdMap } from "../TdMap.js"
import { AssetLoader } from "./AssetLoader.js"

export class Game {
    constructor() {
        this.mapSize = 1100
        this.dimensions = 25
        this.app = new PIXI.Application({width: this.mapSize, height: this.mapSize})
        this.towerMapScene = new TdMap(this.mapSize, this.mapSize, this.dimensions)

        //game states
        this.lives = 100
        this.money = 300

        this.assetLoader = new AssetLoader()



        this.setup().then(() => this.playtest())

    }

    async setup() {
        await this.assetLoader.loadAssets()
    }

    playtest() {
        // add to DOM
        document.body.appendChild(this.app.view)

        this.testWaveManager = new WaveManager()

        this.testWaveManager.sendWave(this.app, this.towerMapScene)

        displayTiles(this.app, this.towerMapScene)
        displayPath(this.app, this.towerMapScene)
        this.testWaveManager.sendWave(this.app, this.towerMapScene)
    }
}