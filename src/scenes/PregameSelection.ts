import * as PIXI from "pixi.js";
import { Scene } from "./Scene"
import { UIHelper } from "../UI/UIHelper";
import { GameDataManager } from "../managers/GameDataManager";
import { EventDispatcher } from "../utils/EventDispatcher"
import { AssetLoader } from "../core/AssetLoader";
import { Difficulty, GameSaveData } from "src/ts/types/GameSaveData";
import { allMaps } from "../utils/MapData";

const gameDataManager = new GameDataManager()
const eventDispatcher = new EventDispatcher()
const assetLoader = new AssetLoader()

export class PregameSelection extends Scene {


    saveFilesListContainer : PIXI.Container
    mapSelectionContainer: PIXI.Container
    difficultySelectionContainer: PIXI.Container
    selectedSaveData: {fileNumber: 1 | 2 | 3 | 4 | 5 | 6, gameData : GameSaveData | undefined, mapTitle: string | undefined, difficulty: Difficulty | undefined} = { fileNumber : 1, gameData: undefined, mapTitle : undefined, difficulty: "Normal" }
    selectedMapTitle: string | undefined = undefined
    selectedDifficulty: Difficulty | undefined = undefined

    /**
     *
     */
    constructor(app : PIXI.Application) {
        super(app)
        this.container.sortableChildren = true
        this.saveFilesListContainer = new PIXI.Container()
        this.mapSelectionContainer = new PIXI.Container()
        this.difficultySelectionContainer = new PIXI.Container()
        this.container.addChild(this.saveFilesListContainer)
        this.container.addChild(this.mapSelectionContainer)
        this.container.addChild(this.difficultySelectionContainer)
        this.mapSelectionContainer.visible = false
        this.difficultySelectionContainer.visible = false

        this.saveFilesListContainer.zIndex = 2
        this.mapSelectionContainer.zIndex = 2
        this.difficultySelectionContainer.zIndex = 2
    }

    constructScene() {
        if (!assetLoader || !assetLoader.otherImages) {
            throw new Error("asset loader not properly loaded")
        }

        // this.container.removeChildren()
        this.updateSaveFileList();



        this.createMapSelectionPane(0, 100, "Walk in the Park");
        this.createMapSelectionPane(400, 100, "Death Walk");
        this.createMapSelectionPane(800, 100, "Rough Spiral")
        this.createMapSelectionPane(0, 500, "Starry Night")
        this.createMapSelectionPane(400, 500, "Medium French Vanilla")
        this.createMapSelectionPane(800, 500, "Stairwell-O-Chaos");

        // this.createMapSelectionPane(800, 100, "blons");
        this.createNormalDifficultyPane(100, 100)

        const btnBackToMain = UIHelper.createButton(0, 25, 200, 50, "Back to Main Menu", 20, 0xFFFFFF);
        this.container.addChild(btnBackToMain);
        btnBackToMain.on("pointerdown", () => {
            eventDispatcher.fireEvent("btnBackToMainMenuClick");
        });

        const pillarsKillersVisual = PIXI.Sprite.from(assetLoader.otherImages.mainTitleImage)
        pillarsKillersVisual.width = 700
        pillarsKillersVisual.height = 400
        pillarsKillersVisual.x = 300
        pillarsKillersVisual.y = 10
        pillarsKillersVisual.zIndex = 1
        this.container.addChild(pillarsKillersVisual)


    }

    private createNormalDifficultyPane(paneXPos: number, paneYPos: number) {
        const paneWidth = 300
        const paneHeight = 800
        const paneContainer = new PIXI.Container();
        paneContainer.x = paneXPos;
        paneContainer.y = paneYPos;
        paneContainer.zIndex = 20

        const bgColour = new PIXI.Graphics();
        bgColour.beginFill(0x002222);
        bgColour.drawRect(0, 0, paneWidth, paneHeight);
        bgColour.endFill();
        paneContainer.addChild(bgColour);
        bgColour.zIndex = 20

        this.difficultySelectionContainer.addChild(paneContainer);

        const textDifficultyTitle = UIHelper.createText(paneWidth/2, 50, "Normal", 50, "0xFFFF00", true);
        paneContainer.addChild(textDifficultyTitle);

        const btnSelect = UIHelper.createButton(0, 250, 300, 50, "Select", 30, 0x77FF77);
        paneContainer.addChild(btnSelect)

        btnSelect.on("pointerdown", () => {
            this.selectedSaveData.difficulty = "Normal"
            eventDispatcher.fireEvent("gameStarted", this.selectedSaveData);
        });
    }

    private createMapSelectionPane(paneXPos: number, paneYPos: number, title: string) {
        const paneWidth = 300

        const paneContainer = new PIXI.Container();
        paneContainer.x = paneXPos;
        paneContainer.y = paneYPos;

        this.mapSelectionContainer.addChild(paneContainer);

        const bgColour = new PIXI.Graphics();
        bgColour.beginFill(0x002222);
        bgColour.drawRect(0, 0, paneWidth, 300);
        bgColour.endFill();
        paneContainer.addChild(bgColour);



        const txtMapTitle = UIHelper.createText(paneWidth/2, 20, title, 20, "0xFFFFFF", true);
        paneContainer.addChild(txtMapTitle);

        //map card
        const mapData = allMaps.get(title)
        if (!mapData) {
            throw new Error("No map exists w/ that title!")
        }

        const mapCard = UIHelper.createMapCard(mapData, 200, 25)
        paneContainer.addChild(mapCard)
        mapCard.x = 50
        mapCard.y = 40

        const btnSelect = UIHelper.createButton(0, 250, 300, 50, "Select", 30, 0x77FF77);
        paneContainer.addChild(btnSelect)

        btnSelect.on("pointerdown", () => {
            this.selectedSaveData.mapTitle = title
            this.mapSelectionContainer.visible = false
            this.difficultySelectionContainer.visible = true
            // eventDispatcher.fireEvent("gameStarted", this.selectedSaveData);
        });

    }

