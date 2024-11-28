import { Tile } from "src/objects/Tile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../utils/EventDispatcher";
import { UIHelper } from "../UI/UIHelper";
const eventDispatcher = new EventDispatcher()
export class InputManager {


    hoveredTile : Tile | undefined = undefined
    gridContainer: PIXI.Container<PIXI.DisplayObject>;
    selectedTowerTile : Tile | undefined = undefined

    /**
     *
     */
    constructor(mapContainer : PIXI.Container) {

        //this container will contain the range circle, and tile outline and will be in tdmap
        this.gridContainer = new PIXI.Container()
        mapContainer.sortableChildren = true
        mapContainer.zIndex = 10000
        mapContainer.addChild(this.gridContainer)

        eventDispatcher.on("tileHover", this.setHoveredTile.bind(this))
        eventDispatcher.on("tileUnhover", () => this.hoveredTile = undefined)
    }


    setHoveredTile(tile: Tile) {
        this.hoveredTile = tile
    }

    update() {
        this.gridContainer.removeChildren()
        if (this.hoveredTile && this.hoveredTile.tileType === "grass") {
            const greenOutline = UIHelper.createOutline(this.hoveredTile.x, this.hoveredTile.y, this.hoveredTile.width, this.hoveredTile.height, 2, 0x00FF00)
            this.gridContainer.addChild(greenOutline)
        }
    }

    cleanUpResources() {
        eventDispatcher.clearListenersOfEvent("tileHover")
        eventDispatcher.clearListenersOfEvent("tileUnhover")
    }
}