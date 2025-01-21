import Position from "src/ts/types/Position";
import { Enemy } from "../killers/Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../../utils/EventDispatcher";

const eventDispatcher = new EventDispatcher()


export class CyroBeam extends Projectile {
    beamWidth: number;
    slowMultiplier: number;
    soundPitch: number

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, slowMultiplier: number, colour : number, beamWidth : number, soundPitch: number) {
        super(x, y, width, height, targetEnemy, damage, colour);

        this.graphics = new PIXI.Graphics()
        this.beamWidth = beamWidth
        this.slowMultiplier = slowMultiplier
        this.soundPitch = soundPitch

    }

    fire(deltaTime : number) {

        let elapsedTime = 0
        eventDispatcher.fireEvent("towerAttackSoundPlay", {path: "assets/sounds/sfx/cyro_blast_shot.mp3", maxSources: 8, towerName: "Cryo Blast Pillar", volume: 0.7, speed: this.soundPitch})

        this.targetEnemy?.takeDamage(this.damage)
        this.slowEnemy(this.slowMultiplier, 200) //apply the slow

        const onTick = () => {
            elapsedTime += deltaTime
            if (!this.targetEnemy || !this.targetEnemy.isAlive) {
                this.cleanUpResources()
                return
            }

            if (elapsedTime >= 10) {
                this.cleanUpResources()
                return
            }

            const beamOriginPosition = this.getCenterPosition() 
            beamOriginPosition.x -= this.width/2
            beamOriginPosition.y -= this.height/2
            const enemyCenterPosition = this.targetEnemy.getCenterPosition()

            this.beamPosition(beamOriginPosition, enemyCenterPosition, 3 * Math.floor(Math.random() * 3))
        }
        this.updateTicker?.add(onTick)
        this.updateTicker?.start()
    }

    beamPosition(beamOriginPosition : Position, enemyCenterPosition : Position, beamWidth : number) {

        if (this.graphics) {
            this.graphics.clear()
            this.graphics.lineStyle(beamWidth, this.colour)
            this.graphics.moveTo(beamOriginPosition.x, beamOriginPosition.y)
            this.graphics.lineTo(enemyCenterPosition.x, enemyCenterPosition.y)
        }

    }

    slowEnemy(speedMultiplier : number, duration : number) {
        //enemy must be not slow immune
        if (this.targetEnemy && !this.targetEnemy.slowImmune && this.targetEnemy.slowDebuffStats.speedMultiplier >= this.slowMultiplier) {
            this.targetEnemy.slowDebuffStats.speedMultiplier = speedMultiplier
            this.targetEnemy.slowDebuffStats.timeLeft = duration
        }

    }

    render(parentContainer : PIXI.Container) {
        if (this.graphics) {
            parentContainer.addChild(this.graphics)
        }
    }
}