    private updateSaveFileList() {
        this.saveFilesListContainer.removeChildren();
        gameDataManager.updateSavedFiles()

        const saveScreenTitle = UIHelper.createText(500, 0, "Select Save Slot:", 50, "0xFFFFFF");
        this.saveFilesListContainer.addChild(saveScreenTitle);

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
    }

    private createSaveFilePane(paneXPos : number, paneYPos : number, fileNumber : 1 | 2 | 3 | 4 | 5 | 6, fileData : GameSaveData | null) {

        const iconBundle = assetLoader.icons

        if (!iconBundle) {
            throw new Error("Icons asset may have not loaded properly Akshan")
        }


        const padding = 5;
        const paneWidth = 300;
        const saveFileContainer = new PIXI.Container();
        saveFileContainer.x = paneXPos
        saveFileContainer.y = paneYPos
        this.saveFilesListContainer.addChild(saveFileContainer);

        saveFileContainer.zIndex = 10
        const bgColour = new PIXI.Graphics();
        bgColour.beginFill(0x002222);
        bgColour.drawRect(0, 0, paneWidth, 300);
        bgColour.endFill();
        saveFileContainer.addChild(bgColour);

        if (fileData && allMaps.get(fileData.map)) {
            const difficulty : Difficulty = fileData.difficulty || "Normal"
            let difficultyColour = "0xFFFF00"
            if (difficulty === "Normal") {
                difficultyColour = "0xFFFF00"
            }
            if (difficulty === "Chill") {
                difficultyColour = "0x77FF00"
            }
            if (difficulty === "Killer's Thrill") {
                difficultyColour = "0xFF0066"
            }
            const miniMapIcon = UIHelper.createMapCard(allMaps.get(fileData.map)!, 300, 25)
            miniMapIcon.alpha = 0.5
            saveFileContainer.addChild(miniMapIcon)
            miniMapIcon.zIndex = -1

            const btnLoadFile = UIHelper.createButton(0, 250, 140, 50, "Load Game", 20, 0xFFFFFF);
            saveFileContainer.addChild(btnLoadFile);
            const txtMap = UIHelper.createText(paneWidth/2, 50, `${fileData.map}`, 25, "0xC7FFFF", true);
            saveFileContainer.addChild(txtMap);
            const txtDifficulty = UIHelper.createText(paneWidth/2, 80, `${difficulty}`, 20, difficultyColour, true);
            saveFileContainer.addChild(txtDifficulty);
            const txtCheckpointWave = UIHelper.createText(0 + padding, 150, `Wave ${fileData.checkpointWave}`, 30, "0xFFFFFF");
            saveFileContainer.addChild(txtCheckpointWave);

            const iconMoney = UIHelper.createIcon(iconBundle.money, 0 + padding, 180, 0x002222, 30, 30);
            saveFileContainer.addChild(iconMoney);
            const txtMoney = UIHelper.createText(35 + padding, 180, `${fileData.money}`, 30, "0xFFFF00");
            saveFileContainer.addChild(txtMoney);

            const iconLives = UIHelper.createIcon(iconBundle.lives, 0 + padding, 210, 0x002222, 30, 30);
            saveFileContainer.addChild(iconLives);
            const txtLives = UIHelper.createText(35 + padding, 210, `${fileData.lives}`, 30, "0x00FF00");
            saveFileContainer.addChild(txtLives);



            btnLoadFile.on("pointerdown", () => {
                this.selectedSaveData = {fileNumber: fileNumber, gameData : fileData, mapTitle: undefined, difficulty: undefined}
                console.log("file data ", fileData)
                eventDispatcher.fireEvent("gameStarted", this.selectedSaveData);
            });


            const btnDeleteFile = UIHelper.createButton(160, 250, 140, 50, "Delete File", 20, 0xFFC7C7);
            const btnConfirmDelete = UIHelper.createButton(160, 250, 140, 50, "Confirm?", 20, 0xFF0000);
            saveFileContainer.addChild(btnDeleteFile);
            saveFileContainer.addChild(btnConfirmDelete);
            btnConfirmDelete.visible = false

            btnDeleteFile.on("pointerdown", () => {
                btnConfirmDelete.visible = true
                btnConfirmDelete.on("pointerdown", () => {
                    btnConfirmDelete.visible = true
                    btnDeleteFile.visible = false
                    gameDataManager.wipeSaveData(fileNumber)
                    this.updateSaveFileList()
                });
                setTimeout(() => {
                    btnConfirmDelete.off("pointerdown", () => {
                        btnConfirmDelete.visible = true
                        btnDeleteFile.visible = false
                    });
                    btnConfirmDelete.visible = false
                    btnDeleteFile.visible = true
                }, 2000);
            });

        } else {
            const btnNewGame = UIHelper.createButton(0, 250, 300, 50, "New Game", 40, 0x9999FF);
            const saveText = UIHelper.createText(150, 150, "Empty", 90, "0x555555", true);
            saveFileContainer.addChild(saveText);
            saveFileContainer.addChild(btnNewGame);
            btnNewGame.on("pointerdown", () => {
                this.selectedSaveData = {fileNumber: fileNumber, gameData : undefined, mapTitle: undefined, difficulty: undefined}
                this.saveFilesListContainer.visible = false
                this.mapSelectionContainer.visible = true
            });
        }

        const saveText = UIHelper.createText(paneWidth/2, 20, `Save slot ${fileNumber}`, 30, "0xFFFFFF", true);
        saveFileContainer.addChild(saveText);
        saveText.zIndex = 2
    }
}