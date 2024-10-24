import { AssetLoader } from "../core/AssetLoader.js"
import { UIHelper } from "../UI/UIHelper.js"
import { GameplayScene } from "./GameplayScene.js"

const assetLoader = new AssetLoader()

export class MainMenu {
    /**
     *
     */
    constructor(app) {
        this.app = app
        this.container = new PIXI.Container()
        this.container.sortableChildren = true
    }

    setupUI(sceneContainer) {
        console.log(assetLoader.otherImages);
        const titleImage = PIXI.Sprite.from(assetLoader.otherImages.mainTitle)
        titleImage.width = 700
        titleImage.height = 400
        titleImage.x = 300
        titleImage.y = 0
        titleImage.zIndex = 2

        this.container.addChild(titleImage)

        const pillarsKillersVisual = PIXI.Sprite.from(assetLoader.otherImages.mainTitleImage)
        pillarsKillersVisual.width = 700
        pillarsKillersVisual.height = 400
        pillarsKillersVisual.x = 300
        pillarsKillersVisual.y = 300
        pillarsKillersVisual.zIndex = 1

        this.container.addChild(pillarsKillersVisual)

        const startButton = UIHelper.createButton(450,600,400,50, "Start Game")
        this.container.addChild(startButton)
        startButton.zIndex = 1

        startButton.on("pointerdown", () => {
            const gameplayScene = new GameplayScene(this.app)
            gameplayScene.buildMap()
            sceneContainer.removeChildren()
            sceneContainer.addChild(gameplayScene.container)
        })

        const settingsButton = UIHelper.createButton(450,700,400,50, "Settings")
        settingsButton.zIndex = 1
        this.container.addChild(settingsButton)

        const tutorialButton = UIHelper.createButton(450,800,400,50, "Tutorial")
        tutorialButton.zIndex = 1
        this.container.addChild(tutorialButton)
    }
}