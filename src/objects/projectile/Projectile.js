import { Entity } from "../Entity.js"

export class Projectile extends Entity {

    /**
     *
     */
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.targetEnemy = null
    }
}