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
    constructor(app : PIXI.Application) {
        super(app);
    }

    constructScene() {

        if (!assetLoader.otherImages) {
            throw new Error("Asset failed to load")
        }

        const background = PIXI.Sprite.from(assetLoader.otherImages.victoryNormal)
        background.zIndex = 1

        this.container.addChild(background)



        const txtAdditional1 = UIHelper.createText(700,870,"You beat Normal! The city is now safe!", 30, "0x00FFFF", true)
        this.container.addChild(txtAdditional1)
        const txtAdditional2 = UIHelper.createText(700,920,"Feel free to return back to this save slot in order to play Endless Mode!", 30, "0x00FFFF", true)
        this.container.addChild(txtAdditional2)


        const btnMainMenu = UIHelper.createButton(500,950,400,50, "Main Menu")
        btnMainMenu.zIndex = 1
        this.container.addChild(btnMainMenu)

        btnMainMenu.on("pointerdown", () => {
            eventDispatcher.fireEvent("mainMenuReturn")
        })


    }

}