export class GameState {
    constructor() {
        this.lives = 300
        this.money = 500
    }

    loseLives(damage) {
        this.lives -= damage
        if (this.lives <= 0) {
            this.lives = 0
            console.log("game over!!!")
            //TODO Implement game over logic once game over screen is implemented
        }
    }

}