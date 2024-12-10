import Position from "src/ts/types/Position";
import { Vector } from "../../utils/Vector";
import { Enemy } from "../killers/Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../../utils/EventDispatcher";

const eventDispatcher = new EventDispatcher()

export class Missile extends Projectile {
    speed: number;
    impactRadius: number;
    soundPitch: number;

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, colour : number, soundPitch: number, impactRadius: number) {
        super(x, y, width, height, targetEnemy, damage, colour);
        this.speed = 0.6

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(this.colour)
        this.graphics.drawCircle(0,0,this.width/2)
        this.graphics.endFill()

        this.impactRadius = impactRadius
        this.soundPitch = soundPitch
    }

    fire(deltaTime : number, enemies : Enemy[]) {

        eventDispatcher.fireEvent("towerAttackSoundPlay", {path: "assets/sounds/sfx/missile_whoosh.mp3", maxSources: 12, towerName: "Missile Launcher", volume: 0.7, speed: this.soundPitch})

        const onTick = () => {
            if (!this.targetEnemy || !this.targetEnemy.isAlive) {
                const newEnemy = this.seekEnemy(enemies)
                if (newEnemy) {
                    this.targetEnemy = newEnemy
                } else {
                    this.cleanUpResources()
                }
                return
            }



            const bulletCenterPosition = this.getCenterPosition()
            const enemyCenterPosition = this.targetEnemy.getCenterPosition()
            const bulletEnemyVector = new Vector(enemyCenterPosition.x - bulletCenterPosition.x, enemyCenterPosition.y - bulletCenterPosition.y)
            //move the bullet towards enemy in a tickwise fashion
            this.x += bulletEnemyVector.normalize().x * deltaTime * this.speed
            this.y += bulletEnemyVector.normalize().y * deltaTime * this.speed
            this.speed *= 1.0075
            this.updateSpritePosition()


            if (bulletEnemyVector.magnitude() < 5) {
                this.onImpact(enemies, this.getCenterPosition())
                this.hasHit = true
                if (this.graphics) {
                    this.graphics.visible = false
                }
                this.cleanUpResources()
            }
        }

        this.updateTicker?.add(onTick)
        this.updateTicker?.start()
    }


    onImpact(enemies : Enemy[], impactPosition : Position) {

        eventDispatcher.fireEvent("towerAttackSoundPlay", {path: "assets/sounds/sfx/missile_boom.mp3", maxSources: 12, towerName: "Missile Pillar", volume: 1, speed: 1})

        enemies.forEach((enemy) => {
            const enemyPosition = enemy.getCenterPosition()
            const distanceToImpact = new Vector(enemyPosition.x - impactPosition.x, enemyPosition.y - impactPosition.y).magnitude()

            if (distanceToImpact <= this.impactRadius) {
                enemy.takeDamage(Math.ceil(this.damage * ((this.impactRadius - distanceToImpact/2) / this.impactRadius)))
            }
        })
    }

    private seekEnemy(enemies : Enemy[]) {
        let bestEnemy : Enemy | undefined = undefined
        enemies.forEach(enemy => {
            // Check if the enemy is alive and within range
            if (enemy.isAlive) {
                // If we don't have a target or this enemy has traveled further, update the target
                if (!bestEnemy || enemy.distanceTravelled > bestEnemy.distanceTravelled) {
                    bestEnemy = enemy;
                }
            }
        });

        return bestEnemy
    }

    updateSpritePosition() {
        if (!this.graphics) {
            return
        }
        if (!this.graphics.visible) {
            this.graphics.visible = true
        }
        this.graphics.x = this.x
        this.graphics.y = this.y
    }

}