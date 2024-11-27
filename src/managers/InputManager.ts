import { Tile } from "src/objects/Tile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "src/utils/EventDispatcher";
import { UIHelper } from "src/UI/UIHelper";
const eventDispatcher = new EventDispatcher()
export class InputManager {


    hoveredTile : Tile | undefined = undefined
    gridContainer: PIXI.Container<PIXI.DisplayObject>;
    selectedTowerTile : Tile | undefined = undefined

    /**
     *
     */
    constructor() {

        //this container will contain the range circle, and tile outline and will be in tdmap
        this.gridContainer = new PIXI.Container()

        eventDispatcher.on("tileHover", this.setHoveredTile.bind(this))
        eventDispatcher.on("tileUnhover", () => this.hoveredTile = undefined)
    }


    setHoveredTile(tile: Tile) {
        this.hoveredTile = tile
    }

    update() {
        if (this.hoveredTile) {
            const greenOutline = UIHelper.createOutline(this.hoveredTile.x, this.hoveredTile.y, this.hoveredTile.width, this.hoveredTile.height, 0x0000FF)
            this.gridContainer.addChild(greenOutline)
        }
    }
}