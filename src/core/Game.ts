
import { SceneManager } from "../managers/SceneManager"
import { GameOver } from "../scenes/GameOver"
import { GameplayScene } from "../scenes/GameplayScene"
import { MainMenu } from "../scenes/MainMenu"
import { EventDispatcher } from "../utils/EventDispatcher"
import { AssetLoader } from "./AssetLoader"
import * as PIXI from "pixi.js";

const assetLoader = new AssetLoader()
const eventDispatcher = new EventDispatcher()

const sceneContainerWidth = 1000 + 250
const sceneContainerHeight = 1000
export class Game {
    mapSize: number
    dimensions: number
    app: PIXI.Application<PIXI.ICanvas>
    baseContainer: PIXI.Container<PIXI.DisplayObject>
    sceneContainer?: PIXI.Container
    sceneManager?: SceneManager

    constructor() {
        this.mapSize = 1000
        this.dimensions = 25
        this.app = new PIXI.Application({width: window.outerWidth, height: window.outerHeight})
        this.baseContainer = new PIXI.Container()
        this.sceneContainer = undefined
        this.sceneManager = undefined
        //add to DOM
        const view = this.app.view
        document.body.appendChild(view as HTMLCanvasElement)

        eventDispatcher.on("gameStarted", () => this.initGameplay())
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
        await assetLoader.loadEnemySpriteSheets()

        this.app.stage.addChild(this.baseContainer)
        const frame = new PIXI.Graphics()
        frame.beginFill(0x000005)
        frame.drawRect(0,0,window.outerWidth, window.outerHeight)
        frame.endFill()

        this.baseContainer.addChild(frame)

        this.sceneContainer = new PIXI.Container()
        this.sceneManager = new SceneManager(this.sceneContainer)

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
        // mainMenu.constructScene(this.sceneContainer)
        mainMenu.constructScene()

        this.sceneManager?.transitionScene(mainMenu)
    }


    initGameplay() {
        const gameplayScene = new GameplayScene(this.app)
        gameplayScene.constructScene()
        this.sceneManager?.transitionScene(gameplayScene)

        eventDispatcher.on("mainMenuReturn", () => {
            eventDispatcher.fireEvent("gameEnd")
            this.resetGameplayScene(gameplayScene)
            this.run()
        })

        eventDispatcher.on("defeat", () => {
            const mainMenu = new GameOver(this.app)
            eventDispatcher.fireEvent("gameEnd")
            mainMenu.constructScene()
            this.resetGameplayScene(gameplayScene)
            this.sceneManager?.transitionScene(mainMenu)
        })
    }

    resetGameplayScene(gameplayScene : GameplayScene) {
        gameplayScene?.cleanUpResources()
    }
}