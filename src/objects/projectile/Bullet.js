import { Vector } from "../../utils/Vector.js";
import { Projectile } from "./Projectile.js";

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

    }

    flyBullet(deltaTime) {
        if (!this.targetEnemy) {
            this.graphics?.clear()
            return
        }

        const bulletCenterPosition = this.getCenterPosition()
        const enemyCenterPosition = this.targetEnemy.getCenterPosition()


        const bulletEnemyVector = new Vector(enemyCenterPosition.x - bulletCenterPosition.x, enemyCenterPosition.y - bulletCenterPosition.y)

        if (bulletEnemyVector.magnitude() < 5) {
            this.targetEnemy.takeDamage(0.25)
            this.hasHit = true
            this.graphics.clear()
        }
        //move the bullet towards enemy in a tickwise fashion
        this.x += bulletEnemyVector.normalize().x * deltaTime * 5
        this.y += bulletEnemyVector.normalize().y * deltaTime * 5
        this.updateSpritePosition()

    }

    updateSpritePosition() {
        this.graphics.x = this.x
        this.graphics.y = this.y
    }

    render(parentContainer) {
        parentContainer.addChild(this.graphics)
    }
}