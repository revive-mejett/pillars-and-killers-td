import { Entity } from "./Entity.js";

export class Tile extends Entity {

    /**
     * tileType can be either "start", "end", "path", "grass"
     */
    constructor(x, y, width, height, tileType, graphics) {
        super(x, y, width, height);
        this.tileType = tileType
        this.graphics = graphics
        this.hasTower = false
    }

    markTowerOccupied(hasTower) {
        if (this.tileType !== "grassTile") {
            throw new Error("Must be a grass tile")
        }
        this.hasTower = hasTower
    }

    changeGraphics(container, graphics) {
        this.graphics.clear()
        this.graphics = graphics
        container.addChild(graphics)
    }

    changeTileType(tileType) {
        this.tileType = tileType
    }

}