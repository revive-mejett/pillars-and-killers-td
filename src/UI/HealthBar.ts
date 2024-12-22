import { Color, Container, Graphics } from "pixi.js";
import { Entity } from "../objects/Entity";
import { Enemy } from "src/objects/killers/Enemy";
import * as PIXI from "pixi.js";

const yOffset = -5

export class HealthBar extends Entity {
    enemy: Enemy;
    healthBarContainer: PIXI.Container | undefined;
    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, enemy : Enemy) {
        super(x, y, width, height);
        this.enemy = enemy
        this.healthBarContainer = undefined
    }

    renderBar(parentContainer : PIXI.Container) {

        if (this.enemy === null || !this.enemy.sprite) {
            return
        }

        //remove old health bar container
        if (this.healthBarContainer) {
            this.healthBarContainer.destroy()
        }

        this.healthBarContainer = new Container()

        //health bar background
        const healthBarBackground = new Graphics()
        if (this.enemy.slowDebuffStats.timeLeft > 0) {
            healthBarBackground.lineStyle(1, 0x0000FF)
        }
        if (this.enemy.vulnerableDebuffStats.timeLeft > 0) {
            healthBarBackground.lineStyle(1, 0x00FF00)
        }
        if (this.enemy.slowDebuffStats.timeLeft > 0 && this.enemy.vulnerableDebuffStats.timeLeft > 0) {
            healthBarBackground.lineStyle(1, 0x00FF99)
        }
        healthBarBackground.x = this.enemy.position.x
        healthBarBackground.y = this.enemy.position.y + yOffset
        healthBarBackground.beginFill(0x000000)
        healthBarBackground.drawRect(0, 0, this.enemy.sprite.width, 4)
        healthBarBackground.endFill()
        this.healthBarContainer.addChild(healthBarBackground)



        //actual health bar representation
        const healthBarHealthy = new Graphics()
        healthBarHealthy.x = this.enemy.position.x
        healthBarHealthy.y = this.enemy.position.y + yOffset
        healthBarHealthy.beginFill(this.getBarColour())
        healthBarHealthy.drawRect(0, 0, this.enemy.health / this.enemy.totalHealth * this.enemy.sprite.width, 4)
        healthBarHealthy.endFill()
        this.healthBarContainer.addChild(healthBarHealthy)

        parentContainer.addChild(this.healthBarContainer)
    }

    deleteBar() {
        this.healthBarContainer?.destroy()
    }

    getBarColour() {
        //I spelt colour with a u because I am canadian!

        let red = 0
        let green = 0
        const blue = 0 //not changing

        //ex: if health is 50/100 red must be 255 and green must be 255
        //ex: if health is 100/100 red must be 0 and green must be 255

        if (this.enemy.health / this.enemy.totalHealth * 100 >= 50) {
            //health is between 50% and 100% colour is b/ yellow and green
            red = 255 - Math.floor(-255 + this.enemy.health / this.enemy.totalHealth * 255 * 2)
            green = 255
        } else {
            red = 255
            green = 255 - Math.floor(255 - this.enemy.health / this.enemy.totalHealth * 255 * 2)
        }

        const colour = new Color({r : red, g: green, b: blue})

        return colour.toHex()

    }
}