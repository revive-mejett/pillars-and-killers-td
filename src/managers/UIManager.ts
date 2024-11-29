
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
import { Enemy } from "src/objects/killers/Enemy";
import sound from "pixi-sound";
import { getTowerData } from "../utils/TowerStatsData";



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
            if (this.gameplayScene.waveManager?.wavesStarted && !this.gameplayScene.waveManager.waveInProgress) {
                this.gameplayScene.waveManager.cooldownToNextWave = 0
            } else {
                this.gameplayScene.waveManager?.sendWaves(this.gameplayScene)
            }
        })

        eventDispatcher.on("waveStarted", () => this.updateWaveNumber())

        eventDispatcher.on("towerPlaceAction", this.handleTowerPurchase.bind(this))

        eventDispatcher.on("towerSelectAction", this.displaySelectedTowerInfo.bind(this))

        eventDispatcher.on("towerUpgradeAction", this.handleTowerUpgradePurchase.bind(this))

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
                this.hud.updateTowerDescriptionUI(getTowerData(towerTypeKey))
            })
        })
    }

    handleTowerPurchase(selectedTile : Tile) {
        if (!this.selectedTowerType) {
            // TODO PUT UI MESSAGE
            return
        }

        const towerCost = getTowerData(this.selectedTowerType).towerStats.cost
        if (this.gamestate.money < towerCost) {
            return
        }
        if (selectedTile.tileType !== "grass") {
            // TODO PUT UI MESSAGE
            return
        }
        if (selectedTile.hasTower) {
            // TODO PUT UI MESSAGE
            return
        }

        eventDispatcher.fireEvent("purchaseSuccessful1", towerCost)
        const tower = TowerFactory.createTower(selectedTile.x, selectedTile.y, selectedTile.width, selectedTile.height, this.selectedTowerType)
        selectedTile.placeTowerOnTile(tower)
        tower.setTileRef(selectedTile)
        tower.runTower(this.gameplayScene)


        const sfxBuy = sound.Sound.from({
            url: "assets/sounds/sfx/tower_buy.mp3",
            volume: 0.5
        })
        sfxBuy.play()
        const sfxBuild = sound.Sound.from({
            url: "assets/sounds/sfx/pillar_build.mp3",
            volume: 0.25
        })
        sfxBuild.play()



        eventDispatcher.fireEvent("towerPlaced", tower)
    }

    handleTowerUpgradePurchase(selectedTile : Tile) {
        if (!selectedTile.tower) {
            return
        }

        const upgradeCost = selectedTile.tower?.upgrades[selectedTile.tower.level - 1].cost
        if (this.gamestate.money < upgradeCost) {
            return
        }
        if (!selectedTile.hasTower) {
            // TODO PUT UI MESSAGE
            return
        }

        eventDispatcher.fireEvent("purchaseSuccessful1", upgradeCost)
        selectedTile.tower.upgrade()

        const sfxBuy = sound.Sound.from({
            url: "assets/sounds/sfx/tower_buy.mp3",
            volume: 0.5
        })
        sfxBuy.play()
        const sfxBuild = sound.Sound.from({
            url: "assets/sounds/sfx/pillar_build.mp3",
            volume: 0.25
        })
        sfxBuild.play()
        selectedTile.renderTower()
        this.displaySelectedTowerInfo(selectedTile.tower)
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
        eventDispatcher.clearListenersOfEvent("waveStarted")
        eventDispatcher.clearListenersOfEvent("towerPlaceAction")
        eventDispatcher.clearListenersOfEvent("towerSelectAction")
        eventDispatcher.clearListenersOfEvent("towerSellAction")
        eventDispatcher.clearListenersOfEvent("enemySelectAction")
        eventDispatcher.clearListenersOfEvent("towerUpgradeAction")
        eventDispatcher.clearListenersOfEvent("towerSellAction")
    }
}