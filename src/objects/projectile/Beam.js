import { Projectile } from "./Projectile.ts";

export class Beam extends Projectile {

    /**
     *
     */
    constructor(x, y, width, height, targetEnemy, damage, colour) {
        super(x, y, width, height, targetEnemy, damage, colour);

        this.graphics = new PIXI.Graphics()

    }

    fire(deltaTime) {

        let elapsedTime = 0

        this.targetEnemy.takeDamage(this.damage)
        this.slowEnemy(0.5, 200) //apply the slow

        let onTick = () => {
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

        this.updateTicker.add(onTick)
        this.updateTicker.start()
    }

    beamPosition(beamOriginPosition, enemyCenterPosition, beamSize) {

        this.graphics.clear()
        this.graphics.lineStyle(beamSize, this.colour)
        this.graphics.moveTo(beamOriginPosition.x, beamOriginPosition.y)
        this.graphics.lineTo(enemyCenterPosition.x, enemyCenterPosition.y)
    }

    slowEnemy(speedMultiplier, duration) {
        this.targetEnemy.slowDebuffStats.speedMultiplier = speedMultiplier
        this.targetEnemy.slowDebuffStats.timeLeft = duration
    }
}