import * as PIXI from "pixi.js";
import { Scene } from "./Scene"
import { UIHelper } from "../UI/UIHelper";
import { GameDataManager } from "src/managers/GameDataManager";
import { EventDispatcher } from "../utils/EventDispatcher"

// const gameDataManager = new GameDataManager()
const eventDispatcher = new EventDispatcher()

export class PregameSelection extends Scene {
    /**
     *
     */

    constructor(app : PIXI.Application) {
        super(app)
        this.container.sortableChildren = true
    }

    constructScene() {


        const saveFile1Container = new PIXI.Container()
        this.container.addChild(saveFile1Container)
        const saveFile1bg = new PIXI.Graphics()
        saveFile1bg.beginFill(0x002222)
        saveFile1bg.drawRect(0, 0, 300,300)
        saveFile1bg.endFill()
        saveFile1Container.addChild(saveFile1bg)
        const btnLoadFile1 = UIHelper.createButton(0,250,300,50,"Load Save 1", 20, 0xFFFFFF)
        saveFile1Container.addChild(btnLoadFile1)

        btnLoadFile1.on("pointerdown", () => {
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