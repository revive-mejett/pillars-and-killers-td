import { Tile } from "src/objects/Tile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../utils/EventDispatcher";
import { UIHelper } from "../UI/UIHelper";
const eventDispatcher = new EventDispatcher()
export class InputManager {


    hoveredTile : Tile | undefined = undefined
    gridContainer: PIXI.Container<PIXI.DisplayObject>;
    selectedTowerTile : Tile | undefined = undefined
    gridMask: PIXI.Graphics;

    /**
     *
     */
    constructor(sceneContainer : PIXI.Container, mapContainer : PIXI.Container) {

        //this container will contain the range circle, and tile outline and will be in tdmap
        this.gridContainer = new PIXI.Container()
        this.gridContainer.x = 100
        sceneContainer.sortableChildren = true
        sceneContainer.zIndex = 10000
        sceneContainer.addChild(this.gridContainer)

        //mask for the grid to prevent range indicator from going off grid; crops it instead
        this.gridMask = new PIXI.Graphics()
        this.gridMask.beginFill(0xFFFFFF)
        this.gridMask.drawRect(0, 0, mapContainer.width, mapContainer.height);
        this.gridMask.endFill();

        eventDispatcher.on("tileHover", this.setHoveredTile.bind(this))
        eventDispatcher.on("tileTowerSelect", this.setSelectedTowerTile.bind(this))
        eventDispatcher.on("tileUnhover", () => this.hoveredTile = undefined)
    }


    setHoveredTile(tile: Tile | undefined) {
        this.hoveredTile = tile
    }

    setSelectedTowerTile(tile : Tile | undefined) {
        if (!tile || !tile.tower) {
            this.setSelectedTowerTile(undefined)
            return
        }
        this.selectedTowerTile = tile
    }

    update() {
        this.gridContainer.removeChildren()
        if (this.hoveredTile && this.hoveredTile.tileType === "grass") {
            const greenOutline = UIHelper.createOutline(this.hoveredTile.x, this.hoveredTile.y, this.hoveredTile.width, this.hoveredTile.height, 2, 0x00FF00)
            this.gridContainer.addChild(greenOutline)
        }

        if (this.selectedTowerTile && this.selectedTowerTile.tower) {
            const cyanOutline = UIHelper.createOutline(this.selectedTowerTile.x, this.selectedTowerTile.y, this.selectedTowerTile.width, this.selectedTowerTile.height, 2, 0x00FFFF)
            this.gridContainer.addChild(cyanOutline)

            const rangeCircle = new PIXI.Graphics()
            rangeCircle.lineStyle(1, 0x00FFFF)
            rangeCircle.drawEllipse(this.selectedTowerTile.getCenterPosition().x, this.selectedTowerTile.getCenterPosition().y, this.selectedTowerTile.tower.range, this.selectedTowerTile.tower.range)
            rangeCircle.mask = this.gridMask
            this.gridContainer.addChild(this.gridMask)
            this.gridContainer.addChild(rangeCircle)
        }
    }

    cleanUpResources() {
        eventDispatcher.clearListenersOfEvent("tileHover")
        eventDispatcher.clearListenersOfEvent("tileUnhover")
        eventDispatcher.clearListenersOfEvent("tileTowerSelect")

    }
}