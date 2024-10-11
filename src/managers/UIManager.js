export class UIManager {
    constructor(gamestate, hud) {
        this.gamestate = gamestate
        this.hud = hud
    }

    updateMoney() {
        this.hud.moneyText.text = this.gamestate.money
    }

    updateLives() {
        this.hud.livesText.text = this.gamestate.lives
    }
}