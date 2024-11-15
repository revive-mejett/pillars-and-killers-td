import { Ticker } from "pixi.js";
import { InfoPanel } from "../UI/InfoPanel";
import { EventDispatcher } from "../utils/EventDispatcher";
import { TowerFactory } from "./TowerFactory";
const eventDispatcher = new EventDispatcher();
export class UIManager {
    constructor(app, gamestate, gameplayScene, hud) {
        this.app = app;
        this.gamestate = gamestate;
        this.hud = hud;
        this.gameplayScene = gameplayScene;
        this.selectedTowerType = undefined;
        this.selectedEnemyUpdateTicker = undefined;
        eventDispatcher.on("nextWaveBtnClick", () => {
            var _a;
            (_a = this.gameplayScene.waveManager) === null || _a === void 0 ? void 0 : _a.sendWave(this.gameplayScene);
            this.updateWaveNumber();
        });
        eventDispatcher.on("towerPlaceAction", this.handleTowerPurchase.bind(this));
        eventDispatcher.on("towerSelectAction", this.displaySelectedTowerInfo.bind(this));
        eventDispatcher.on("towerSellAction", () => this.hud.clearInfoPanel());
        eventDispatcher.on("enemySelectAction", this.displaySelectedEnemyInfo.bind(this));
        this.setTowerButtonClickListeners();
    }
    updateMoney() {
        if (this.hud && this.hud.moneyText) {
            this.hud.moneyText.text = this.gamestate.money;
        }
    }
    updateLives() {
        if (this.hud && this.hud.livesText) {
            this.hud.livesText.text = this.gamestate.lives;
        }
    }
    updateWaveNumber() {
        const waveManager = this.gameplayScene.waveManager;
        if (!waveManager || !this.hud.waveNumText) {
            return;
        }
        if (waveManager.currentWave > waveManager.waves.length) {
            this.hud.waveNumText.text = `Wave ${waveManager.currentWave}`;
        }
        else {
            this.hud.waveNumText.text = `Wave ${waveManager.currentWave}/${waveManager.waves.length}`;
        }
        this.hud.waveNumText.x = (this.hud.waveNumText.parent.width - this.hud.waveNumText.width) / 2;
    }
    setSelectedTowerType(towerType) {
        this.selectedTowerType = towerType;
    }
    setTowerButtonClickListeners() {
        if (!this.hud || !this.hud.towerSelectionButtons) {
            return;
        }
        Object.entries(this.hud.towerSelectionButtons).forEach(buttonEntry => {
            const towerTypeKey = buttonEntry[0];
            const towerButton = buttonEntry[1];
            towerButton.on("pointerdown", () => {
                this.setSelectedTowerType(towerTypeKey);
                this.hud.updateTowerDescriptionUI(TowerFactory.getTowerStats(towerTypeKey));
            });
        });
    }
    handleTowerPurchase(selectedTile) {
        if (!this.selectedTowerType) {
            return;
        }
        const towerCost = TowerFactory.getTowerStats(this.selectedTowerType).cost;
        if (this.gamestate.money < towerCost) {
            return;
        }
        if (selectedTile.tileType !== "grass") {
            console.log("tile type must be grass");
            return;
        }
        if (selectedTile.hasTower) {
            console.log("already have tower... selling TODO will be coded once sell button is added");
            return;
        }
        eventDispatcher.fireEvent("purchaseSuccessful1", towerCost);
        const tower = TowerFactory.createTower(selectedTile.x, selectedTile.y, selectedTile.width, selectedTile.height, this.selectedTowerType);
        selectedTile.placeTowerOnTile(tower);
        tower.setTileRef(selectedTile);
        tower.runTower(this.gameplayScene);
        eventDispatcher.fireEvent("towerPlaced", tower);
    }
    displaySelectedTowerInfo(tower) {
        var _a;
        const hud = this.hud;
        hud.clearInfoPanel();
        const selectedTowerPanel = InfoPanel.createTowerStatsInfoPanel(tower);
        (_a = hud.infoPanel) === null || _a === void 0 ? void 0 : _a.addChild(selectedTowerPanel);
    }
    displaySelectedEnemyInfo(enemy) {
        var _a, _b, _c;
        const hud = this.hud;
        hud.clearInfoPanel();
        (_a = this.selectedEnemyUpdateTicker) === null || _a === void 0 ? void 0 : _a.stop();
        (_b = this.selectedEnemyUpdateTicker) === null || _b === void 0 ? void 0 : _b.destroy();
        this.selectedEnemyUpdateTicker = new Ticker();
        this.selectedEnemyUpdateTicker.autoStart = false;
        const selectedEnemyPanel = InfoPanel.createEnemyStatsInfoPanel(enemy, hud, this.selectedEnemyUpdateTicker);
        (_c = hud.infoPanel) === null || _c === void 0 ? void 0 : _c.addChild(selectedEnemyPanel);
    }
    cleanUpResources() {
        eventDispatcher.clearListenersOfEvent("nextWaveBtnClick");
        eventDispatcher.clearListenersOfEvent("towerPlaceAction");
        eventDispatcher.clearListenersOfEvent("towerSelectAction");
        eventDispatcher.clearListenersOfEvent("towerSellAction");
        eventDispatcher.clearListenersOfEvent("enemySelectAction");
    }
}
//# sourceMappingURL=UIManager.js.map