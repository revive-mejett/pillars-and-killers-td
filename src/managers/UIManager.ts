
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
import { getTowerData } from "../utils/TowerStatsData";
import { AudioManager } from "./AudioManager";



const eventDispatcher = new EventDispatcher()
const audioManager = new AudioManager()

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
            if (this.gameplayScene.waveManager?.bossPresent) {
                return
            }
            if (this.gameplayScene.waveManager?.wavesStarted && !this.gameplayScene.waveManager.waveInProgress) {

                this.gameplayScene.waveManager.cooldownToNextWave = 0
            } else {
                if (this.gameplayScene.waveManager && this.gameplayScene.waveManager.currentWave >= this.gameplayScene.waveManager.waves.length) {
                    this.gameplayScene.waveManager.isFreeplay = true
                }
                this.gameplayScene.waveManager?.sendWaves(this.gameplayScene)
            }
        })

        eventDispatcher.on("waveStarted", () => {
            this.updateWaveNumber()
            audioManager.playSound("assets/sounds/sfx/rock_break.mp3", 0.7)
        })

        eventDispatcher.on("towerPlaceAction", this.handleTowerPurchase.bind(this))

        eventDispatcher.on("towerSelectAction", this.displaySelectedTowerInfo.bind(this))

        eventDispatcher.on("towerUpgradeAction", this.handleTowerUpgradePurchase.bind(this))

        eventDispatcher.on("towerSellAction", () => this.hud.clearInfoPanel())

        eventDispatcher.on("enemySelectAction", this.displaySelectedEnemyInfo.bind(this))


        eventDispatcher.on("researchTier2Action", () => this.handleResearchAction(2, this.gamestate.tier2ResearchCost))
        eventDispatcher.on("researchTier3Action", () => this.handleResearchAction(3, this.gamestate.tier3ResearchCost))
        eventDispatcher.on("researchTier4Action", () => this.handleResearchAction(4, this.gamestate.tier4ResearchCost))

        this.setTowerButtonClickListeners()

    }

    handleResearchAction(tier: 1 | 2 | 3 | 4, researchCost: number) {
        if (this.gamestate.money < researchCost) {
            return
        }
        eventDispatcher.fireEvent("purchaseSuccessful1", researchCost)
        this.gamestate.researchLevel = tier
        this.hud.updateTowerSelectionVisibility()

        audioManager.playSound("assets/sounds/sfx/research_successful.mp3", 1, 1)
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



        audioManager.playBuySound()


        eventDispatcher.fireEvent("towerPlaced", tower)
    }

    handleTowerUpgradePurchase(selectedTile : Tile) {
        if (!selectedTile.tower || !selectedTile.tower.upgrades) {
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

        audioManager.playBuySound()
        eventDispatcher.fireEvent("towerUpgraded")

        selectedTile.renderTower()
        this.displaySelectedTowerInfo(selectedTile.tower)
    }

    displaySelectedTowerInfo(tower : Tower) {
        const hud = this.hud
        hud.clearInfoPanel()

        const infoPanel = InfoPanel.createTowerStatsInfoPanel(tower)
        hud.infoPanel?.addChild(infoPanel)
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

        eventDispatcher.clearListenersOfEvent("researchTier2Action")
        eventDispatcher.clearListenersOfEvent("researchTier3Action")
        eventDispatcher.clearListenersOfEvent("researchTier4Action")

        if (this.selectedEnemyUpdateTicker) {
            this.selectedEnemyUpdateTicker.stop()
            this.selectedEnemyUpdateTicker.destroy()
        }
    }
}