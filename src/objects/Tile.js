import { Container } from "pixi.js";
import { Entity } from "./Entity.js";
import { TowerFactory } from "../managers/TowerFactory.js";




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
        this.tower = null
    }


    markTowerOccupied(hasTower) {
        if (this.tileType !== "grass") {
            throw new Error("Must be a grass tile")
        }
        this.hasTower = hasTower
    }

    setTileContainer(graphics) {
        this.container = new Container()
        this.container.eventMode = "static"
        this.container.addChild(graphics)
        this.container.on("pointerdown", () => this.placeTowerTest())
        this.parentContainer.addChild(this.container)
    }

    changeTileType(tileType) {
        this.tileType = tileType
    }

    //developer function
    getTileInfo() {
        console.log(this)

    }

    placeTowerTest() {
        if (this.hasTower) {
            console.log("already have tower... selling");

            //todo move sell tower logic somewhere else...
            this.tower = null
            this.markTowerOccupied(false)
            this.paveGrass()
            return
        }

        if (this.tileType !== "grass") {
            console.log("tile type must be grass");
            return
        }

        const towerTypesArr = ["basic", "ice", "advanced", "ultimate"]


        const testTower = TowerFactory.createTower(this.x, this.y, this.width, this.height, towerTypesArr[Math.floor(Math.random() * 4)])
        testTower.renderOnTile(this)
        this.tower = testTower
        this.markTowerOccupied(true)
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