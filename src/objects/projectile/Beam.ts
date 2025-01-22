import Position from "src/ts/types/Position";
import { Enemy } from "../killers/Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../../utils/EventDispatcher";

const eventDispatcher = new EventDispatcher()

const effectiveHealthThreshhold = 10000 // this is the highest health a killer/enemy that would still suffer 100% of a basic ice pillar's slowing effect (not cyro pillar)
export class Beam extends Projectile {
    beamWidth: number;
    slowMultiplier: number;

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, slowMultiplier: number, colour : number, beamWidth : number) {
        super(x, y, width, height, targetEnemy, damage, colour);

        this.graphics = new PIXI.Graphics()
        this.beamWidth = beamWidth
        this.slowMultiplier = slowMultiplier

    }

    fire(deltaTime : number) {

        let elapsedTime = 0
        eventDispatcher.fireEvent("towerAttackSoundPlay", {path: "assets/sounds/sfx/ice_beam.mp3", maxSources: 8, towerName: "Ice Pillar", volume: 0.4})

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
            const enemyCenterPosition = this.targetEnemy.getCenterPosition()


            this.beamPosition(beamOriginPosition, enemyCenterPosition, this.beamWidth * (10 - elapsedTime)/10)
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
            let modifiedSpeedMultiplier = speedMultiplier
            if (this.targetEnemy.health > effectiveHealthThreshhold) {

                //20% of the ice pillar's effect for stronger enemies above effectiveHealthThreshhold hp; speed multiplier is 80% reduced
                //ex: if a speed mulltiplier is 0.5, stronger enemies will only suffer a speed multiplier of 0.9 ()
                const speedMultiplierReduction = 1 - speedMultiplier
                modifiedSpeedMultiplier = 1 - (speedMultiplierReduction * 0.2)

            }
            this.targetEnemy.slowDebuffStats.speedMultiplier = modifiedSpeedMultiplier
            this.targetEnemy.slowDebuffStats.timeLeft = duration
        }

    }

    render(parentContainer : PIXI.Container) {
        if (this.graphics) {
            parentContainer.addChild(this.graphics)
        }
    }
}