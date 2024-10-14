import { HealthBar } from "../UI/HealthBar.js"
import { EventDispatcher } from "../utils/EventDispatcher.js"

const eventDispatcher = new EventDispatcher()

export class HealthBarManager {
    /**
     *
     */
    constructor() {
        this.healthBars = []

        eventDispatcher.on("enemySpawn", this.assignHealthBar.bind(this))
    }



    assignHealthBar(enemy) {
        const healthBar = new HealthBar(enemy.position.x, enemy.position.y, enemy.sprite.width, enemy.sprite.height, enemy)
        this.healthBars.push(healthBar)
    }

    updateAllHealthBars(parentContainer) {
        console.log(this.healthBars)
        this.healthBars.forEach(healthBar => {
            if (healthBar !== null) {
                healthBar?.renderBar(parentContainer)
            }
            
        })
    }



}