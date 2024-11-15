
import { Ticker } from "pixi.js"
import { InfoPanel } from "../UI/InfoPanel"
import { EventDispatcher } from "../utils/EventDispatcher"
import { TowerFactory } from "./TowerFactory"

import * as PIXI from "pixi.js";
import { GameState } from "src/core/GameState";
import { HUD } from "src/UI/HUD";
import { GameplayScene } from "src/scenes/GameplayScene";
import { Tile } from "src/objects/Tile";
import { Tower } from "src/objects/pillars/Tower";
import { Enemy } from "src/objects/Enemy";


const eventDispatcher = new EventDispatcher()


export class UIManager {
    app: PIXI.Application<PIXI.ICanvas>;
    gamestate: GameState;
    hud: HUD;
    gameplayScene: GameplayScene;
    selectedTowerType?: string;
    selectedEnemyUpdateTicker?: PIXI.Ticker;

    constructor(app : PIXI.Application, gamestate : GameState, gameplayScene :  GameplayScene, hud : HUD) {
        this.app = app
        this.gamestate = gamestate
        this.hud = hud
        this.gameplayScene = gameplayScene
        this.selectedTowerType = undefined

        this.selectedEnemyUpdateTicker = undefined

        eventDispatcher.on("nextWaveBtnClick", () => {
            this.gameplayScene.waveManager?.sendWave(this.gameplayScene)
            this.updateWaveNumber()
        })

        eventDispatcher.on("towerPlaceAction", this.handleTowerPurchase.bind(this))

        eventDispatcher.on("towerSelectAction", this.displaySelectedTowerInfo.bind(this))

        eventDispatcher.on("towerSellAction", () => this.hud.clearInfoPanel())

        eventDispatcher.on("enemySelectAction", this.displaySelectedEnemyInfo.bind(this))

        this.setTowerButtonClickListeners()

    }

    updateMoney() {
        if (this.hud && this.hud.moneyText) {
            this.hud.moneyText.text = this.gamestate.money
        }
    }

    updateLives() {
        if (this.hud && this.hud.livesText) {
            this.hud.livesText.text = this.gamestate.lives
        }
    }

    updateWaveNumber() {
        const waveManager = this.gameplayScene.waveManager

        if (!waveManager || ! this.hud.waveNumText) {
            return
        }
        if (waveManager.currentWave > waveManager.waves.length) {
            this.hud.waveNumText.text = `Wave ${waveManager.currentWave}`
        } else {
            this.hud.waveNumText.text = `Wave ${waveManager.currentWave}/${waveManager.waves.length}`
        }
        this.hud.waveNumText.x = (this.hud.waveNumText.parent.width - this.hud.waveNumText.width) / 2;
    }

    setSelectedTowerType(towerType : string) {
        this.selectedTowerType = towerType
    }

    setTowerButtonClickListeners() {
        if (!this.hud || !this.hud.towerSelectionButtons) {
            return
        }
        Object.entries(this.hud.towerSelectionButtons).forEach(buttonEntry => {
            const towerTypeKey = buttonEntry[0]
            const towerButton = buttonEntry[1]
            towerButton.on("pointerdown", () => {
                this.setSelectedTowerType(towerTypeKey)
                this.hud.updateTowerDescriptionUI(TowerFactory.getTowerStats(towerTypeKey))
            })
        })
    }

    handleTowerPurchase(selectedTile : Tile) {
        if (!this.selectedTowerType) {
            return
        }

        const towerCost = TowerFactory.getTowerStats(this.selectedTowerType).cost
        if (this.gamestate.money < towerCost) {
            return
        }
        if (selectedTile.tileType !== "grass") {
            console.log("tile type must be grass");
            return
        }
        if (selectedTile.hasTower) {
            console.log("already have tower... selling TODO will be coded once sell button is added");
            return
        }

        eventDispatcher.fireEvent("purchaseSuccessful1", towerCost)
        const tower = TowerFactory.createTower(selectedTile.x, selectedTile.y, selectedTile.width, selectedTile.height, this.selectedTowerType)
        selectedTile.placeTowerOnTile(tower)
        tower.setTileRef(selectedTile)
        tower.runTower(this.gameplayScene)
        eventDispatcher.fireEvent("towerPlaced", tower)
    }

    displaySelectedTowerInfo(tower : Tower) {
        const hud = this.hud
        hud.clearInfoPanel()

        const selectedTowerPanel = InfoPanel.createTowerStatsInfoPanel(tower)
        hud.infoPanel?.addChild(selectedTowerPanel)
    }

    displaySelectedEnemyInfo(enemy : Enemy) {
        const hud = this.hud
        hud.clearInfoPanel()

        this.selectedEnemyUpdateTicker?.stop()
        this.selectedEnemyUpdateTicker?.destroy()
        this.selectedEnemyUpdateTicker = new Ticker()
        this.selectedEnemyUpdateTicker.autoStart = false
        const selectedEnemyPanel = InfoPanel.createEnemyStatsInfoPanel(enemy, hud, this.selectedEnemyUpdateTicker)
        hud.infoPanel?.addChild(selectedEnemyPanel)
    }

    cleanUpResources() {
        eventDispatcher.clearListenersOfEvent("nextWaveBtnClick")
        eventDispatcher.clearListenersOfEvent("towerPlaceAction")
        eventDispatcher.clearListenersOfEvent("towerSelectAction")
        eventDispatcher.clearListenersOfEvent("towerSellAction")
        eventDispatcher.clearListenersOfEvent("enemySelectAction")
    }
}