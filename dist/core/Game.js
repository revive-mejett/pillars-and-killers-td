var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SceneManager } from "../managers/SceneManager";
import { GameOver } from "../scenes/GameOver";
import { GameplayScene } from "../scenes/GameplayScene";
import { MainMenu } from "../scenes/MainMenu";
import { EventDispatcher } from "../utils/EventDispatcher";
import { AssetLoader } from "./AssetLoader";
import * as PIXI from "pixi.js";
const assetLoader = new AssetLoader();
const eventDispatcher = new EventDispatcher();
const sceneContainerWidth = 1000 + 250;
const sceneContainerHeight = 1000;
export class Game {
    constructor() {
        this.mapSize = 1000;
        this.dimensions = 25;
        this.app = new PIXI.Application({ width: window.outerWidth, height: window.outerHeight });
        this.baseContainer = new PIXI.Container();
        this.sceneContainer = undefined;
        this.sceneManager = undefined;
        //add to DOM
        const view = this.app.view;
        document.body.appendChild(view);
        eventDispatcher.on("gameStarted", () => this.initGameplay());
    }
    start() {
        this.setup().then(() => this.run());
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            assetLoader.bundleAssets();
            yield assetLoader.loadEnemySprites();
            yield assetLoader.loadIconSprites();
            yield assetLoader.loadTowerSprites();
            yield assetLoader.loadOtherImagesSprites();
            this.app.stage.addChild(this.baseContainer);
            const frame = new PIXI.Graphics();
            frame.beginFill(0x000005);
            frame.drawRect(0, 0, window.outerWidth, window.outerHeight);
            frame.endFill();
            this.baseContainer.addChild(frame);
            this.sceneContainer = new PIXI.Container();
            this.sceneManager = new SceneManager(this.sceneContainer);
            const innerFrame = new PIXI.Graphics();
            innerFrame.beginFill(0x000000);
            innerFrame.drawRect(0, 0, sceneContainerWidth, sceneContainerHeight);
            innerFrame.endFill();
            this.sceneContainer.addChild(innerFrame);
            this.baseContainer.addChild(this.sceneContainer);
            this.sceneContainer.x = (this.baseContainer.width - this.sceneContainer.width) / 2;
        });
    }
    run() {
        var _a;
        const mainMenu = new MainMenu(this.app);
        // mainMenu.constructScene(this.sceneContainer)
        mainMenu.constructScene();
        (_a = this.sceneManager) === null || _a === void 0 ? void 0 : _a.transitionScene(mainMenu);
    }
    initGameplay() {
        var _a;
        const gameplayScene = new GameplayScene(this.app);
        gameplayScene.constructScene();
        (_a = this.sceneManager) === null || _a === void 0 ? void 0 : _a.transitionScene(gameplayScene);
        eventDispatcher.on("mainMenuReturn", () => {
            console.log(gameplayScene);
            this.resetGameplayScene(gameplayScene);
            this.run();
        });
        eventDispatcher.on("defeat", () => {
            var _a;
            const mainMenu = new GameOver(this.app);
            // mainMenu.constructScene(this.sceneContainer)
            mainMenu.constructScene();
            this.resetGameplayScene(gameplayScene);
            (_a = this.sceneManager) === null || _a === void 0 ? void 0 : _a.transitionScene(mainMenu);
        });
    }
    resetGameplayScene(gameplayScene) {
        gameplayScene === null || gameplayScene === void 0 ? void 0 : gameplayScene.cleanUpResources();
    }
}
//# sourceMappingURL=Game.js.map