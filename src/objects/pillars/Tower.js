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
        this.position = { x: x, y: y }

        this.sprite = PIXI.Sprite.from(asset)
        this.sprite.height = height
        this.sprite.width = width
        this.sprite.x = this.position.x
        this.sprite.y = this.position.y


    }

    fire() {
        //todo not implemented
    }

    renderOnTile(tile) {
        tile.container.addChild(this.sprite)
    }

}