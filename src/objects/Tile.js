import { Container } from "pixi.js";
import { Entity } from "./Entity.js";

export class Tile extends Entity {

    /**
     * tileType can be either "start", "end", "path", "grass"
     */
    constructor(x, y, width, height, tileType, parentContainer) {
        super(x, y, width, height);
        this.tileType = tileType
        this.hasTower = false
        this.container = undefined
        this.parentContainer = parentContainer
    }


    markTowerOccupied(hasTower) {
        if (this.tileType !== "grassTile") {
            throw new Error("Must be a grass tile")
        }
        this.hasTower = hasTower
    }

    setTileContainer(graphics) {
        this.container = new Container()
        this.container.eventMode = "static"
        this.container.addChild(graphics)
        this.container.on("pointerdown", () => this.getTileInfo())
        this.parentContainer.addChild(this.container)
    }

    changeTileType(tileType) {
        this.tileType = tileType
    }

    //developer function
    getTileInfo() {
        console.log(this)
    }

    


    paveGrass() {
        let grass = new PIXI.Graphics()
        grass.beginFill(0x001100)
        grass.lineStyle(2, 0x005500)
        grass.drawRect(this.x, this.y, this.width, this.height)
        grass.endFill()
        this.setTileContainer(grass)
    }

}