import { Projectile } from "./Projectile.js";


export class Bullet extends Projectile {

    /**
     *
     */
    constructor(x, y, width, height, colour) {
        super(x, y, width, height);
        this.colour = colour
        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0xFFFFFF)
        this.graphics.drawRect(this.x, this.y, this.width, this.height)
        this.graphics.endFill()

    }

    flyBullet(deltaTime) {
        if (!this.targetEnemy) {
            return
        }

        const bulletCenterPosition = this.getCenterPosition()
        const enemyCenterPosition = this.targetEnemy.getCenterPosition()

        const bulletEnemyVector = new Vector(enemyCenterPosition.x - bulletCenterPosition.x, enemyCenterPosition.y - bulletCenterPosition.y)

        if (bulletEnemyVector.magnitude() < 5) {
            this.targetEnemy.takeDamage(5)
            this.hasHit = true
        }
        //move the bullet towards enemy in a tickwise fashion
        this.x += bulletEnemyVector.unitVector().x * deltaTime
        this.y += bulletEnemyVector.unitVector().y * deltaTime
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