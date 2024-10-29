import { Entity } from "../Entity.js"

export class Projectile extends Entity {

    /**
     *
     */
    constructor(x, y, width, height, targetEnemy, damage) {
        super(x, y, width, height);
        this.damage = damage
        this.targetEnemy = targetEnemy
        this.hasHit = false

        if (new.target === Projectile) {
            throw new Error("Projectile is an abstract class. Cannot instantiate a Projectile instance")
        }
    }

    setEnemy(enemy) {
        this.targetEnemy = enemy
    }
}