import { Ticker } from "pixi.js";
import { GameState } from "../core/GameState";
import { HealthBarManager } from "../managers/HealthBarManager";
import { UIManager } from "../managers/UIManager";
import { WaveManager } from "../managers/WaveManager";
import { TdMap } from "../objects/TdMap";
import { HUD } from "../UI/HUD";
import { EventDispatcher } from "../utils/EventDispatcher";
import { Scene } from "./Scene";
const eventDispatcher = new EventDispatcher();
export class GameplayScene extends Scene {
    constructor(app) {
        super(app);
        this.tdMap = undefined;
        this.gamestate = undefined;
        this.hud = undefined;
        this.waveManager = undefined;
        this.uiManager = undefined;
        this.enemiesPresent = [];
        this.towersPresent = [];
    }
    constructScene() {
        this.tdMap = new TdMap(1000, 1000, 25);
        this.gamestate = new GameState();
        this.hud = new HUD(this.gamestate);
        this.waveManager = new WaveManager(this.tdMap);
        this.hud.setup(this.container);
        this.uiManager = new UIManager(this.app, this.gamestate, this, this.hud);
        this.gamestate.linkUiManager(this.uiManager);
        this.healthBarManager = new HealthBarManager();
        const gameplaySceneTicker = new Ticker();
        gameplaySceneTicker.autoStart = false;
        gameplaySceneTicker.add(() => this.update());
        gameplaySceneTicker.start();
        eventDispatcher.on("enemySpawn", this.addEnemyToPresent.bind(this));
        eventDispatcher.on("enemyDied", this.updateEnemiesPresentList.bind(this));
        eventDispatcher.on("towerPlaced", this.addTowerToPresent.bind(this));
        eventDispatcher.on("towerSold", this.updateTowersPresent.bind(this));
        eventDispatcher.on("defeat", () => {
            gameplaySceneTicker.stop();
            if (this.waveManager) {
                this.waveManager.waveInProgress = false;
            }
        });
        this.buildMap();
    }
    buildMap() {
        var _a, _b, _c;
        (_a = this.tdMap) === null || _a === void 0 ? void 0 : _a.displayTiles(this.container);
        (_b = this.tdMap) === null || _b === void 0 ? void 0 : _b.displayPath();
        (_c = this.tdMap) === null || _c === void 0 ? void 0 : _c.repaveGrass();
    }
    update() {
        // console.log(new PIXI.interaction.InteractionManager())
        // console.log(this.enemiesPresent);
        var _a;
        this.enemiesPresent.forEach(enemy => {
            if (this.tdMap) {
                enemy === null || enemy === void 0 ? void 0 : enemy.updateMovement(this.tdMap, this.app.ticker.deltaTime);
            }
        });
        this.towersPresent.forEach(tower => {
            if (this.enemiesPresent.length > 0) {
                if (!tower.targetedEnemy) {
                    tower.findEnemy(this.enemiesPresent);
                }
            }
        });
        (_a = this.healthBarManager) === null || _a === void 0 ? void 0 : _a.updateAllHealthBars(this.container);
    }
    updateEnemiesPresentList() {
        this.enemiesPresent = this.enemiesPresent.filter(enemy => enemy.isAlive);
    }
    // updateProjectilesPresent() {
    //     this.projectilesPresent = this.projectilesPresent.filter(projectile => !projectile.hasHit)
    // }
    addEnemyToPresent(enemy) {
        this.enemiesPresent.push(enemy);
    }
    // addProjectileToPresent(projectile) {
    //     this.projectilesPresent.push(projectile)
    // }
    addTowerToPresent(tower) {
        this.towersPresent.push(tower);
    }
    updateTowersPresent() {
        this.towersPresent = this.towersPresent.filter(tower => !tower.isSold);
    }
    cleanUpResources() {
        var _a, _b, _c;
        this.towersPresent = [];
        this.enemiesPresent = [];
        (_a = this.uiManager) === null || _a === void 0 ? void 0 : _a.cleanUpResources();
        this.uiManager = undefined;
        (_b = this.waveManager) === null || _b === void 0 ? void 0 : _b.cleanUpResources();
        this.waveManager = undefined;
        // this.tdMap = null
        this.hud = undefined;
        (_c = this.gamestate) === null || _c === void 0 ? void 0 : _c.cleanUpResources();
        this.gamestate = undefined;
        //clean up event listeners akshan
        eventDispatcher.clearListenersOfEvent("enemySpawn");
        eventDispatcher.clearListenersOfEvent("enemyDied");
        eventDispatcher.clearListenersOfEvent("towerPlaced");
        eventDispatcher.clearListenersOfEvent("towerSold");
        eventDispatcher.clearListenersOfEvent("defeat");
    }
}
//# sourceMappingURL=GameplayScene.js.map