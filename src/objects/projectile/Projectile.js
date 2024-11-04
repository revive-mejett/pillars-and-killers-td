import { Entity } from "../Entity.js"

export class Projectile extends Entity {

    /**
     *
     */
    constructor(x, y, width, height, targetEnemy, damage, colour) {
        super(x, y, width, height);
        this.damage = damage
        this.targetEnemy = targetEnemy
        this.hasHit = false
        this.updateTicker = new PIXI.Ticker()
        this.autoStart = false
        this.colour = colour || "0xffffff"

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(this.colour)
        this.graphics.drawRect(0, 0, this.width, this.height)
        this.graphics.endFill()

        if (new.target === Projectile) {
            throw new Error("Projectile is an abstract class. Cannot instantiate a Projectile instance")
        }
    }

    setEnemy(enemy) {
        this.targetEnemy = enemy
    }

    fire(deltaTime) {
        throw new Error("abstract method", deltaTime)
    }

    render(parentContainer) {
        parentContainer.addChild(this.graphics)
    }

    cleanUpResources() {
        this.updateTicker.stop()
        this.updateTicker.destroy()

        if (this.graphics?.parent) {
            this.graphics.parent.removeChild(this.graphics);
        }

        this.graphics?.clear()
        this.graphics = null;
        this.targetEnemy = null;
        this.updateTicker = null;
    }
}