import { Container } from "pixi.js";
import { Entity } from "./Entity.js";

export class Tile extends Entity {

    /**
     * tileType can be either "start", "end", "path", "grass"
     */
    constructor(x, y, width, height, tileType, parentContainer, graphics) {
        super(x, y, width, height);
        this.tileType = tileType
        this.graphics = graphics
        this.hasTower = false
        this.container = undefined
        this.setTileContainer(parentContainer, graphics)
    }

    markTowerOccupied(hasTower) {
        if (this.tileType !== "grassTile") {
            throw new Error("Must be a grass tile")
        }
        this.hasTower = hasTower
    }

    setTileContainer(parentContainer, graphics) {
        this.container = new Container()
        this.container.eventMode = "static"
        this.container.addChild(graphics)
        this.container.on("pointerdown", () => this.getTileInfo())
        parentContainer.addChild(this.container)
    }

    changeTileType(tileType) {
        this.tileType = tileType
    }

    getTileInfo() {
        console.log(this)
    }

}