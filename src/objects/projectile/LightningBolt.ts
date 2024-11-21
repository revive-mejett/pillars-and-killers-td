import Position from "src/ts/types/Position";
import { Enemy } from "../Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import sound from "pixi-sound";

export class LightningBolt extends Projectile {
    boltWidth: number;

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, colour : number, boltWidth : number) {
        super(x, y, width, height, targetEnemy, damage, colour);

        this.graphics = new PIXI.Graphics()
        this.boltWidth = boltWidth

    }

    fire(deltaTime : number) {

        let elapsedTime = 0
        const sfxIceBeamFire = sound.Sound.from({
            url: "assets/sounds/sfx/zap.mp3",
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


            this.beamPosition(beamOriginPosition, enemyCenterPosition, this.boltWidth * 1)
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

    render(parentContainer : PIXI.Container) {
        if (this.graphics) {
            parentContainer.addChild(this.graphics)
        }
    }
}