import { allEnemyData } from "../utils/EnemyData";
import { AssetLoader } from "../core/AssetLoader"
import { UIHelper } from "../UI/UIHelper"
import { EventDispatcher } from "../utils/EventDispatcher"

import { Scene } from "./Scene"
import * as PIXI from "pixi.js";
import { EnemyClass } from "src/ts/types/EnemyData";

const assetLoader = new AssetLoader()
const eventDispatcher = new EventDispatcher()


export class Credits extends Scene {
    /**
     *
     */
    constructor(app : PIXI.Application) {
        super(app)
        this.container.sortableChildren = true
    }

    constructScene() {



        const txtTitle = UIHelper.createText(650, 50, "Credits", 50, "0xFFFFFF", true);
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

        const xPadding = 100
        const headingSize = 40
        const contentYOffset = 40
        const contentSize = 30


        const txtDevelopedHeading = UIHelper.createText(xPadding, 200, "Developed by", headingSize, "0xC7FFFF");
        this.container.addChild(txtDevelopedHeading);
        const txtDevelopedContent = UIHelper.createText(xPadding, 200 + contentYOffset, "Kyle Veloso", contentSize, "0x00FFFF");
        this.container.addChild(txtDevelopedContent);

        const txtMusic = UIHelper.createText(xPadding, 300, "Soundtrack", headingSize, "0xC7FFFF");
        this.container.addChild(txtMusic);
        this.createBulletPointRow(xPadding, 340, "I: Shadowy Figure / Artist: SoundCarousel")
        this.createBulletPointRow(xPadding, 380, "II: Ghost Coast 2030 / Artist: Eidunn")
        this.createBulletPointRow(xPadding, 420, "III: Hyron / Artist: Eidunn")
        this.createBulletPointRow(xPadding, 460, "IV: Plastic Flowers / Artist: Electronic-Senses")
        this.createBulletPointRow(xPadding, 500, "V: A Dream Place / Artist: Electronic-Senses")


        const txtSoundEffectsHeading = UIHelper.createText(xPadding, 550, "Sound Effects", headingSize, "0xC7FFFF");
        this.container.addChild(txtSoundEffectsHeading);
        const txtSoundEffectsContent = UIHelper.createText(xPadding, 550 + contentYOffset, "Sound effects sourced from Pixabay.", contentSize, "0x00FFFF");
        this.container.addChild(txtSoundEffectsContent);

        const txtImagesHeading = UIHelper.createText(xPadding, 650, "Images", headingSize, "0xC7FFFF");
        this.container.addChild(txtImagesHeading);
        this.createBulletPointRow(xPadding, 690, "All Killer / Pillar images are original creations designed specifically for Pillars V.S. Killers")
        this.createBulletPointRow(xPadding, 730, "Icons and other images such as backgrounds are original artwork\nor recreations inspired from other artwork or sourced from Pixabay.")


        const txtCopyright = UIHelper.createText(0, 950, `${new Date().getFullYear()} Kyle Veloso`, 20, "0X777777")
        txtCopyright.zIndex = 2
        this.container.addChild(txtCopyright)


        const btnBackToMain = UIHelper.createButton(50, 25, 200, 50, "Back to Main Menu", 20, 0xFFFFFF);
        this.container.addChild(btnBackToMain);
        btnBackToMain.on("pointerdown", () => {
            eventDispatcher.fireEvent("btnBackToMainMenuClick");
        });
    }


    private createBulletPointRow(rowXpos: number, rowYPos: number, text: string, enemyClass?: EnemyClass) {
        const bulletIconSize = 30
        const textSize = 30


        const enemy = allEnemyData["2^1024p 137632"]

        if (!enemy) {
            return
        }

        const spritesheet = assetLoader.spriteSheetEnemies?.get(enemyClass || "2^1024p 137632")

        if (!spritesheet) {
            throw new Error("spritesheet not loaded")
        }
        //bullet point, using a killer sprite!
        const enemySprite = new PIXI.AnimatedSprite(spritesheet.animations.enemy)
        enemySprite.width = bulletIconSize
        enemySprite.height = bulletIconSize
        enemySprite.x = rowXpos
        enemySprite.y = rowYPos
        enemySprite.animationSpeed = enemy.stats.animationSpeed || 0.1
        enemySprite.play()
        this.container.addChild(enemySprite)

        const bulletText = UIHelper.createText(rowXpos + bulletIconSize, rowYPos, text, textSize, "0x00FFFF");
        this.container.addChild(bulletText);
    }
}