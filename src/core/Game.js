
import { GameplayScene } from "../scenes/GameplayScene.js"
import { AssetLoader } from "./AssetLoader.js"
import { GameState } from "./GameState.js"

const assetLoader = new AssetLoader()

export class Game {
    constructor() {
        this.mapSize = 1000
        this.dimensions = 25
        this.app = new PIXI.Application({width: window.outerWidth, height: window.outerHeight})
        this.baseContainer = new PIXI.Container()
        this.sceneContainer = undefined
        console.log(window);
        //add to DOM
        document.body.appendChild(this.app.view)
    }

    start() {
        this.setup().then(() => this.run())
    }

    async setup() {
        assetLoader.bundleAssets()
        await assetLoader.loadEnemySprites()
        await assetLoader.loadIconSprites()
        await assetLoader.loadTowerSprites()

        this.app.stage.addChild(this.baseContainer)
        const frame = new PIXI.Graphics()
        frame.beginFill(0x000011)
        frame.drawRect(0,0,3000,3000)
        frame.endFill()

        this.baseContainer.addChild(frame)

        this.sceneContainer = new PIXI.Container()
        // const innerFrame = new PIXI.Graphics()
        // innerFrame.beginFill(0x000000)
        // innerFrame.drawRect(0,0,400, 400)
        // innerFrame.endFill()
        // this.sceneContainer.addChild(innerFrame)

        this.baseContainer.addChild(this.sceneContainer)
        this.sceneContainer.x = (this.baseContainer.width - this.sceneContainer.width)/8
        // this.sceneContainer.y = (this.baseContainer.height - this.sceneContainer.height)/2
    }

    run() {
        const gameplayScene = new GameplayScene(this.app)
        gameplayScene.buildMap()
        this.sceneContainer.addChild(gameplayScene.container)
    }
}