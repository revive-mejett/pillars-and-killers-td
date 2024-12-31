import { AssetLoader } from "../core/AssetLoader"
import { UIHelper } from "../UI/UIHelper"
import { EventDispatcher } from "../utils/EventDispatcher"

import { Scene } from "./Scene"
import * as PIXI from "pixi.js";

const assetLoader = new AssetLoader()
const eventDispatcher = new EventDispatcher()
const version = "V0.9.3"

export class MainMenu extends Scene {
    /**
     *
     */
    constructor(app : PIXI.Application) {
        super(app)
        this.container.sortableChildren = true
    }

    constructScene() {
        if (!assetLoader.otherImages) {
            throw new Error("Asset images not properly loaded")
        }
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

        const btnNewGame = UIHelper.createButton(450,600,400,50, "New Game")
        this.container.addChild(btnNewGame)
        btnNewGame.zIndex = 1

        btnNewGame.on("pointerdown", () => eventDispatcher.fireEvent("newGameClick"))

        const btnSettings = UIHelper.createButton(450,700,400,50, "Settings")
        btnSettings.zIndex = 1
        this.container.addChild(btnSettings)
        btnSettings.on("pointerdown", () => eventDispatcher.fireEvent("settingsClick"))

        const btnTutorial = UIHelper.createButton(450,800,400,50, "Tutorial")
        btnTutorial.zIndex = 1
        this.container.addChild(btnTutorial)
        btnTutorial.on("pointerdown", () => eventDispatcher.fireEvent("tutorialClick"))

        const txtVersion = UIHelper.createText(0, 950, version, 20, "0X777777")
        this.container.addChild(txtVersion)
    }
}