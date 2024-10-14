import { Container, Graphics } from "pixi.js";
import { Entity } from "../objects/Entity";

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

        //remove old health bar
        if (this.healthBarContainer) {
            this.healthBarContainer.clear()
        }

        this.healthBarContainer = new Container()

        //health bar background
        const healthBarBackground = new Graphics()
        healthBarBackground.x = this.enemy.position.x
        healthBarBackground.y = this.enemy.position.y + yOffset
        healthBarBackground.beginFill(0x0000FF)
        healthBarBackground.drawRect(0, 0, 70, 10)// todo change to w/ respect to enemy width
        healthBarBackground.endFill()
        this.healthBarContainer.addChild(healthBarBackground)
        parentContainer.addChild(this.healthBarContainer)
    }
}