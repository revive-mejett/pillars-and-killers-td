
import { InfoPanel } from "../UI/InfoPanel.js"
import { UIHelper } from "../UI/UIHelper.js"
import { EventDispatcher } from "../utils/EventDispatcher.js"
import { TowerFactory } from "./TowerFactory.js"

const eventDispatcher = new EventDispatcher()


export class UIManager {
    constructor(app, gamestate, gameplayScene, hud) {
        this.app = app
        this.gamestate = gamestate
        this.hud = hud
        this.gameplayScene = gameplayScene
        this.selectedTowerType = undefined

        this.hud.nextWaveButton

        eventDispatcher.on("nextWaveBtnClick", () => {
            this.gameplayScene.waveManager.sendWave(this.gameplayScene)
            this.updateWaveNumber()
        })

        eventDispatcher.on("towerPlaceAction", this.handleTowerPurchase.bind(this))

        eventDispatcher.on("towerSelectAction", this.displaySelectedTowerInfo.bind(this))

        this.setTowerButtonClickListeners()

    }

    updateMoney() {
        this.hud.moneyText.text = this.gamestate.money
    }

    updateLives() {
        this.hud.livesText.text = this.gamestate.lives
    }

    updateWaveNumber() {
        this.hud.waveNumText.text = `Wave ${this.gameplayScene.waveManager.currentWave}/${this.gameplayScene.waveManager.waves.length}`
        this.hud.waveNumText.x = (this.hud.waveNumText.parent.width - this.hud.waveNumText.width) / 2;
    }

    setSelectedTowerType(towerType) {
        this.selectedTowerType = towerType
    }

    setTowerButtonClickListeners() {
        Object.entries(this.hud.towerSelectionButtons).forEach(buttonEntry => {
            const towerTypeKey = buttonEntry[0]
            const towerButton = buttonEntry[1]
            towerButton.on("pointerdown", () => {
                this.setSelectedTowerType(towerTypeKey)
                this.hud.updateTowerDescriptionUI(TowerFactory.getTowerStats(towerTypeKey))
            })
        })
    }

    handleTowerPurchase(selectedTile) {
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
        tower.runTower(this.gameplayScene)
        eventDispatcher.fireEvent("towerPlaced", tower)

    }

    displaySelectedTowerInfo(tower) {
        /**
         * 
         *         this.range = towerstats.range
                    this.damage = towerstats.damage
                    this.fireRate = towerstats.fireRate,
                    this.cost = towerstats.cost,
                    this.asset = towerstats.asset,
         */
        const hud = this.hud
        hud.clearInfoPanel()

        const padding = 5

        const selectedTowerPanel = InfoPanel.createTowerStatsInfoPanel(tower)
        hud.infoPanel.addChild(selectedTowerPanel)


    }
}