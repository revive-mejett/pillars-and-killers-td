import { EventDispatcher } from "../utils/EventDispatcher.js"

const eventDispatcher = new EventDispatcher()
export class GameState {
    constructor() {
        this.lives = 300
        this.money = 20000
        this.uiManager = undefined

        eventDispatcher.on("enemyReachEnd", this.loseLives.bind(this))
        eventDispatcher.on("purchaseMade", this.debitMoney.bind(this))
    }

    loseLives(damage) {
        this.lives -= damage
        if (this.lives <= 0) {
            this.lives = 0
            console.log("game over!!!")
            //TODO Implement game over logic once game over screen is implemented
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