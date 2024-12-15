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

    researchLevel: 1 | 2 | 3 | 4 = 1
    readonly tier2ResearchCost: number = 2000
    readonly tier3ResearchCost: number = 25000
    readonly tier4ResearchCost: number = 250000

    constructor() {
        this.lives = 50
        this.money = 400
        this.startWave = 96
        this.researchLevel = 1

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