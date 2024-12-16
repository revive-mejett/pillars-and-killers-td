import * as PIXI from "pixi.js";
import { Scene } from "./Scene"
import { UIHelper } from "../UI/UIHelper";
import { GameDataManager } from "../managers/GameDataManager";
import { EventDispatcher } from "../utils/EventDispatcher"
import { AssetLoader } from "../core/AssetLoader";

const gameDataManager = new GameDataManager()
const eventDispatcher = new EventDispatcher()
const assetLoader = new AssetLoader()

export class PregameSelection extends Scene {
    /**
     *
     */

    constructor(app : PIXI.Application) {
        super(app)
        this.container.sortableChildren = true
    }

    constructScene() {
        const iconBundle = assetLoader.icons

        if (!iconBundle) {
            throw new Error("Icons asset may have not loaded properly Akshan")
        }

        const file1Data = gameDataManager.file1Data


        const padding = 5
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
            const txtMap = UIHelper.createText(0 + padding, 50, `${file1Data.map}`, 30, "0xFFFFFF")
            saveFile1Container.addChild(txtMap)
            const txtCheckpointWave = UIHelper.createText(0 + padding, 100, `Wave ${file1Data.checkpointWave}`, 30, "0xFFFFFF")
            saveFile1Container.addChild(txtCheckpointWave)

            const iconMoney = UIHelper.createIcon(iconBundle.money, 0 + padding, 130, 0x002222, 30, 30)
            saveFile1Container.addChild(iconMoney)
            const txtMoney = UIHelper.createText(35 + padding, 130, `${file1Data.money}`, 30, "0xFFFF00")
            saveFile1Container.addChild(txtMoney)

            const iconLives = UIHelper.createIcon(iconBundle.lives, 0 + padding, 160, 0x002222, 30, 30)
            saveFile1Container.addChild(iconLives)
            const txtLives = UIHelper.createText(35 + padding, 160, `${file1Data.lives}`, 30, "0x00FF00")
            saveFile1Container.addChild(txtLives)
            
            btnLoadFile1.on("pointerdown", () => {
                eventDispatcher.fireEvent("gameStarted", file1Data)
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