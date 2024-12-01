import Position from "src/ts/types/Position";
import { Enemy } from "../killers/Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../../utils/EventDispatcher";


const eventDispatcher = new EventDispatcher()

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
        // audioManager.playSound("assets/sounds/sfx/zap.mp3", 1)
        eventDispatcher.fireEvent("towerAttackSoundPlay", {path: "assets/sounds/sfx/zap.mp3", maxSources: 1, towerName: "Lightning Pillar", volume: 1})

        let enemyCenterPosition = this.targetEnemy?.getCenterPosition()
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

            const beamOriginPosition = this.getCenterPosition()

            if (this.targetEnemy) {
                enemyCenterPosition = this.targetEnemy.getCenterPosition()
                this.beamPosition(beamOriginPosition, enemyCenterPosition, this.boltWidth * 1)
            }

        }
        this.updateTicker?.add(onTick)
        this.updateTicker?.start()
        this.targetEnemy?.takeDamage(this.damage)
    }

    beamPosition(beamOriginPosition : Position, enemyCenterPosition : Position, beamWidth : number) {

        if (this.graphics) {
            this.graphics.clear()
            this.graphics.lineStyle(beamWidth, this.colour)
            this.graphics.moveTo(beamOriginPosition.x - beamWidth, beamOriginPosition.y)
            this.graphics.lineTo(enemyCenterPosition.x, enemyCenterPosition.y)
        }

    }

    render(parentContainer : PIXI.Container) {
        if (this.graphics) {
            parentContainer.addChild(this.graphics)
        }
    }
}