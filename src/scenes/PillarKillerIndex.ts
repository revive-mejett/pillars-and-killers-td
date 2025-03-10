import * as PIXI from "pixi.js";
import { Scene } from "./Scene"
import { UIHelper } from "../UI/UIHelper";
import { EventDispatcher } from "../utils/EventDispatcher"
import { EnemyClass } from "src/ts/types/EnemyData";
import { AssetLoader } from "../core/AssetLoader";
import { allEnemyData } from "../utils/EnemyData";


const eventDispatcher = new EventDispatcher()
const assetLoader = new AssetLoader()

const numberKillerPanes = 8

export class PillarKillerIndex extends Scene {

    enemyListContainer: PIXI.Container<PIXI.DisplayObject>
    enemyPanes: PIXI.Container[] = []
    enemyPanesStartIndex: number = 0

    btnPrevPageEnemies: PIXI.Container<PIXI.DisplayObject> = new PIXI.Container()
    btnNextPageEnemies: PIXI.Container<PIXI.DisplayObject> = new PIXI.Container()

    enemyDetailPane: PIXI.Container = new PIXI.Container()


    enemyClasses: EnemyClass[] = [
        "Infant Circle", "Little Sparrow", "Earthling Flake", "Quick Bonhomme", "Stone Pricker", "4p 2024", "Mean Triangle", "Brave Proxima Centauri",
        "Toddler Sphere", "Cute Crow", "Polar Goldfish", "Fast Runner", "Steel Warrior", "5p 2025", "Angry Piranha", "Serious Sirius",
        "Freshman Octahedron", "Beautiful Peacock", "Twilight Great White", "Dashing Dasher", "Titanium Bruiser", "12p 2028", "Furious Raven", "Remorseless Rigel",
        "Sophomore Dodecahedron", "Alluring Rooster", "Neptunian Megalodon", "Kingda Ka Zipper", "Obsidian Ripper", "256p 2152", "Enraged Eagle", "Unforgiving Stephenson 2-18",
        "Jr. Rhombicosidodecahedron", "Irresistible Phoenix", "Challenger Deep Kraken", "Near-Light Zoomer", "Carbon Nanotube Annihilator", "2^1024p 137632", "Merciless Loch Ness", "TON 618"
    ]



    /**
     *
     */
    constructor(app: PIXI.Application) {
        super(app)
        this.container.sortableChildren = true

        this.enemyListContainer = new PIXI.Container()
        this.enemyListContainer.x = 15
        this.enemyDetailPane = new PIXI.Container()
        this.container.addChild(this.enemyListContainer)
        this.container.addChild(this.enemyDetailPane)
        this.enemyListContainer.zIndex = 2
        this.enemyDetailPane.zIndex = 2
    }

    constructScene(): void {
        const txtTitle = UIHelper.createText(650, 50, "Killers Index", 50, "0xFFFFFF", true);
        this.container.addChild(txtTitle);

        if (!assetLoader.otherImages) {
            throw new Error("Asset images not properly loaded")
        }
        const background = PIXI.Sprite.from(assetLoader.otherImages.mainTitleBackground)
        background.x = 0
        background.y = 0
        background.zIndex = -1
        background.alpha = 0.1

        this.container.addChild(background)

        this.createKillerOverviewPanes();


        const btnBackToMain = UIHelper.createButton(50, 25, 200, 50, "Back to Main Menu", 20, 0xFFFFFF);
        this.container.addChild(btnBackToMain);
        btnBackToMain.on("pointerdown", () => {
            eventDispatcher.fireEvent("btnBackToMainMenuClick");
        });

        this.updateEnemyPaneVisibility()
    }

    private createKillerOverviewPanes() {
        //clear existing panes
        this.enemyListContainer.removeChildren()
        this.enemyPanesStartIndex = 0
        this.enemyPanes = []
        this.enemyClasses.forEach(enemyClass => this.createKillerOverviewPane(enemyClass));


        const buttonsYPos = 350

        this.btnPrevPageEnemies = UIHelper.createButton(0, buttonsYPos, 120, 75, "Prev", 20, 0xFFFFFF);
        this.enemyListContainer.addChild(this.btnPrevPageEnemies);
        this.btnNextPageEnemies = UIHelper.createButton(1250, buttonsYPos, 120, 75, "Next", 20, 0xFFFFFF);
        this.enemyListContainer.addChild(this.btnNextPageEnemies);

        this.btnPrevPageEnemies.on("pointerdown", () => {
            this.enemyPanesStartIndex -= numberKillerPanes
            this.updatePrevNextDifficultyButtons(this.btnPrevPageEnemies, this.btnNextPageEnemies);
            this.updateEnemyPaneVisibility()
        });
        this.btnNextPageEnemies.on("pointerdown", () => {
            this.enemyPanesStartIndex += numberKillerPanes
            this.updatePrevNextDifficultyButtons(this.btnPrevPageEnemies, this.btnNextPageEnemies);
            this.updateEnemyPaneVisibility()
        });

        this.updatePrevNextDifficultyButtons(this.btnPrevPageEnemies, this.btnNextPageEnemies);
    }


