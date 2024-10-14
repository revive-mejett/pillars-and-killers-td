import { HealthBar } from "../UI/HealthBar"

export class HealthBarManager {
    
    /**
     *
     */
    constructor() {
        this.healthBars = []
    }



    assignHealthBar(enemy) {
        const healthBar = new HealthBar(enemy.position.x, enemy.position.y, enemy.sprite.width, enemy.sprite.height, enemy)
    }
    

}