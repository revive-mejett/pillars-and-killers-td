import { Entity } from "./Entity";

export class Tile extends Entity {

    /**
     * tileType can be either "startTile", "endTile", "pathTile", "grassTile"
     */
    constructor(x, y, width, height, tileType, graphics) {
        super(x, y, width, height);
        this.tileType = tileType
        this.graphics = graphics
    }

    markTowerOccupied(hasTower) {
        if (this.tileType !== "grassTile") {
            throw new Error("Must be a grass tile")
        }
        this.hasTower = hasTower
    }

}