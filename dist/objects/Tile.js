import { Container } from "pixi.js";
import { Entity } from "./Entity";
import { EventDispatcher } from "../utils/EventDispatcher";
import * as PIXI from "pixi.js";
const eventDispatcher = new EventDispatcher();
export class Tile extends Entity {
    /**
     * tileType can be either "start", "end", "path", "grass"
     */
    constructor(x, y, width, height, tileType, parentContainer) {
        super(x, y, width, height);
        this.tileType = tileType;
        this.hasTower = false;
        this.container = undefined;
        this.parentContainer = parentContainer;
        this.tower = undefined;
    }
    sellTower() {
        const sellValuePercentage = 60;
        if (!this.tower) {
            return;
        }
        this.tower.isSold = true;
        const sellValue = Math.floor(this.tower.cost * sellValuePercentage / 100);
        eventDispatcher.fireEvent("moneyEarned", sellValue);
        eventDispatcher.fireEvent("towerSold");
        this.tower = undefined;
        this.markTowerOccupied(false);
        this.paveGrass();
    }
    markTowerOccupied(hasTower) {
        if (this.tileType !== "grass") {
            throw new Error("Must be a grass tile");
        }
        this.hasTower = hasTower;
    }
    setTileContainer(graphics) {
        this.container = new Container();
        this.container.eventMode = "static";
        this.container.addChild(graphics);
        this.container.on("pointerdown", this.onTileSelect.bind(this));
        this.parentContainer.addChild(this.container);
    }
    onTileSelect() {
        if (this.hasTower) {
            eventDispatcher.fireEvent("towerSelectAction", this.tower);
        }
        else {
            eventDispatcher.fireEvent("towerPlaceAction", this);
        }
    }
    changeTileType(tileType) {
        this.tileType = tileType;
    }
    placeTowerOnTile(tower) {
        this.tower = tower;
        this.renderTower();
        this.markTowerOccupied(true);
    }
    paveGrass() {
        const grass = new PIXI.Graphics();
        grass.beginFill(0x001100);
        grass.lineStyle(2, 0x005500);
        grass.drawRect(this.x, this.y, this.width, this.height);
        grass.endFill();
        this.setTileContainer(grass);
    }
    renderTower() {
        var _a;
        if (this.tower) {
            (_a = this.container) === null || _a === void 0 ? void 0 : _a.addChild(this.tower.sprite);
        }
    }
}
//# sourceMappingURL=Tile.js.map