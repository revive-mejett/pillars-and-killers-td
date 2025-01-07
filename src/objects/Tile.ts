import { Container } from "pixi.js";
import { Entity } from "./Entity";
import { EventDispatcher } from "../utils/EventDispatcher";
import TileType from "src/ts/types/TileType";
import * as PIXI from "pixi.js";
import { Tower } from "./pillars/Tower";
import { AudioManager } from "../managers/AudioManager";

const audioManager = new AudioManager()
const eventDispatcher = new EventDispatcher()

export class Tile extends Entity {
    tileType: TileType;
    hasTower: boolean;
    container?: PIXI.Container;
    parentContainer: Container<PIXI.DisplayObject>;
    tower?: Tower;

    grassColour : number = 0x001100
    grassOutlineColour : number = 0x005500
    grassOpacity: number

    /**
     * tileType can be either "start", "end", "path", "grass"
     */
    constructor(x : number, y : number, width : number, height : number, tileType: TileType, parentContainer : PIXI.Container, grassColour?: number, grassOutlineColour?: number, grassOpacity?: number) {
        super(x, y, width, height);
        this.tileType = tileType
        this.hasTower = false
        this.container = undefined
        this.parentContainer = parentContainer
        this.tower = undefined
        this.grassColour = grassColour || this.grassColour
        this.grassOutlineColour = grassOutlineColour || this.grassOutlineColour
        this.grassOpacity = grassOpacity || 0.5
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

        audioManager.playSound("assets/sounds/sfx/coin_drop.mp3", 1, 1)
        this.tower.cleanUpResources()
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
        console.log(`\n{
            type: "point",
            x: ${this.x/this.width},
            y: ${this.y/this.width}
        },`)
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
        this.container?.removeChildren()
        const grass = new PIXI.Graphics()
        grass.beginFill(this.grassColour)
        grass.lineStyle(2, this.grassOutlineColour)
        grass.drawRect(this.x, this.y, this.width, this.height)
        grass.endFill()
        grass.alpha = this.grassOpacity
        this.setTileContainer(grass)
    }

    renderTower() {
        if (this.tower) {

            if (!this.tower.sprite) {
                return
            }

            this.container?.removeChildren()
            const tileBackground = new PIXI.Graphics()
            tileBackground.lineStyle(2, 0x000000)
            tileBackground.beginFill(this.tower.tileColour)
            tileBackground.drawRect(this.x, this.y, this.width, this.height)
            tileBackground.endFill()
            this.setTileContainer(tileBackground)
            this.container?.addChild(this.tower.sprite)
            this.container?.addChild(this.tower.zappedGraphics)
        }
    }

}