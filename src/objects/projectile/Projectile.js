import { Entity } from "../Entity.js"

export class Projectile extends Entity {

    /**
     *
     */
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.targetEnemy = null
        this.hasHit = false

        if (new.target === Projectile) {
            throw new Error("Projectile is an abstract class. Cannot instantiate a Projectile instance")
        }
    }

    setEnemy(enemy) {
        this.targetEnemy = enemy
    }
}