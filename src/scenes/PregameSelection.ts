import * as PIXI from "pixi.js";
import { Scene } from "./Scene"
import { UIHelper } from "../UI/UIHelper";
import { GameDataManager } from "../managers/GameDataManager";
import { EventDispatcher } from "../utils/EventDispatcher"
import { AssetLoader } from "../core/AssetLoader";
import { GameSaveData } from "src/ts/types/GameSaveData";

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
        if (!assetLoader || !assetLoader.otherImages) {
            throw new Error("asset loader not properly loaded")
        }
        gameDataManager.updateSavedFiles()
        const file1Data = gameDataManager.file1Data;
        const file2Data = gameDataManager.file2Data;
        const file3Data = gameDataManager.file3Data;
        const file4Data = gameDataManager.file4Data;
        const file5Data = gameDataManager.file5Data;
        const file6Data = gameDataManager.file6Data;

        this.createSaveFilePane(100, 300, 1, file1Data);
        this.createSaveFilePane(500, 300, 2, file2Data);
        this.createSaveFilePane(900, 300, 3, file3Data);
        this.createSaveFilePane(100, 650, 4, file4Data);
        this.createSaveFilePane(500, 650, 5, file5Data);
        this.createSaveFilePane(900, 650, 6, file6Data);


        const pillarsKillersVisual = PIXI.Sprite.from(assetLoader.otherImages.mainTitleImage)
        pillarsKillersVisual.width = 700
        pillarsKillersVisual.height = 400
        pillarsKillersVisual.x = 300
        pillarsKillersVisual.y = 10
        pillarsKillersVisual.zIndex = 1

        this.container.addChild(pillarsKillersVisual)
    }

    private createSaveFilePane(paneXPos : number, paneYPos : number, fileNumber : number, fileData : GameSaveData | null) {

        const iconBundle = assetLoader.icons

        if (!iconBundle) {
            throw new Error("Icons asset may have not loaded properly Akshan")
        }


        const padding = 5;
        const saveFileContainer = new PIXI.Container();
        saveFileContainer.x = paneXPos
        saveFileContainer.y = paneYPos
        this.container.addChild(saveFileContainer);
        saveFileContainer.zIndex = 10
        const bgColour = new PIXI.Graphics();
        bgColour.beginFill(0x002222);
        bgColour.drawRect(0, 0, 300, 300);
        bgColour.endFill();
        saveFileContainer.addChild(bgColour);
        const saveText = UIHelper.createText(0, 0, `Save slot ${fileNumber}`, 30, "0xFFFFFF");
        saveFileContainer.addChild(saveText);
        if (fileData) {
            const btnLoadFile1 = UIHelper.createButton(0, 250, 300, 50, "Load Game", 20, 0xFFFFFF);
            saveFileContainer.addChild(btnLoadFile1);
            const txtMap = UIHelper.createText(0 + padding, 50, `${fileData.map}`, 30, "0xFFFFFF");
            saveFileContainer.addChild(txtMap);
            const txtCheckpointWave = UIHelper.createText(0 + padding, 100, `Wave ${fileData.checkpointWave}`, 30, "0xFFFFFF");
            saveFileContainer.addChild(txtCheckpointWave);

            const iconMoney = UIHelper.createIcon(iconBundle.money, 0 + padding, 130, 0x002222, 30, 30);
            saveFileContainer.addChild(iconMoney);
            const txtMoney = UIHelper.createText(35 + padding, 130, `${fileData.money}`, 30, "0xFFFF00");
            saveFileContainer.addChild(txtMoney);

            const iconLives = UIHelper.createIcon(iconBundle.lives, 0 + padding, 160, 0x002222, 30, 30);
            saveFileContainer.addChild(iconLives);
            const txtLives = UIHelper.createText(35 + padding, 160, `${fileData.lives}`, 30, "0x00FF00");
            saveFileContainer.addChild(txtLives);

            btnLoadFile1.on("pointerdown", () => {
                eventDispatcher.fireEvent("gameStarted", {fileNumber: fileNumber, gameData : fileData});
            });
        } else {
            const btnLoadFile = UIHelper.createButton(0, 250, 300, 50, "New Game", 20, 0xFFFFFF);
            const saveText = UIHelper.createText(100, 100, "Empty", 30, "0x777777");
            saveFileContainer.addChild(saveText);
            saveFileContainer.addChild(btnLoadFile);
            btnLoadFile.on("pointerdown", () => {
                eventDispatcher.fireEvent("gameStarted", {fileNumber: fileNumber, gameData : undefined});
            });
        }
    }
}