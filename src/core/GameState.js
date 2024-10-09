import { EventDispatcher } from "../utils/EventDispatcher.js"

export class GameState {
    constructor() {
        this.lives = 200
        this.money = 500
        this.uiManager = undefined

        new EventDispatcher().on("enemyReachEnd", this.loseLives.bind(this))
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

    linkUiManager(uiManager) {
        this.uiManager = uiManager
    }


}