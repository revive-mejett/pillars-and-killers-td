/* eslint-disable no-unused-vars */
import { Enemy } from "../killers/Enemy";
import { Entity } from "../Entity"
import * as PIXI from "pixi.js";


export abstract class Projectile extends Entity {
    damage: number;
    targetEnemy?: Enemy;
    hasHit: boolean;
    updateTicker?: PIXI.Ticker;
    autoStart: boolean;
    colour: number;
    graphics?: PIXI.Graphics;

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, colour : number) {
        super(x, y, width, height);
        this.damage = damage
        this.targetEnemy = targetEnemy
        this.hasHit = false
        this.updateTicker = new PIXI.Ticker()
        this.autoStart = false
        this.colour = colour || 0xFFFFFF


        if (new.target === Projectile) {
            throw new Error("Projectile is an abstract class. Cannot instantiate a Projectile instance")
        }
    }

    setEnemy(enemy : Enemy) {
        this.targetEnemy = enemy
    }

    abstract fire(deltaTime : number, enemies? : Enemy[]) : void


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
        this.targetEnemy = undefined;
        this.updateTicker = undefined;
    }

}