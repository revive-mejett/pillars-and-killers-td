import { Enemy } from "src/objects/killers/Enemy"
import { HealthBar } from "../UI/HealthBar"
import { EventDispatcher } from "../utils/EventDispatcher"

import * as PIXI from "pixi.js";

const eventDispatcher = new EventDispatcher()

export class HealthBarManager {
    healthBars: HealthBar[]
    /**
     *
     */
    constructor() {
        this.healthBars = []
        eventDispatcher.on("enemySpawn", this.assignHealthBar.bind(this))
    }



    assignHealthBar(enemy : Enemy) {
        const healthBar = new HealthBar(enemy.position.x, enemy.position.y, enemy.sprite.width, enemy.sprite.height, enemy)
        this.healthBars.push(healthBar)
    }

    updateAllHealthBars(parentContainer : PIXI.Container) {
        const healthBarsToDelete = this.healthBars.filter(healthBar => !healthBar.enemy.isAlive)
        healthBarsToDelete.forEach(healthBar => healthBar.deleteBar())
        this.healthBars = this.healthBars.filter(healthBar => healthBar.enemy.isAlive)
        this.healthBars.forEach(healthBar => {
            healthBar?.renderBar(parentContainer)
        })
    }

}

