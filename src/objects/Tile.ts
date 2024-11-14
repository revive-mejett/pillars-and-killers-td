import { Container } from "pixi.js";
import { Entity } from "./Entity.js";
import { EventDispatcher } from "../utils/EventDispatcher.js";
import TileType from "src/ts/types/TileType.js";
import * as PIXI from "pixi.js";


const eventDispatcher = new EventDispatcher()

export class Tile extends Entity {
    tileType: string;
    hasTower: boolean;
    container?: PIXI.Container;
    parentContainer: Container<PIXI.DisplayObject>;
    tower: object | null;

    /**
     * tileType can be either "start", "end", "path", "grass"
     */
    constructor(x : number, y : number, width : number, height : number, tileType: TileType, parentContainer : PIXI.Container) {
        super(x, y, width, height);
        this.tileType = tileType
        this.hasTower = false
        this.container = undefined
        this.parentContainer = parentContainer
        this.tower = null
    }

    sellTower() {

        const sellValuePercentage = 60
        if (!this.tower) {
            return
        }

        this.tower.isSold = true
        const sellValue = Math.floor(this.tower.cost * sellValuePercentage/100)

        eventDispatcher.fireEvent("moneyEarned", sellValue)
        eventDispatcher.fireEvent("towerSold")
        this.tower = null
        this.markTowerOccupied(false)
        this.paveGrass()
    }


    markTowerOccupied(hasTower : boolean) {
        if (this.tileType !== "grass") {
            throw new Error("Must be a grass tile")
        }
        this.hasTower = hasTower
    }

    setTileContainer(graphics : PIXI.Graphics) {
        this.container = new Container()
        this.container.eventMode = "static"
        this.container.addChild(graphics)
        this.container.on("pointerdown", this.onTileSelect.bind(this))
        this.parentContainer.addChild(this.container)
    }

    onTileSelect() {
        if (this.hasTower) {
            eventDispatcher.fireEvent("towerSelectAction", this.tower)
        } else {
            eventDispatcher.fireEvent("towerPlaceAction", this)
        }
    }

    changeTileType(tileType : TileType) {
        this.tileType = tileType
    }


    placeTowerOnTile(tower : object) {
        this.tower = tower
        this.renderTower()
        this.markTowerOccupied(true)
    }


    paveGrass() {
        const grass = new PIXI.Graphics()
        grass.beginFill(0x001100)
        grass.lineStyle(2, 0x005500)
        grass.drawRect(this.x, this.y, this.width, this.height)
        grass.endFill()
        this.setTileContainer(grass)
    }

    renderTower() {
        if (this.tower) {
            this.container?.addChild(this.tower.sprite)
        }
    }

}