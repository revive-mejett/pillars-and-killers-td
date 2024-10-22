
import { GameplayScene } from "../scenes/GameplayScene.js"
import { AssetLoader } from "./AssetLoader.js"
import { GameState } from "./GameState.js"

const assetLoader = new AssetLoader()

export class Game {
    constructor() {
        this.mapSize = 1000
        this.dimensions = 25
        this.app = new PIXI.Application({width: this.mapSize + 250, height: this.mapSize})
        this.gameplayScene = undefined
    }

    start() {
        this.setup().then(() => this.run())
    }

    async setup() {
        assetLoader.bundleAssets()
        await assetLoader.loadEnemySprites()
        await assetLoader.loadIconSprites()
        await assetLoader.loadTowerSprites()
        this.gameplayScene = new GameplayScene(this.app)
        this.gameplayScene.buildMap()
    }

    run() {
        //add to DOM
        document.body.appendChild(this.app.view)
        this.app.stage.addChild(this.gameplayScene.container)
    }
}