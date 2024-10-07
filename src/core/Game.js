
import { WaveManager } from "../managers/WaveManager.js"
import { GameplayScene } from "../scenes/GameplayScene.js"
import { TdMap } from "../objects/TdMap.js"
import { AssetLoader } from "./AssetLoader.js"
import { GameState } from "./GameState.js"

export class Game {
    constructor() {
        this.mapSize = 1000
        this.dimensions = 25
        this.app = new PIXI.Application({width: this.mapSize + 250, height: this.mapSize})
        this.gameState = new GameState()
        // this.towerMapScene = new TdMap(this.mapSize, this.mapSize, this.dimensions)
        this.testWaveManager = new WaveManager()
        this.gameplayScene = undefined

        this.assetLoader = new AssetLoader()

        this.setup().then(() => this.playtest())

    }

    async setup() {
        
        this.gameplayScene = new GameplayScene()
        this.gameplayScene.buildMap()
        // let gameplayScene = this.gameplayScene
        await this.assetLoader.loadAssets()
    }

    playtest() {
        //add to DOM
        document.body.appendChild(this.app.view)
        this.app.stage.addChild(this.gameplayScene.container)

        
        this.testWaveManager.sendWave(this.app, this.gameplayScene.tdMap)
    }
}