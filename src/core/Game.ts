
import { PregameSelection } from "../scenes/PregameSelection"
import { SceneManager } from "../managers/SceneManager"
import { GameOver } from "../scenes/GameOver"
import { GameplayScene } from "../scenes/GameplayScene"
import { MainMenu } from "../scenes/MainMenu"
import { EventDispatcher } from "../utils/EventDispatcher"
import { AssetLoader } from "./AssetLoader"
import * as PIXI from "pixi.js";
import { Difficulty, GameSaveData } from "../ts/types/GameSaveData"
import { AudioManager } from "../managers/AudioManager"
import { Tutorial } from "../scenes/Tutorial"
import { OffGameSettings } from "../scenes/OffGameSettings"
import { Victory } from "../scenes/Victory"
import { PillarKillerIndex } from "../scenes/PillarKillerIndex"
import { Credits } from "../scenes/Credits"

const assetLoader = new AssetLoader()
const eventDispatcher = new EventDispatcher()
const audioManager = new AudioManager()

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
        this.app = new PIXI.Application({width: window.outerWidth, height: 1000})
        this.baseContainer = new PIXI.Container()
        this.sceneContainer = undefined
        this.sceneManager = undefined
        //add to DOM
        const view = this.app.view
        document.body.appendChild(view as HTMLCanvasElement)

        eventDispatcher.on("gameStarted", this.initGameplay.bind(this))
    }

    start() {
        this.setup().then(() => this.run()).catch(error => console.error("Game failed to run", error))
    }

    async setup() {
        assetLoader.bundleAssets()
        await Promise.all(
            [
                assetLoader.loadEnemySprites(),
                assetLoader.loadIconSprites(),
                assetLoader.loadTowerSprites(),
                assetLoader.loadOtherImagesSprites(),
                assetLoader.loadEnemySpriteSheets(),
                assetLoader.loadMapBackgroundImages()
            ]
        )


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
        eventDispatcher.on("btnBackToMainMenuClick", () => this.toMainMenu())
        eventDispatcher.on("settingsClick", () => this.toOffGameSettings())
        eventDispatcher.on("tutorialClick", () => this.toTutorial())
        eventDispatcher.on("pillerKillerIndexClick", () => this.toPillarKillerIndex())
        eventDispatcher.on("creditsClick", () => this.toCredits())
    }

    run() {
        const mainMenu = new MainMenu(this.app)
        // mainMenu.constructScene(this.sceneContainer)
        mainMenu.constructScene()

        this.sceneManager?.transitionScene(mainMenu)
    }


    initGameplay(eventData: {fileNumber: 1 | 2 | 3 | 4 | 5 | 6, gameData : GameSaveData, mapTitle: string | undefined, difficulty: Difficulty | undefined}) {
        const gameplayScene = new GameplayScene(this.app, eventData.fileNumber, eventData.gameData, eventData.mapTitle, eventData.difficulty)
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

        eventDispatcher.on("victory", (data: Difficulty) => {
            const gameOver = new Victory(this.app, data)
            eventDispatcher.fireEvent("gameEnd")
            gameOver.constructScene()
            this.resetGameplayScene(gameplayScene)
            this.sceneManager?.transitionScene(gameOver)
        })

        audioManager.playbackgroundMusic(true)
        eventDispatcher.on("gameEnd", () => {
            audioManager.stopbackgroundMusic()
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

    private toTutorial() {
        const tutorialScene = new Tutorial(this.app)
        tutorialScene.constructScene()
        this.sceneManager?.transitionScene(tutorialScene)
    }

    private toMainMenu() {
        const mainMenu = new MainMenu(this.app)
        // mainMenu.constructScene(this.sceneContainer)
        mainMenu.constructScene()

        this.sceneManager?.transitionScene(mainMenu)
    }

    private toOffGameSettings() {
        const settingsScene = new OffGameSettings(this.app)
        settingsScene.constructScene()

        this.sceneManager?.transitionScene(settingsScene)
    }

    private toPillarKillerIndex() {
        const pillarKillerIndexScene = new PillarKillerIndex(this.app)
        pillarKillerIndexScene.constructScene()

        this.sceneManager?.transitionScene(pillarKillerIndexScene)
    }

    private toCredits() {
        const creditsScene = new Credits(this.app)
        creditsScene.constructScene()
        this.sceneManager?.transitionScene(creditsScene)
    }
}