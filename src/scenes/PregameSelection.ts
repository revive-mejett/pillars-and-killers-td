import * as PIXI from "pixi.js";
import { Scene } from "./Scene"
import { UIHelper } from "../UI/UIHelper";
import { GameDataManager } from "../managers/GameDataManager";
import { EventDispatcher } from "../utils/EventDispatcher"

const gameDataManager = new GameDataManager()
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

        const file1Data = gameDataManager.file1Data

        const saveFile1Container = new PIXI.Container()
        this.container.addChild(saveFile1Container)
        const saveFile1bg = new PIXI.Graphics()
        saveFile1bg.beginFill(0x002222)
        saveFile1bg.drawRect(0, 0, 300,300)
        saveFile1bg.endFill()
        saveFile1Container.addChild(saveFile1bg)
        const save1Text = UIHelper.createText(0,0, "Save File 1", 30, "0xFFFFFF")
        saveFile1Container.addChild(save1Text)
        if (file1Data) {
            const btnLoadFile1 = UIHelper.createButton(0,250,300,50,"Load Game", 20, 0xFFFFFF)
            saveFile1Container.addChild(btnLoadFile1)
            btnLoadFile1.on("pointerdown", () => {
                eventDispatcher.fireEvent("gameStarted")
            })
        } else {
            const btnLoadFile1 = UIHelper.createButton(0,250,300,50,"New Game", 20, 0xFFFFFF)
            const save1Text = UIHelper.createText(100,100, "Empty", 30, "0x777777")
            saveFile1Container.addChild(save1Text)
            saveFile1Container.addChild(btnLoadFile1)
            btnLoadFile1.on("pointerdown", () => {
                eventDispatcher.fireEvent("gameStarted")
            })
        }
    }
}