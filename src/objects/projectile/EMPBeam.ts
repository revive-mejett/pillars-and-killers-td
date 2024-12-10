// import Position from "src/ts/types/Position";
import { Entity } from "../Entity";
import { Tower } from "../pillars/Tower";
import * as PIXI from "pixi.js";
// import { EventDispatcher } from "../../utils/EventDispatcher";


export class EMPBeam extends Entity {
    targetTower?: Tower;
    hasHit: boolean;
    updateTicker?: PIXI.Ticker;
    autoStart: boolean;
    graphics?: PIXI.Graphics;

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetTower: Tower) {
        super(x, y, width, height);
        this.hasHit = false
        this.updateTicker = new PIXI.Ticker()
        this.targetTower = targetTower
        this.autoStart = false

    }


    render(parentContainer : PIXI.Container) {
        if (this.graphics) {
            parentContainer.addChild(this.graphics)
            this.graphics.visible = false
        }
    }

    cleanUpResources() {
        this.updateTicker?.stop()
        this.updateTicker?.destroy()
        this.updateTicker = undefined


        if (this.graphics?.parent) {
            this.graphics.parent.removeChild(this.graphics);
        }

        this.graphics?.clear()
        this.graphics?.destroy(true)
        this.graphics = undefined;
        this.targetTower = undefined;
        this.updateTicker = undefined;
    }

}