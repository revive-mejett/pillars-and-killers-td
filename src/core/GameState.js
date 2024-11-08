import { EventDispatcher } from "../utils/EventDispatcher.js"

const eventDispatcher = new EventDispatcher()
export class GameState {
    constructor() {
        this.lives = 30
        this.money = 500
        this.uiManager = undefined

        eventDispatcher.on("enemyReachEnd", this.loseLives.bind(this))
        eventDispatcher.on("purchaseSuccessful1", this.debitMoney.bind(this))
        eventDispatcher.on("moneyEarned", this.gainMoney.bind(this))
    }

    loseLives(damage) {
        this.lives -= damage
        if (this.lives <= 0) {
            this.lives = 0
            eventDispatcher.fireEvent("defeat")
        }
        this.uiManager.updateLives()
    }

    debitMoney(money) {
        this.money -= money
        this.uiManager.updateMoney()
    }

    gainMoney(money) {
        this.money += money
        this.uiManager.updateMoney()
    }

    linkUiManager(uiManager) {
        this.uiManager = uiManager
    }


}