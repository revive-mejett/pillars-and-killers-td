import { Difficulty } from "src/ts/types/GameSaveData";
import { AssetLoader } from "../core/AssetLoader";
import { UIHelper } from "../UI/UIHelper";
import { EventDispatcher } from "../utils/EventDispatcher";
import { Scene } from "./Scene";
import * as PIXI from "pixi.js";

const assetLoader = new AssetLoader()

const eventDispatcher = new EventDispatcher()

export class Victory extends Scene {
    /**
     *
     */
    playedDifficulty: Difficulty
    constructor(app : PIXI.Application, difficulty: Difficulty) {
        super(app);
        this.playedDifficulty = difficulty
    }

    constructScene() {

        if (!assetLoader.otherImages) {
            throw new Error("Asset failed to load")
        }

        let background = PIXI.Sprite.from(assetLoader.otherImages.victoryNormal)

        if (this.playedDifficulty === "Chill") {
            background = PIXI.Sprite.from(assetLoader.otherImages.victoryChill)
        }
        if (this.playedDifficulty === "Killer's Thrill") {
            background = PIXI.Sprite.from(assetLoader.otherImages.victoryKillerThrill)
        }
        if (this.playedDifficulty === "1Pill2Nil") {
            background = PIXI.Sprite.from(assetLoader.otherImages.victory1Pill2Nil)
        }
        background.zIndex = 1

        this.container.addChild(background)

        let congratsMessage2 = ""

        if (this.playedDifficulty === "Chill") {
            congratsMessage2 = "The killers were pretty laid back. To play Endless mode, beat the game on Normal!"
        }
        if (this.playedDifficulty === "Normal") {
            congratsMessage2 = "Feel free to return back to this save slot in order to play Endless Mode!"
        }
        if (this.playedDifficulty === "Killer's Thrill") {
            congratsMessage2 = "Despite the killers unleashing a larger attack, you claim victory! Feel free to continue on Endless mode!"
        }
        if (this.playedDifficulty === "1Pill2Nil") {
            congratsMessage2 = "You have beat the toughest the killers can get! Your city is unstoppable! Feel free to continue on Endless mode!"
        }



        const txtAdditional1 = UIHelper.createText(700,870,`You beat ${this.playedDifficulty}! The city is now safe!`, 30, "0x00FFFF", true)
        this.container.addChild(txtAdditional1)
        const txtAdditional2 = UIHelper.createText(700,920,congratsMessage2, 30, "0x00FFFF", true)
        this.container.addChild(txtAdditional2)


        const btnMainMenu = UIHelper.createButton(500,950,400,50, "Main Menu")
        btnMainMenu.zIndex = 1
        this.container.addChild(btnMainMenu)

        btnMainMenu.on("pointerdown", () => {
            eventDispatcher.fireEvent("mainMenuReturn")
        })


    }

}