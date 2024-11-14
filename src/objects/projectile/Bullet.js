import { Vector } from "../../utils/Vector.js";
import { Projectile } from "./Projectile.ts";


export class Bullet extends Projectile {

    /**
     *
     */
    constructor(x, y, width, height, targetEnemy, damage, colour) {
        super(x, y, width, height, targetEnemy, damage, colour);
        this.speed = 5

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(this.colour)
        this.graphics.drawRect(0, 0, this.width, this.height)
        this.graphics.endFill()
    }

    fire(deltaTime) {


        let onTick = () => {
            if (!this.targetEnemy || !this.targetEnemy.isAlive) {
                this.cleanUpResources()
                return
            }



            const bulletCenterPosition = this.getCenterPosition()
            const enemyCenterPosition = this.targetEnemy.getCenterPosition()
            const bulletEnemyVector = new Vector(enemyCenterPosition.x - bulletCenterPosition.x, enemyCenterPosition.y - bulletCenterPosition.y)
            //move the bullet towards enemy in a tickwise fashion
            this.x += bulletEnemyVector.normalize().x * deltaTime * this.speed
            this.y += bulletEnemyVector.normalize().y * deltaTime * this.speed
            this.updateSpritePosition()


            if (bulletEnemyVector.magnitude() < 5) {
                this.targetEnemy.takeDamage(this.damage)
                this.hasHit = true
                this.cleanUpResources()
            }
        }

        this.updateTicker.add(onTick)
        this.updateTicker.start()
    }

    updateSpritePosition() {
        this.graphics.x = this.x
        this.graphics.y = this.y
    }


}