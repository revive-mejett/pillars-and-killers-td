import { Entity } from "../Entity.js"

//base class for tower
export class Tower extends Entity {
    constructor(x, y, width, height, range, damage, fireRate, cost, asset) {
        super(x, y, width, height)
        this.range = range
        this.damage = damage
        this.fireRate = fireRate,
        this.cost = cost,
        this.asset = asset
    }

    fire() {
        //todo not implemented
    }

}