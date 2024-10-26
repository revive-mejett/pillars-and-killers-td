import { EventDispatcher } from "../../utils/EventDispatcher.js";
import { Vector } from "../../utils/Vector.js";
import { Projectile } from "./Projectile.js";

const eventDispatcher = new EventDispatcher()

export class Bullet extends Projectile {

    /**
     *
     */
    constructor(x, y, width, height, colour, enemy) {
        super(x, y, width, height);
        this.colour = colour
        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0xFFFFFF)
        this.graphics.drawRect(0, 0, this.width, this.height)
        this.graphics.endFill()
        this.targetEnemy = enemy

        this.bulletTicker = new PIXI.Ticker()
        this.autoStart = false
    }

    flyBullet(deltaTime) {


        let onTick = () => {
            if (!this.targetEnemy || !this.targetEnemy.isAlive) {
                this.cleanUpResources()
                return
            }



            const bulletCenterPosition = this.getCenterPosition()
            const enemyCenterPosition = this.targetEnemy.getCenterPosition()
            const bulletEnemyVector = new Vector(enemyCenterPosition.x - bulletCenterPosition.x, enemyCenterPosition.y - bulletCenterPosition.y)
            //move the bullet towards enemy in a tickwise fashion
            this.x += bulletEnemyVector.normalize().x * deltaTime * 10
            this.y += bulletEnemyVector.normalize().y * deltaTime * 10
            this.updateSpritePosition()


            if (bulletEnemyVector.magnitude() < 5) {
                this.targetEnemy.takeDamage(0.25)
                this.hasHit = true
                this.cleanUpResources()
            }
        }

        this.bulletTicker.add(onTick)
        this.bulletTicker.start()
    }

    updateSpritePosition() {
        this.graphics.x = this.x
        this.graphics.y = this.y
    }

    render(parentContainer) {
        parentContainer.addChild(this.graphics)
    }

    cleanUpResources() {
        this.bulletTicker.stop()
        this.bulletTicker.destroy()

        if (this.graphics?.parent) {
            this.graphics.parent.removeChild(this.graphics);
        }

        this.graphics?.clear()
        this.graphics = null;
        this.targetEnemy = null;
        this.bulletTicker = null;
    }
}