    private createKillerOverviewPane(className: EnemyClass) {


        const enemy = allEnemyData[className]

        if (!enemy) {
            return
        }
        const spritesheet = assetLoader.spriteSheetEnemies?.get(className)

        if (!spritesheet) {
            throw new Error("spritesheet not loaded")
        }



        const paneWidth = 250;
        const paneHeight = 250;
        const paneContainer = new PIXI.Container();
        paneContainer.zIndex = 20;

        const bgColour = new PIXI.Graphics();
        bgColour.beginFill(0x0F0033);
        bgColour.drawRect(0, 0, paneWidth, paneHeight);
        bgColour.endFill();
        paneContainer.addChild(bgColour);
        bgColour.zIndex = 20;


        //Enemy(killer) title
        const textEnemyClassTitle = UIHelper.createText(paneWidth / 2, 20, enemy.stats.className, 20, "0xFFFFFF", true);
        paneContainer.addChild(textEnemyClassTitle);


        //Enemy(killer) sprite
        const enemySprite = new PIXI.AnimatedSprite(spritesheet.animations.enemy)
        enemySprite.width = 150
        enemySprite.height = 150
        enemySprite.x = 50
        enemySprite.y = 50
        enemySprite.animationSpeed = enemy.stats.animationSpeed || 0.1
        enemySprite.play()
        paneContainer.addChild(enemySprite)

        this.enemyListContainer.addChild(paneContainer);
        this.enemyPanes.push(paneContainer);
        paneContainer.visible = false;

        //view description
        const btnViewDescription = UIHelper.createButton(0, paneHeight - 20, paneWidth, 50, "View Description", 20, 0xFFFFFF);
        paneContainer.addChild(btnViewDescription);

        btnViewDescription.on("pointerdown", () => {
            this.createEnemyDescriptionPane(className, spritesheet)
        });
    }

    private updatePrevNextDifficultyButtons(btnPrevDifficulties: PIXI.Container<PIXI.DisplayObject>, btnNextDifficulties: PIXI.Container<PIXI.DisplayObject>) {
        btnPrevDifficulties.visible = this.enemyPanesStartIndex > 0;
        btnNextDifficulties.visible = this.enemyPanesStartIndex < this.enemyPanes.length;
    }

    private updateEnemyPaneVisibility() {
        this.enemyPanes.forEach(pane => {
            pane.visible = false;
        });

        for (let i = 0; i < numberKillerPanes; i++) {
            if (this.enemyPanes[this.enemyPanesStartIndex + i]) {
                this.enemyPanes[this.enemyPanesStartIndex + i].visible = true;
                this.enemyPanes[this.enemyPanesStartIndex + i].x = 150 + (275 * (i % 4));
                this.enemyPanes[this.enemyPanesStartIndex + i].y = 100 + (i >= 4 ? 300 : 0);
            }
        }
    }


    private createEnemyDescriptionPane(className: EnemyClass, spritesheet: PIXI.Spritesheet) {

        const enemy = allEnemyData[className]

        if (!enemy) {
            return
        }


        if (this.enemyDetailPane && this.enemyDetailPane.parent) {
            this.container.removeChild(this.enemyDetailPane)
        }

        if (!spritesheet) {
            throw new Error("spritesheet not loaded")
        }

        this.enemyDetailPane?.removeChildren()
        this.enemyDetailPane?.destroy(true)

        this.enemyDetailPane = new PIXI.Container()
        this.container.addChild(this.enemyDetailPane)
        this.enemyDetailPane.zIndex = 2

        this.enemyDetailPane.x = 50
        this.enemyDetailPane.y = 690

        const bgColour = new PIXI.Graphics();
        bgColour.beginFill(0x0F0033);
        bgColour.drawRect(0, 0, 1300, 300);
        bgColour.endFill();
        this.enemyDetailPane.addChild(bgColour);

        //Enemy(killer) sprite
        const enemySprite = new PIXI.AnimatedSprite(spritesheet.animations.enemy)
        enemySprite.width = 250
        enemySprite.height = 250
        enemySprite.x = 25
        enemySprite.y = 25
        enemySprite.animationSpeed = enemy.stats.animationSpeed || 0.1
        enemySprite.play()
        this.enemyDetailPane.addChild(enemySprite)

        //Enemy(killer) title
        const textEnemyClassTitle = UIHelper.createText(500, 25, enemy.stats.className, 40, "0xFFC7C7", true);
        this.enemyDetailPane.addChild(textEnemyClassTitle);

        //Enemy(killer) description
        const textEnemyClassDescription = UIHelper.createText(300, 75, enemy.description, 20, "0xFFFFFF", false, 400);
        this.enemyDetailPane.addChild(textEnemyClassDescription);
    }
}