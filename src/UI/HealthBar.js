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

    // updateSpritePosition(){
    //     this.healthBarContainer.x = this.enemy.position.x
    //     this.healthBarContainer.y = this.enemy.position.y
    // }

    renderBar(parentContainer) {

        if (this.enemy === null || !this.enemy.isAlive) {
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
        healthBarBackground.drawRect(0, 0, this.enemy.sprite.width, 4)// todo change to w/ respect to enemy width
        healthBarBackground.endFill()
        this.healthBarContainer.addChild(healthBarBackground)
        parentContainer.addChild(this.healthBarContainer)
    }
}