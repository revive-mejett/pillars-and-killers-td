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

const numberDifficultyPanes = 3

export class PregameSelection extends Scene {


    saveFilesListContainer : PIXI.Container
    mapSelectionContainer: PIXI.Container
    difficultySelectionContainer: PIXI.Container
    difficultyPanes: PIXI.Container[] = []

    btnPrevDifficulties: PIXI.Container = new PIXI.Container()
    btnNextDifficulties: PIXI.Container = new PIXI.Container()
    difficultyPaneSelectionStartIndex = 0
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
        this.createMapSelectionPane(0, 550, "Starry Night")
        this.createMapSelectionPane(400, 550, "Medium French Vanilla")
        this.createMapSelectionPane(800, 550, "Stairwell-O-Chaos");

        // this.createMapSelectionPane(800, 100, "blons");


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

    private createDifficultyPanes() {
        //clear existing difficulty pane
        this.difficultySelectionContainer.removeChildren()
        this.difficultyPaneSelectionStartIndex = 0
        this.difficultyPanes = []
        this.createDifficultyPane(
            0,
            100,
            "Chill",
            "*500 starting money, 80 waves\n*Killers give +30% more than Normal\n*75% pillar sellback value\n*Great for casual pillar builders\n[Note]: Beat Wave 100 on Normal or Killer's Thrill to continue on Endless!",
            "0x00FF77",
            "chillbg",
            500,
            200,
            false,
            false
        );
        this.createDifficultyPane(
            410,
            100,
            "Normal",
            "*400 starting money, 100 waves\n*Killers give normal bounty\n*60% pillar sellback value\n*For those who are skilled at slaying killers",
            "0XFFFF00",
            "normalbg",
            400,
            100,
            false,
            false
        );
        this.createDifficultyPane(
            820,
            100,
            "Killer's Thrill",
            "*250 starting money, 100 waves\nKillers only give 60% of their original bounty\n*50% pillar sellback value\n*Alternate wave set; waves have ++more killers\n*Volatile saves - you cannot go back if you quit upon loading",
            "0xFF0066",
            "killerthrillbg",
            250,
            75,
            false,
            false //set to true if not ready, developer boolean
        );
        if (!this.selectedSaveData.mapTitle) {
            return
        }
        let hasWonKillerThrill = false

        if (gameDataManager.medalData && gameDataManager.medalData[this.selectedSaveData.mapTitle] && gameDataManager.medalData[this.selectedSaveData.mapTitle]["Killer's Thrill"]) {
            hasWonKillerThrill = true
        }
        this.createDifficultyPane(
            1230,
            100,
            "1Pill2Nil",
            "*200 starting money, 110 waves\n50% kill bounty...\n*50% pillar sellback value...\n*No checkpoints, no saving...; Waves start automatically after each \"checkpoint\"\n*One pill to nil. Only for the experienced - not for the faint of heart",
            "0x0077FF",
            "1pill2nilbg",
            200,
            1,
            !hasWonKillerThrill,
            false //set to true if not ready, developer boolean
        );

        this.btnPrevDifficulties = UIHelper.createButton(0, 950, 200, 50, "Prev", 20, 0xFFFFFF);
        this.difficultySelectionContainer.addChild(this.btnPrevDifficulties);
        this.btnNextDifficulties = UIHelper.createButton(1300, 950, 200, 50, "Next", 20, 0xFFFFFF);
        this.difficultySelectionContainer.addChild(this.btnNextDifficulties);
        this.btnPrevDifficulties.on("pointerdown", () => {
            this.difficultyPaneSelectionStartIndex--
            this.updatePrevNextDifficultyButtons(this.btnPrevDifficulties, this.btnNextDifficulties);
            this.updateDifficultyPaneVisibility()
        });
        this.btnNextDifficulties.on("pointerdown", () => {
            this.difficultyPaneSelectionStartIndex++
            this.updatePrevNextDifficultyButtons(this.btnPrevDifficulties, this.btnNextDifficulties);
            this.updateDifficultyPaneVisibility()
        });

        this.updatePrevNextDifficultyButtons(this.btnPrevDifficulties, this.btnNextDifficulties);
    }

