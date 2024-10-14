import { Container, Graphics } from "pixi.js";
import { Entity } from "../objects/Entity.js";

const yOffset = -5

export class HealthBar extends Entity {
    /**
     *
     */
    constructor(x, y, width, height, enemy) {
        super(x, y, width, height);
        this.enemy = enemy
        this.healthBarContainer = undefined
    }

    renderBar(parentContainer) {

        if (this.enemy === null) {
            return
        }

        //remove old health bar container
        if (this.healthBarContainer) {
            this.healthBarContainer.destroy()
        }

        this.healthBarContainer = new Container()

        //health bar background
        const healthBarBackground = new Graphics()
        healthBarBackground.x = this.enemy.position.x
        healthBarBackground.y = this.enemy.position.y + yOffset
        healthBarBackground.beginFill(0x0000FF)
        healthBarBackground.drawRect(0, 0, this.enemy.sprite.width, 4)
        healthBarBackground.endFill()
        this.healthBarContainer.addChild(healthBarBackground)

        //actual health bar representation
        const healthBarHealthy = new Graphics()
        healthBarHealthy.x = this.enemy.position.x
        healthBarHealthy.y = this.enemy.position.y + yOffset
        healthBarHealthy.beginFill(0x00FF00)
        healthBarHealthy.drawRect(0, 0, this.enemy.health / this.enemy.totalHealth * this.enemy.sprite.width, 4)
        healthBarHealthy.endFill()
        this.healthBarContainer.addChild(healthBarHealthy)

        parentContainer.addChild(this.healthBarContainer)
    }
}