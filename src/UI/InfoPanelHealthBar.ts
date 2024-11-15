import { Container, Graphics } from "pixi.js";
import { HealthBar } from "./HealthBar";
import * as PIXI from "pixi.js";
import { Enemy } from "src/objects/Enemy";

export class InfoPanelHealthBar extends HealthBar {

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, enemy : Enemy) {
        super(x, y, width, height, enemy);
    }

    renderBar(parentContainer : PIXI.Container) {

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
        healthBarBackground.lineStyle(2,0xFF0000)
        healthBarBackground.x = this.x
        healthBarBackground.y = this.y
        healthBarBackground.beginFill(0x000000)
        healthBarBackground.drawRect(0, 0, this.width, this.height)
        healthBarBackground.endFill()
        this.healthBarContainer.addChild(healthBarBackground)

        //actual health bar representation
        const healthBarHealthy = new Graphics()
        healthBarHealthy.x = this.x
        healthBarHealthy.y = this.y
        healthBarHealthy.beginFill(this.getBarColour())
        healthBarHealthy.drawRect(0, 0, this.enemy.health / this.enemy.totalHealth * this.width, this.height)
        healthBarHealthy.endFill()
        this.healthBarContainer.addChild(healthBarHealthy)

        parentContainer.addChild(this.healthBarContainer)
    }

}
