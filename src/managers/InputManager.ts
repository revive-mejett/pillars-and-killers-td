import { Tile } from "src/objects/Tile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../utils/EventDispatcher";
import { UIHelper } from "../UI/UIHelper";
const eventDispatcher = new EventDispatcher()
export class InputManager {


    hoveredTile : Tile | undefined = undefined
    gridContainer: PIXI.Container<PIXI.DisplayObject>
    selectedTowerTile : Tile | undefined = undefined
    gridMask: PIXI.Graphics;

    towerRangeDrawn : boolean = false


    private rangeCircle : PIXI.Graphics | undefined = undefined
    private cyanOutline : PIXI.Graphics | undefined = undefined
    // private greenOutline : PIXI.Graphics | undefined = undefined


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

        this.rangeCircle = new PIXI.Graphics()
        this.rangeCircle.mask = this.gridMask

        eventDispatcher.on("tileHover", this.setHoveredTile.bind(this))
        eventDispatcher.on("tileTowerSelect", this.setSelectedTowerTile.bind(this))
        eventDispatcher.on("tileUnhover", () => this.hoveredTile = undefined)
        eventDispatcher.on("towerPlaced", () => {
            this.clearRange();
            this.displayTowerRange()
        })
        eventDispatcher.on("towerUpgraded", () => {
            this.clearRange();
            this.displayTowerRange()
        })
        eventDispatcher.on("towerSold", () => {
            this.clearRange();
        })
    }


    private clearRange() {
        this.rangeCircle = undefined;
        this.towerRangeDrawn = false;
        this.cyanOutline = undefined;
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
        this.towerRangeDrawn = false
        this.rangeCircle = undefined
        this.cyanOutline = undefined
    }

    update() {
        // Remove only non-persistent children
        this.gridContainer.children.filter(child => child !== this.rangeCircle && child !== this.cyanOutline && child !== this.gridMask).forEach(child => {
            if (child instanceof PIXI.Graphics) {
                child.destroy();
            }
            this.gridContainer.removeChild(child);
        });

        if (this.hoveredTile && this.hoveredTile.tileType === "grass") {
            const greenOutline = UIHelper.createOutline(this.hoveredTile.x, this.hoveredTile.y, this.hoveredTile.width, this.hoveredTile.height, 2, 0x00FF00)
            this.gridContainer.addChild(greenOutline)
        }

        if (!this.selectedTowerTile?.tower) {
            this.towerRangeDrawn = false
            if (this.cyanOutline) {
                this.cyanOutline.visible = false
            }
            if (this.rangeCircle) {
                this.rangeCircle.visible = false
            }
        }

        if (this.selectedTowerTile && this.selectedTowerTile.tower && !this.towerRangeDrawn) {

            this.towerRangeDrawn = true

            if (!this.rangeCircle) {
                this.displayTowerRange();
            }


            if (!this.cyanOutline) {
                this.cyanOutline = UIHelper.createOutline(this.selectedTowerTile.x, this.selectedTowerTile.y, this.selectedTowerTile.width, this.selectedTowerTile.height, 2, 0x00FFFF)
                this.gridContainer.addChild(this.cyanOutline)
            }

        }
    }

    private displayTowerRange() {
        if (!this.selectedTowerTile || !this.selectedTowerTile.tower) {
            return
        }
        this.rangeCircle = new PIXI.Graphics();
        this.rangeCircle.lineStyle(1, 0x00FFFF);
        this.rangeCircle.drawEllipse(this.selectedTowerTile.getCenterPosition().x, this.selectedTowerTile.getCenterPosition().y, this.selectedTowerTile.tower.range, this.selectedTowerTile.tower.range);
        this.rangeCircle.mask = this.gridMask;

        // Add the range circle and mask
        if (!this.gridContainer.children.includes(this.gridMask)) {
            this.gridContainer.addChild(this.gridMask);
        }
        this.gridContainer.addChild(this.rangeCircle);
    }

    cleanUpResources() {
        eventDispatcher.clearListenersOfEvent("tileHover")
        eventDispatcher.clearListenersOfEvent("tileUnhover")
        eventDispatcher.clearListenersOfEvent("tileTowerSelect")

    }
}