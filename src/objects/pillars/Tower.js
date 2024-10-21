import { Entity } from "../Entity.js"

//base class for tower
export class Tower extends Entity {
    constructor(x, y, width, height, towerstats) {
        super(x, y, width, height)

        this.range = towerstats.range
        this.damage = towerstats.damage
        this.fireRate = towerstats.fireRate,
        this.cost = towerstats.cost,
        this.asset = towerstats.asset,
        this.position = { x: x, y: y },

        this.sprite = PIXI.Sprite.from(this.asset)
        this.sprite.height = height
        this.sprite.width = width
        this.sprite.x = this.position.x
        this.sprite.y = this.position.y

        if (new.target === Tower) {
            throw new Error("Cant instantiate Tower base class")
        }

    }

    fire() {
        //todo not implemented
    }

    renderOnTile(tile) {
        tile.container.addChild(this.sprite)
    }

}