    private updatePrevNextDifficultyButtons(btnPrevDifficulties: PIXI.Container<PIXI.DisplayObject>, btnNextDifficulties: PIXI.Container<PIXI.DisplayObject>) {
        btnPrevDifficulties.visible = this.difficultyPaneSelectionStartIndex > 0;
        btnNextDifficulties.visible = this.difficultyPaneSelectionStartIndex < this.difficultyPanes.length - numberDifficultyPanes;
    }

    private updateDifficultyPaneVisibility() {
        this.difficultyPanes.forEach(pane => {
            pane.visible = false;
        });

        if (this.difficultyPanes[this.difficultyPaneSelectionStartIndex]) {
            this.difficultyPanes[this.difficultyPaneSelectionStartIndex].visible = true;
            this.difficultyPanes[this.difficultyPaneSelectionStartIndex].x = 100;
        }
        if (this.difficultyPanes[this.difficultyPaneSelectionStartIndex + 1]) {
            this.difficultyPanes[this.difficultyPaneSelectionStartIndex + 1].visible = true;
            this.difficultyPanes[this.difficultyPaneSelectionStartIndex + 1].x = 510;
        }
        if (this.difficultyPanes[this.difficultyPaneSelectionStartIndex + 2]) {
            this.difficultyPanes[this.difficultyPaneSelectionStartIndex + 2].visible = true;
            this.difficultyPanes[this.difficultyPaneSelectionStartIndex + 2].x = 920;
        }

    }

    private createDifficultyPane(paneXPos: number, paneYPos: number, difficulty: Difficulty, description: string, textColour: string, backgroundAsset: string, startingMoney: number, startingLives: number, isLocked: boolean, isWIP?: boolean) {

        if (!assetLoader.otherImages || !assetLoader.otherImages[backgroundAsset]) {
            return
        }
        const iconBundle = assetLoader.icons

        if (!iconBundle) {
            throw new Error("Icons asset may have not loaded properly Akshan")
        }

        const paneWidth = 400
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

        const bgImage = PIXI.Sprite.from(assetLoader.otherImages[backgroundAsset])
        bgImage.zIndex = 1
        paneContainer.addChild(bgImage)

        const padding = 5
        const livesMoneyIconTextYPos = 475
        const textXOffset = 80
        const textYOffset = 15
        const moneyIconTextXOffset = 40
        const livesIconTextXOffset = 220

        this.difficultySelectionContainer.addChild(paneContainer);
        this.difficultyPanes.push(paneContainer)
        paneContainer.visible = false

        const textDifficultyTitle = UIHelper.createText(paneWidth/2, 50, difficulty, 60, textColour, true);
        paneContainer.addChild(textDifficultyTitle);

        const iconMoney = UIHelper.createIcon(iconBundle.money, moneyIconTextXOffset + padding , livesMoneyIconTextYPos, 0x002222, 80, 80);
        paneContainer.addChild(iconMoney);
        const txtStartingMoney = UIHelper.createText(moneyIconTextXOffset + textXOffset + padding, livesMoneyIconTextYPos + textYOffset, `x${startingMoney.toString()}`, 40, "0xFFFF00");
        paneContainer.addChild(txtStartingMoney);

        const iconLives = UIHelper.createIcon(iconBundle.lives, livesIconTextXOffset + padding , livesMoneyIconTextYPos, 0x002222, 80, 80);
        paneContainer.addChild(iconLives);
        const txtStartingLives = UIHelper.createText(livesIconTextXOffset + textXOffset + padding, livesMoneyIconTextYPos + textYOffset, `x${startingLives.toString()}`, 40, "0xFF0000");
        paneContainer.addChild(txtStartingLives);

        const textDescription = UIHelper.createText(paneWidth/2, 650, description, 20, textColour, true, paneWidth);
        paneContainer.addChild(textDescription);


        if (!isWIP) {
            if (isLocked) {
                const textLocked = UIHelper.createText(60, + 800 - 50 + textYOffset, "Locked!", 30, "0xFF0000", true);
                paneContainer.addChild(textLocked);
                const textUnlockInstructions = UIHelper.createText(250, + 800 - 50 + textYOffset, `Beat ${this.selectedSaveData.mapTitle} on Killer's Thrill to unlock!`, 20, "0x00FFFF", true, 250);
                paneContainer.addChild(textUnlockInstructions);
            } else {
                const btnSelect = UIHelper.createButton(0, 800 - 50, paneWidth, 50, "Select", 30, 0x77FF77);
                paneContainer.addChild(btnSelect)
                btnSelect.on("pointerdown", () => {
                    this.selectedSaveData.difficulty = difficulty
                    eventDispatcher.fireEvent("gameStarted", this.selectedSaveData);
                });
            }

        } else {
            const textComingSoon = UIHelper.createText(200, + 800 - 50 + textYOffset, "Coming soon!", 40, "0x777777", true);
            paneContainer.addChild(textComingSoon);
        }

    }

