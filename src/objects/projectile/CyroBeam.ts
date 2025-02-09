import Position from "src/ts/types/Position";
import { Enemy } from "../killers/Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../../utils/EventDispatcher";
import { Vector } from "../../utils/Vector";

const eventDispatcher = new EventDispatcher()


export class CyroBeam extends Projectile {
    beamWidth: number;
    slowMultiplier: number;
    soundPitch: number;
    impactRadius: number;

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, slowMultiplier: number, colour : number, beamWidth : number, soundPitch: number, impactRadius: number) {
        super(x, y, width, height, targetEnemy, damage, colour);

        this.graphics = new PIXI.Graphics()
        this.beamWidth = beamWidth
        this.slowMultiplier = slowMultiplier
        this.impactRadius = impactRadius
        this.soundPitch = soundPitch

    }

    fire(deltaTime : number, enemies :Enemy[]) {

        let elapsedTime = 0
        eventDispatcher.fireEvent("towerAttackSoundPlay", {path: "assets/sounds/sfx/cyro_blast_shot.mp3", maxSources: 8, towerName: "Cryo Blast Pillar", volume: 0.7, speed: this.soundPitch})



        const beamOriginPosition = this.getCenterPosition()
        beamOriginPosition.x -= this.width/2
        beamOriginPosition.y -= this.height/2
        let enemyCenterPosition = this.targetEnemy?.getCenterPosition()
        if (enemyCenterPosition) {
            this.beamPosition(beamOriginPosition, enemyCenterPosition, 3 * Math.floor(Math.random() * 3))
        }

        if (this.impactRadius > 0 && this.targetEnemy) {
            this.onImpact(enemies, this.targetEnemy.getCenterPosition())
        } else {
            this.targetEnemy?.takeDamage(this.damage)
            this.slowEnemy(this.slowMultiplier, 200) //apply the slow
        }


        const onTick = () => {
            elapsedTime += deltaTime
            if (this.targetEnemy) {
                enemyCenterPosition = this.targetEnemy?.getCenterPosition()
            }

            this.beamPosition(beamOriginPosition, enemyCenterPosition as Position, 3 * Math.floor(Math.random() * 3))

            if (!this.targetEnemy || !this.targetEnemy.isAlive) {
                this.cleanUpResources()
                return
            }

            if (elapsedTime >= 10) {
                this.cleanUpResources()
                return
            }



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

            if (this.impactRadius > 0) {
                const points = [
                    new PIXI.Point(Math.cos(0),Math.sin(0)),
                    new PIXI.Point(Math.cos(Math.PI/4),Math.sin(Math.PI/4)),
                    new PIXI.Point(Math.cos(Math.PI/2),Math.sin(Math.PI/2)),
                    new PIXI.Point(Math.cos(3 *Math.PI/4),Math.sin(3 * Math.PI/4)),
                    new PIXI.Point(Math.cos(Math.PI),Math.sin(Math.PI)),
                    new PIXI.Point(Math.cos(5 * Math.PI/4),Math.sin(5 * Math.PI/4)),
                    new PIXI.Point(Math.cos(3 * Math.PI/2),Math.sin(3 * Math.PI/2)),
                    new PIXI.Point(Math.cos(7 *Math.PI/4),Math.sin(7 *Math.PI/4)),
                    new PIXI.Point(Math.cos(0),Math.sin(0)),
                ]

                const minFactor = 5
                const maxFactor = 25

                points.forEach(point => {
                    point.x *= maxFactor - Math.floor((Math.random() * (maxFactor - minFactor)))
                    point.y *= maxFactor - Math.floor((Math.random() * (maxFactor - minFactor)))
                    point.x += enemyCenterPosition.x
                    point.y += enemyCenterPosition.y
                })
                this.graphics.drawPolygon(points)
            }
        }

    }

    onImpact(enemies : Enemy[], impactPosition : Position) {

        enemies.forEach((enemy, i) => {
            const enemyPosition = enemy.getCenterPosition()
            const distanceToImpact = new Vector(enemyPosition.x - impactPosition.x, enemyPosition.y - impactPosition.y).magnitude()

            if (distanceToImpact <= this.impactRadius) {
                enemy.takeDamage(Math.ceil(this.damage * ((this.impactRadius - distanceToImpact/2) / this.impactRadius)), i !== 0)
                this.slowOtherEnemy(enemy, this.slowMultiplier, 200) //apply the slow
            }
        })
    }

    slowEnemy(speedMultiplier : number, duration : number) {
        //enemy must be not slow immune
        if (this.targetEnemy && !this.targetEnemy.slowImmune && this.targetEnemy.slowDebuffStats.speedMultiplier >= this.slowMultiplier) {
            this.targetEnemy.slowDebuffStats.speedMultiplier = speedMultiplier
            this.targetEnemy.slowDebuffStats.timeLeft = duration
        }

    }

    //slow other enemies that isnt the direct target
    private slowOtherEnemy(enemy: Enemy, speedMultiplier : number, duration : number) {
        //enemy must be not slow immune
        if (enemy && !enemy.slowImmune && enemy.slowDebuffStats.speedMultiplier >= this.slowMultiplier) {
            enemy.slowDebuffStats.speedMultiplier = speedMultiplier
            enemy.slowDebuffStats.timeLeft = duration
        }
    }

    render(parentContainer : PIXI.Container) {
        if (this.graphics) {
            parentContainer.addChild(this.graphics)
        }
    }
}