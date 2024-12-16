
import { PregameSelection } from "../scenes/PregameSelection"
import { SceneManager } from "../managers/SceneManager"
import { GameOver } from "../scenes/GameOver"
import { GameplayScene } from "../scenes/GameplayScene"
import { MainMenu } from "../scenes/MainMenu"
import { EventDispatcher } from "../utils/EventDispatcher"
import { AssetLoader } from "./AssetLoader"
import * as PIXI from "pixi.js";
import { GameSaveData } from "../ts/types/GameSaveData"

// import { GameDataManager } from "../managers/GameDataManager";
// const gameDataManager = new GameDataManager()
// gameDataManager.wipeAllData()

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

        eventDispatcher.on("gameStarted", this.initGameplay.bind(this))
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

        eventDispatcher.on("newGameClick", () => this.toPregameSelection())
    }

    run() {
        const mainMenu = new MainMenu(this.app)
        // mainMenu.constructScene(this.sceneContainer)
        mainMenu.constructScene()

        this.sceneManager?.transitionScene(mainMenu)
    }


    initGameplay(eventData: {fileNumber: 1 | 2 | 3 | 4 | 5 | 6, gameData : GameSaveData}) {
        const gameplayScene = new GameplayScene(this.app, eventData.fileNumber, eventData.gameData)
        gameplayScene.constructScene()
        this.sceneManager?.transitionScene(gameplayScene)

        eventDispatcher.on("mainMenuReturn", () => {
            eventDispatcher.fireEvent("gameEnd")
            this.resetGameplayScene(gameplayScene)
            this.run()
        })

        eventDispatcher.on("defeat", () => {
            const gameOver = new GameOver(this.app)
            eventDispatcher.fireEvent("gameEnd")
            gameOver.constructScene()
            this.resetGameplayScene(gameplayScene)
            this.sceneManager?.transitionScene(gameOver)
        })

        eventDispatcher.on("gameEnd", () => {
        })
    }

    resetGameplayScene(gameplayScene : GameplayScene) {
        gameplayScene?.cleanUpResources()
    }

    private toPregameSelection() {
        const pregameSelection = new PregameSelection(this.app)
        pregameSelection.constructScene()
        this.sceneManager?.transitionScene(pregameSelection)
    }
}