    private createMapSelectionPane(paneXPos: number, paneYPos: number, title: string) {

        const imagesBundle = assetLoader.otherImages

        if (!imagesBundle) {
            throw new Error("Icons asset may have not loaded properly Akshan")
        }


        const paneWidth = 300
        const paneHeight = 425

        const paneContainer = new PIXI.Container();
        paneContainer.x = paneXPos;
        paneContainer.y = paneYPos;

        this.mapSelectionContainer.addChild(paneContainer);

        const bgColour = new PIXI.Graphics();
        bgColour.beginFill(0x002222);
        bgColour.drawRect(0, 0, paneWidth, paneHeight);
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


        //Listing all trophies aquired by the player
        this.displayMedal(title, "Chill", 0, imagesBundle, paneContainer);
        this.displayMedal(title, "Normal", 75, imagesBundle, paneContainer);
        this.displayMedal(title, "Killer's Thrill", 150, imagesBundle, paneContainer);
        this.displayMedal(title, "1Pill2Nil", 225, imagesBundle, paneContainer);


        paneContainer.addChild(mapCard)
        mapCard.x = 50
        mapCard.y = 40

        const btnSelect = UIHelper.createButton(0, paneHeight - 50, 300, 50, "Select", 30, 0x77FF77);
        paneContainer.addChild(btnSelect)

        btnSelect.on("pointerdown", () => {
            this.selectedSaveData.mapTitle = title
            this.mapSelectionContainer.visible = false
            this.difficultySelectionContainer.visible = true

            //create the difficulty panes
            this.createDifficultyPanes()
            this.updateDifficultyPaneVisibility()
            this.updatePrevNextDifficultyButtons(this.btnPrevDifficulties, this.btnNextDifficulties);
        });

    }

    private displayMedal(title: string, difficulty: Difficulty, xPosition: number, imagesBundle: { [key: string]: string; }, paneContainer: PIXI.Container<PIXI.DisplayObject>) {
        const medalPadding = 2;
        const medalYPos = 250;
        const medalWidth = 75;
        const medalHeight = 125;

        let medalSprite;
        if (gameDataManager.medalData && gameDataManager.medalData[title] && gameDataManager.medalData[title][difficulty]) {
            medalSprite = PIXI.Sprite.from(imagesBundle[`trophy_${difficulty}`]);
        } else {
            medalSprite = PIXI.Sprite.from(imagesBundle["trophy_Locked"]);
        }
        medalSprite.x = medalPadding + xPosition;
        medalSprite.y = medalYPos;
        medalSprite.width = medalWidth;
        medalSprite.height = medalHeight;
        paneContainer.addChild(medalSprite);
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
            let difficultyColour = "0xFFFFFF"
            if (difficulty === "Normal") {
                difficultyColour = "0xFFFF00"
            }
            if (difficulty === "Chill") {
                difficultyColour = "0x00FF77"
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