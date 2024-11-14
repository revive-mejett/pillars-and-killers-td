import { Entity } from "../Entity"
import * as PIXI from "pixi.js";


export class Projectile extends Entity {
    damage: number;
    targetEnemy: any;
    hasHit: boolean;
    updateTicker?: PIXI.Ticker;
    autoStart: boolean;
    colour: string;
    graphics?: PIXI.Graphics;

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : any, damage : number, colour : string) {
        super(x, y, width, height);
        this.damage = damage
        this.targetEnemy = targetEnemy
        this.hasHit = false
        this.updateTicker = new PIXI.Ticker()
        this.autoStart = false
        this.colour = colour || "0xffffff"


        if (new.target === Projectile) {
            throw new Error("Projectile is an abstract class. Cannot instantiate a Projectile instance")
        }
    }

    setEnemy(enemy) {
        this.targetEnemy = enemy
    }

    fire(deltaTime : number) {
        throw new Error("abstract method " + deltaTime)
    }

    render(parentContainer : PIXI.Container) {
        if (this.graphics) {
            parentContainer.addChild(this.graphics)
        }
    }

    cleanUpResources() {
        this.updateTicker.stop()
        this.updateTicker.destroy()

        if (this.graphics?.parent) {
            this.graphics.parent.removeChild(this.graphics);
        }

        this.graphics?.clear()
        this.graphics = undefined;
        this.targetEnemy = undefined;
        this.updateTicker = undefined;
    }

}