import Position from "src/ts/types/Position";
import { Entity } from "../Entity";
import { Tower } from "../pillars/Tower";
import * as PIXI from "pixi.js";
import { AudioManager } from "../../managers/AudioManager";
import { Enemy } from "../killers/Enemy";


const audioManager = new AudioManager()

export class EMPBeam extends Entity {
    targetTower?: Tower;
    hasHit: boolean;
    updateTicker?: PIXI.Ticker;
    autoStart: boolean;
    graphics?: PIXI.Graphics;
    enemySource: Enemy;

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetTower: Tower, enemySource: Enemy) {
        super(x, y, width, height);
        this.hasHit = false
        this.updateTicker = new PIXI.Ticker()
        this.targetTower = targetTower
        this.autoStart = false
        this.graphics = new PIXI.Graphics()
        this.enemySource = enemySource

    }

    fireTower(deltaTime : number) {

        let elapsedTime = 0
        if (!this.targetTower || this.targetTower.isSold) {
            console.log("already sold")
            return
        }

        // TODO add code here to set towerDisabled true
        this.targetTower.disableTower()
        audioManager.playSound("assets/sounds/sfx/emp_zap.mp3", 0.07)



        const onTick = () => {
            elapsedTime += deltaTime
            if (!this.targetTower || this.targetTower.isSold || !this.enemySource || !this.enemySource.isAlive) {
                this.cleanUpResources()
                return
            }

            if (elapsedTime >= 25) {
                this.cleanUpResources()
                return
            }

            const beamOriginPosition = this.enemySource.getCenterPosition()
            const towerCenterPosition = this.targetTower.getCenterPosition()


            this.beamPosition(beamOriginPosition, towerCenterPosition, 3 * Math.floor(Math.random() * 3))
        }

        this.updateTicker?.add(onTick)
        this.updateTicker?.start()
    }

    beamPosition(beamOriginPosition : Position, towerCenterPosition : Position, beamWidth : number) {
        if (this.graphics) {
            this.graphics.clear()
            this.graphics.lineStyle(beamWidth, 0xFFFFFF)
            this.graphics.moveTo(beamOriginPosition.x, beamOriginPosition.y)
            this.graphics.lineTo(towerCenterPosition.x, towerCenterPosition.y)
        }

    }


    render(parentContainer : PIXI.Container) {
        if (this.graphics) {
            console.log("render")
            parentContainer.addChild(this.graphics)
            this.graphics.visible = true
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