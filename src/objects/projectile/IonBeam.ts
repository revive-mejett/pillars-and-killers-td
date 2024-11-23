import Position from "src/ts/types/Position";
import { Enemy } from "../Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import sound from "pixi-sound";

export class IonBeam extends Projectile {

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, colour : number) {
        super(x, y, width, height, targetEnemy, damage, colour);

        this.graphics = new PIXI.Graphics()

    }

    fire(deltaTime : number) {

        let elapsedTime = 0
        const sfxIceBeamFire = sound.Sound.from({
            url: "assets/sounds/sfx/ion_cannon.mp3",
            volume: 0.4
        })
        sfxIceBeamFire.play()

        let enemyPosition = this.targetEnemy?.getCenterPosition()
        const beamOriginPosition = this.getCenterPosition()
        this.beamPosition(beamOriginPosition, enemyPosition as Position)
        let elapsedOnDeath : number = 0

        const onTick = () => {
            elapsedTime += deltaTime
            if (!this.targetEnemy || !this.targetEnemy.isAlive) {
                elapsedOnDeath += deltaTime
            }

            if (elapsedTime >= 5 || elapsedOnDeath >= 5) {
                this.cleanUpResources()
                return
            }



            if (this.targetEnemy) {
                enemyPosition = this.targetEnemy?.getCenterPosition()
            }
        }

        this.updateTicker?.add(onTick)
        this.updateTicker?.start()
        this.targetEnemy?.takeDamage(this.damage)
    }

    beamPosition(beamOriginPosition : Position, enemyCenterPosition : Position) {
        if (this.graphics) {
            this.graphics.clear()
            this.graphics.lineStyle(1, this.colour)
            this.graphics.beginFill(0xFFFFFF)
            this.graphics.drawRect(beamOriginPosition.x - this.width,0,this.width, beamOriginPosition.y)
            this.graphics.drawRect(enemyCenterPosition.x - this.width,0,this.width, enemyCenterPosition.y)
            this.graphics.endFill()
            this.graphics.lineStyle(1, 0x770000)
            this.graphics.moveTo(beamOriginPosition.x, beamOriginPosition.y)
            this.graphics.lineTo(enemyCenterPosition.x, enemyCenterPosition.y)
        }
    }

    render(parentContainer: PIXI.Container): void {
        if (this.graphics) {
            parentContainer.addChild(this.graphics)
        }
    }
}