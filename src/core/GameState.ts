import { UIManager } from "src/managers/UIManager"
import { EventDispatcher } from "../utils/EventDispatcher"
import { calculateWaveValue } from "../utils/Calc"
import { productionWaves } from "../utils/WaveData"

const eventDispatcher = new EventDispatcher()
export class GameState {
    lives: number
    money: number
    uiManager?: UIManager
    startWave: number

    constructor() {
        this.lives = 50
        this.money = 9000000
        this.startWave = 99

        //adding all wave values till the current wave: 20 for dev purposes (using production waves only)
        for (let i = 0; i < this.startWave || 0; i++) {
            if (productionWaves[i]) {
                this.money += calculateWaveValue(productionWaves[i])
            } else {
                this.money += 20000
            }
        }

        this.uiManager = undefined

        eventDispatcher.on("enemyReachEnd", this.loseLives.bind(this))
        eventDispatcher.on("purchaseSuccessful1", this.debitMoney.bind(this))
        eventDispatcher.on("moneyEarned", this.gainMoney.bind(this))
    }

    loseLives(damage : number) {

        this.lives -= damage
        if (this.lives <= 0) {
            this.lives = 0
            eventDispatcher.fireEvent("defeat")
        }
        this.uiManager?.updateLives()
    }

    debitMoney(money : number) {
        this.money -= money
        this.uiManager?.updateMoney()
    }

    gainMoney(money : number) {
        this.money += money
        this.uiManager?.updateMoney()
    }

    linkUiManager(uiManager : UIManager) {
        this.uiManager = uiManager
    }

    cleanUpResources() {
        eventDispatcher.clearListenersOfEvent("enemyReachEnd")
        eventDispatcher.clearListenersOfEvent("purchaseSuccessful1")
        eventDispatcher.clearListenersOfEvent("moneyEarned")
    }

}