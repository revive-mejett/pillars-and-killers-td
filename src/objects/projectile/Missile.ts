import Position from "src/ts/types/Position";
import { Vector } from "../../utils/Vector";
import { Enemy } from "../killers/Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../../utils/EventDispatcher";
import { GlowFilter } from "pixi-filters";
import { CombatEffectsFactory } from "../CombatEffectsFactory";

const eventDispatcher = new EventDispatcher()

export class Missile extends Projectile {
    speed: number;
    impactRadius: number;
    soundPitch: number;
    effectsFactory?: CombatEffectsFactory

    /**
     *
     */
    constructor(x: number, y: number, width: number, height: number, targetEnemy: Enemy, damage: number, colour: number, soundPitch: number, impactRadius: number, effectsFactory?: CombatEffectsFactory) {
        super(x, y, width, height, targetEnemy, damage, colour);
        this.speed = 0.6

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(this.colour)
        this.graphics.drawCircle(0, 0, this.width / 2)
        this.graphics.endFill()

        this.graphics.filters = [
            new GlowFilter({ color: 0xFFFF00, innerStrength: 0.1, outerStrength: impactRadius/10 }) as unknown as PIXI.Filter
        ]

        this.impactRadius = impactRadius
        this.soundPitch = soundPitch
        this.effectsFactory = effectsFactory
    }

    fire(deltaTime: number, enemies: Enemy[]) {

        eventDispatcher.fireEvent("towerAttackSoundPlay", { path: "assets/sounds/sfx/missile_whoosh.mp3", maxSources: 6, towerName: "Missile Pillar", volume: 0.5, speed: this.soundPitch })

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
            const distanceToEnemy = bulletEnemyVector.magnitude()
            const currentDelta = this.updateTicker?.deltaTime || deltaTime
            const stepDistance = currentDelta * this.speed

            if (distanceToEnemy <= 5 || stepDistance >= distanceToEnemy) {
                this.onImpact(enemies, this.getCenterPosition())
                this.hasHit = true
                if (this.graphics) {
                    this.graphics.visible = false
                }
                this.cleanUpResources()
                return
            }

            // move the bullet towards enemy in a tickwise fashion
            const direction = bulletEnemyVector.normalize()
            this.x += direction.x * stepDistance
            this.y += direction.y * stepDistance
            this.speed *= 1.0075
            this.updateSpritePosition()
        }

        this.updateTicker?.add(onTick)
        this.updateTicker?.start()
    }


    onImpact(enemies: Enemy[], impactPosition: Position) {

        eventDispatcher.fireEvent("towerAttackSoundPlay", { path: "assets/sounds/sfx/missile_boom.mp3", maxSources: 8, towerName: "Missile Pillar", volume: 1, speed: 1 })
        // Keep the original missile impact burst and layer the ring explosion on top.
        this.spawnImpactParticleBurst({
            x: impactPosition.x,
            y: impactPosition.y,
            colour: 0xFFD54A,
            count: 22,
            speedMin: 1.1,
            speedMax: 3.4,
            lifeMin: 20,
            lifeMax: 36,
            sizeMin: 1.5,
            sizeMax: 3.8,
            gravity: 0.02
        })
        this.effectsFactory?.play("rocketRadialExplosion", {
            x: impactPosition.x,
            y: impactPosition.y,
            radius: this.impactRadius
        })

        enemies.forEach((enemy, i) => {
            const enemyPosition = enemy.getCenterPosition()
            const distanceToImpact = new Vector(enemyPosition.x - impactPosition.x, enemyPosition.y - impactPosition.y).magnitude()

            if (distanceToImpact <= this.impactRadius) {
                enemy.takeDamage(Math.ceil(this.damage * ((this.impactRadius - distanceToImpact / 2) / this.impactRadius)), i !== 0)
            }
        })
    }

    private seekEnemy(enemies: Enemy[]) {
        let bestEnemy: Enemy | undefined = undefined
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