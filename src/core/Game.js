
import { GameplayScene } from "../scenes/GameplayScene.js"
import { AssetLoader } from "./AssetLoader.js"
import { GameState } from "./GameState.js"

export class Game {
    constructor() {
        this.mapSize = 1000
        this.dimensions = 25
        this.app = new PIXI.Application({width: this.mapSize + 250, height: this.mapSize})
        this.gameState = new GameState()
        this.gameplayScene = undefined
        this.assetLoader = new AssetLoader()
    }

    start() {
        this.setup().then(() => this.run())
    }

    async setup() {
        await this.assetLoader.bundleAssets()
        await this.assetLoader.loadEnemySprites()
        await this.assetLoader.loadIconSprites()
        await this.assetLoader.loadTowerSprites()
        this.gameplayScene = new GameplayScene(this.gameState, this.app)
        this.gameplayScene.buildMap()
    }

    run() {
        //add to DOM
        document.body.appendChild(this.app.view)
        this.app.stage.addChild(this.gameplayScene.container)
        this.gameplayScene.playTest()
    }
}