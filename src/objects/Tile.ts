import { Container } from "pixi.js";
import { Entity } from "./Entity";
import { EventDispatcher } from "../utils/EventDispatcher";
import TileType from "src/ts/types/TileType";
import * as PIXI from "pixi.js";
import { Tower } from "./pillars/Tower";


const eventDispatcher = new EventDispatcher()

export class Tile extends Entity {
    tileType: TileType;
    hasTower: boolean;
    container?: PIXI.Container;
    parentContainer: Container<PIXI.DisplayObject>;
    tower?: Tower;

    /**
     * tileType can be either "start", "end", "path", "grass"
     */
    constructor(x : number, y : number, width : number, height : number, tileType: TileType, parentContainer : PIXI.Container) {
        super(x, y, width, height);
        this.tileType = tileType
        this.hasTower = false
        this.container = undefined
        this.parentContainer = parentContainer
        this.tower = undefined

    
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
        this.tower = undefined
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
        this.container.on("mouseenter", () => eventDispatcher.fireEvent("tileHover", this))
        this.container.on("mouseleave", () => eventDispatcher.fireEvent("tileUnhover"))

        this.parentContainer.addChild(this.container)
    }

    onTileSelect() {
        if (this.hasTower) {
            eventDispatcher.fireEvent("towerSelectAction", this.tower)
            eventDispatcher.fireEvent("tileTowerSelect", this)
        } else {
            eventDispatcher.fireEvent("towerPlaceAction", this)
        }
    }

    changeTileType(tileType : TileType) {
        this.tileType = tileType
    }


    placeTowerOnTile(tower : Tower) {
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

            this.container?.removeChildren()
            const tileBackground = new PIXI.Graphics()
            tileBackground.lineStyle(2, 0x005500)
            tileBackground.beginFill(this.tower.tileColour)
            tileBackground.drawRect(this.x, this.y, this.width, this.height)
            tileBackground.endFill()
            this.setTileContainer(tileBackground)
            this.container?.addChild(this.tower.sprite)
        }
    }

}