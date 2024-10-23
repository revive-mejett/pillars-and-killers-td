import { UIHelper } from "../UI/UIHelper.js"
import { GameplayScene } from "./GameplayScene.js"

export class MainMenu {
    /**
     *
     */
    constructor(app) {
        this.app = app
        this.container = new PIXI.Container()

    }

    setupUI(sceneContainer) {
        const gameTitleText = UIHelper.createText(600,100, "Pillars v.s Killers TD")
        this.container.addChild(gameTitleText)

        const startButton = UIHelper.createButton(400,500,400,50, "Start Game")
        this.container.addChild(startButton)

        startButton.on("pointerdown", () => {
            const gameplayScene = new GameplayScene(this.app)
            gameplayScene.buildMap()
            sceneContainer.removeChildren()
            sceneContainer.addChild(gameplayScene.container)
        })

        const settingsButton = UIHelper.createButton(400,700,400,50, "Settings")
        this.container.addChild(settingsButton)
    }
}