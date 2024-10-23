
import { GameplayScene } from "../scenes/GameplayScene.js"
import { MainMenu } from "../scenes/MainMenu.js"
import { AssetLoader } from "./AssetLoader.js"

const assetLoader = new AssetLoader()

const sceneContainerWidth = 1000 + 250
const sceneContainerHeight = 1000
export class Game {
    constructor() {
        this.mapSize = 1000
        this.dimensions = 25
        this.app = new PIXI.Application({width: window.outerWidth, height: window.outerHeight})
        this.baseContainer = new PIXI.Container()
        this.sceneContainer = undefined
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
        await assetLoader.loadOtherImagesSprites()

        this.app.stage.addChild(this.baseContainer)
        const frame = new PIXI.Graphics()
        frame.beginFill(0x000005)
        frame.drawRect(0,0,window.outerWidth, window.outerHeight)
        frame.endFill()

        this.baseContainer.addChild(frame)

        this.sceneContainer = new PIXI.Container()
        const innerFrame = new PIXI.Graphics()
        innerFrame.beginFill(0x000000)
        innerFrame.drawRect(0, 0, sceneContainerWidth, sceneContainerHeight)
        innerFrame.endFill()
        this.sceneContainer.addChild(innerFrame)

        this.baseContainer.addChild(this.sceneContainer)
        this.sceneContainer.x = (this.baseContainer.width - this.sceneContainer.width)/2
    }

    run() {

        const mainMenu = new MainMenu(this.app)
        mainMenu.setupUI(this.sceneContainer)
        this.sceneContainer.addChild(mainMenu.container)
        // const gameplayScene = new GameplayScene(this.app)
        // gameplayScene.buildMap()
        // this.sceneContainer.addChild(gameplayScene.container)
    }
}