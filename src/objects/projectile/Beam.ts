import Position from "src/ts/types/Position";
import { Enemy } from "../Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";

export class Beam extends Projectile {

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, colour : string) {
        super(x, y, width, height, targetEnemy, damage, colour);

        this.graphics = new PIXI.Graphics()

    }

    fire(deltaTime : number) {

        let elapsedTime = 0

        this.targetEnemy.takeDamage(this.damage)
        this.slowEnemy(0.5, 200) //apply the slow

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


            this.beamPosition(beamOriginPosition, enemyCenterPosition, 3 * (10 - elapsedTime)/10)
        }

        this.updateTicker?.add(onTick)
        this.updateTicker?.start()
    }

    beamPosition(beamOriginPosition : Position, enemyCenterPosition : Position, beamSize : number) {

        if (this.graphics) {
            this.graphics.clear()
            this.graphics.lineStyle(beamSize, this.colour)
            this.graphics.moveTo(beamOriginPosition.x, beamOriginPosition.y)
            this.graphics.lineTo(enemyCenterPosition.x, enemyCenterPosition.y)
        }

    }

    slowEnemy(speedMultiplier : number, duration : number) {
        this.targetEnemy.slowDebuffStats.speedMultiplier = speedMultiplier
        this.targetEnemy.slowDebuffStats.timeLeft = duration
    }
}