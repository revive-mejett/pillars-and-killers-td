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

        const background = PIXI.Sprite.from(assetLoader.otherImages.mainTitleBackground)
        background.x = 0
        background.y = 0
        background.zIndex = 1

        this.container.addChild(background)
        const btnShift = 150


        const btnNewGame = UIHelper.createButton(btnShift,900,300,50, "New Game")
        this.container.addChild(btnNewGame)
        btnNewGame.zIndex = 1

        btnNewGame.on("pointerdown", () => eventDispatcher.fireEvent("newGameClick"))

        const btnSettings = UIHelper.createButton(400 + btnShift,900,300,50, "Settings")
        btnSettings.zIndex = 1
        this.container.addChild(btnSettings)
        btnSettings.on("pointerdown", () => eventDispatcher.fireEvent("settingsClick"))

        const btnTutorial = UIHelper.createButton(800 + btnShift,900,300,50, "Tutorial")
        btnTutorial.zIndex = 1
        this.container.addChild(btnTutorial)
        btnTutorial.on("pointerdown", () => eventDispatcher.fireEvent("tutorialClick"))

        const txtVersion = UIHelper.createText(0, 980, version, 20, "0X777777")
        txtVersion.zIndex = 2
        this.container.addChild(txtVersion)
    }
}