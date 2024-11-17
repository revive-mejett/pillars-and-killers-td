import Position from "src/ts/types/Position";
import { Enemy } from "../Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import sound from "pixi-sound";

export class IonBeam extends Projectile {

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, colour : string) {
        super(x, y, width, height, targetEnemy, damage, colour);

        this.graphics = new PIXI.Graphics()

    }

    fire(deltaTime : number) {

        let elapsedTime = 0
        const sfxIceBeamFire = sound.Sound.from({
            url: "assets/sounds/sfx/ice_beam.mp3",
            volume: 0.4
        })
        sfxIceBeamFire.play()

        this.targetEnemy?.takeDamage(this.damage)

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
            this.graphics.beginFill(0x003333)
            this.graphics.drawRect(beamOriginPosition.x,0, this.width, beamOriginPosition.x)
            this.graphics.endFill()
        }
    }
}