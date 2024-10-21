import { EventDispatcher } from "../utils/EventDispatcher.js"

const eventDispatcher = new EventDispatcher()

export class UIManager {
    constructor(app, gamestate, gameplayScene, hud) {
        this.app = app
        this.gamestate = gamestate
        this.hud = hud
        this.gameplayScene = gameplayScene

        this.hud.nextWaveButton

        eventDispatcher.on("nextWaveBtnClick", () => {
            this.gameplayScene.waveManager.sendWave(app)
            this.updateWaveNumber()
        })

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
    }

    setSelectedTowerType(towerType) {
        this.selectedTowerType = towerType
    }

    setTowerButtonClickListeners() {
        Object.entries(this.hud.towerSelectionButtons).forEach(buttonEntry => {
            const towerTypeKey = buttonEntry[0]
            const towerButton = buttonEntry[1]
            towerButton.on("pointerdown", () => this.setSelectedTowerType(towerTypeKey))
        })
    }
}