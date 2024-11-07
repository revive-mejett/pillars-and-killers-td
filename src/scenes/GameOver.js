import { Scene } from "./Scene";

export class GameOver extends Scene {
    /**
     *
     */
    constructor(app) {
        super(app);
    }

    constructScene() {
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
            eventDispatcher.fireEvent("gameStarted")
        })

        const settingsButton = UIHelper.createButton(450,700,400,50, "Settings")
        settingsButton.zIndex = 1
        this.container.addChild(settingsButton)

        const tutorialButton = UIHelper.createButton(450,800,400,50, "Tutorial")
        tutorialButton.zIndex = 1
        this.container.addChild(tutorialButton)
    }

}