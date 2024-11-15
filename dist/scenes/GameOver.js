import { AssetLoader } from "../core/AssetLoader";
import { UIHelper } from "../UI/UIHelper";
import { EventDispatcher } from "../utils/EventDispatcher";
import { Scene } from "./Scene";
import * as PIXI from "pixi.js";
const assetLoader = new AssetLoader();
const eventDispatcher = new EventDispatcher();
export class GameOver extends Scene {
    /**
     *
     */
    constructor(app) {
        super(app);
    }
    constructScene() {
        if (!assetLoader.otherImages) {
            throw new Error("Asset failed to load");
        }
        const today = new Date();
        const graveyard = PIXI.Sprite.from(assetLoader.otherImages.gameoverGraveyard);
        graveyard.width = 700;
        graveyard.height = 500;
        graveyard.x = 300;
        graveyard.y = 100;
        graveyard.zIndex = 1;
        this.container.addChild(graveyard);
        const txtRip = UIHelper.createText(580, 270, "R.I.P.", 70, "0x000077");
        this.container.addChild(txtRip);
        const txtDate = UIHelper.createText(580, 350, `10/13/24 - ${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`, 20, "0x000077");
        this.container.addChild(txtDate);
        const txtGameOver = UIHelper.createText(400, 600, "Here lies the defenders...", 60, "0x7777FF");
        this.container.addChild(txtGameOver);
        const btnRestart = UIHelper.createButton(450, 700, 400, 50, "Restart");
        this.container.addChild(btnRestart);
        btnRestart.zIndex = 1;
        btnRestart.on("pointerdown", () => {
            eventDispatcher.fireEvent("gameStarted");
        });
        const btnMainMenu = UIHelper.createButton(450, 800, 400, 50, "Main Menu");
        btnMainMenu.zIndex = 1;
        this.container.addChild(btnMainMenu);
        btnMainMenu.on("pointerdown", () => {
            eventDispatcher.fireEvent("mainMenuReturn");
        });
    }
}
//# sourceMappingURL=GameOver.js.map