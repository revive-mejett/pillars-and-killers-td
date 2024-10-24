import { Projectile } from "./Projectile.js";


export class Bullet extends Projectile {

    /**
     *
     */
    constructor(x, y, width, height, colour) {
        super(x, y, width, height);
        this.colour = colour
    }

    updateMovement(deltaTime) {
        if (!this.targetEnemy) {
            return
        }

        const bulletCenterPosition = this.getCenterPosition()
        const enemyCenterPosition = this.targetEnemy.getCenterPosition()

        const bulletEnemyVector = new Vector(enemyCenterPosition.x - bulletCenterPosition.x, enemyCenterPosition.y - bulletCenterPosition.y)

        if (bulletEnemyVector.magnitude() < 5) {
            this.targetEnemy.takeDamage(5)
        }
        //move the bullet towards enemy in a tickwise fashion
        this.x += bulletEnemyVector.unitVector().x * deltaTime
        this.x += bulletEnemyVector.unitVector().y * deltaTime

    }
}