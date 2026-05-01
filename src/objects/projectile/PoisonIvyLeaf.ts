import { Vector } from "../../utils/Vector";
import { Enemy } from "../killers/Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../../utils/EventDispatcher";
import { GlowFilter } from "pixi-filters";

const eventDispatcher = new EventDispatcher()

export class PoisonIvyLeaf extends Projectile {
    speed: number;
    soundPitch: number;
    extraDamage: number;

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, colour : number, soundPitch: number, extraDamage: number) {
        super(x, y, width, height, targetEnemy, damage, colour);
        this.speed = 5


        this.soundPitch = soundPitch
        this.extraDamage = extraDamage

        const factor = 0.3 * width
        let points = [20, 2, 30, 10, 30, 15, 16, 10]
        points = points.map(value => value * factor - this.width * factor)

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(this.colour)
        this.graphics.drawPolygon(points)
        this.graphics.endFill()

        this.graphics.filters = [
            new GlowFilter({innerStrength : 0.1, outerStrength: 3, color: 0x44FF44}) as unknown as PIXI.Filter
        ]
    }

    fire(deltaTime : number) {

        eventDispatcher.fireEvent("towerAttackSoundPlay", {path: "assets/sounds/sfx/tree_leaves.mp3", maxSources: 10, towerName: "Poison Ivy Pillar", volume: 1, speed: this.soundPitch})

        const onTick = () => {
            if (!this.targetEnemy || !this.targetEnemy.isAlive) {
                this.cleanUpResources()
                return
            }



            const bulletCenterPosition = this.getCenterPosition()
            const enemyCenterPosition = this.targetEnemy.getCenterPosition()
            const bulletEnemyVector = new Vector(enemyCenterPosition.x - bulletCenterPosition.x, enemyCenterPosition.y - bulletCenterPosition.y)
            const distanceToEnemy = bulletEnemyVector.magnitude()
            const currentDelta = this.updateTicker?.deltaTime || deltaTime
            const stepDistance = currentDelta * this.speed

            if (distanceToEnemy <= 5 || stepDistance >= distanceToEnemy) {
                this.targetEnemy.takeDamage(this.damage)
                if (this.graphics) {
                    this.graphics.visible = false
                }
                this.spawnImpactParticleBurst({
                    x: this.targetEnemy.getCenterPosition().x,
                    y: this.targetEnemy.getCenterPosition().y,
                    colour: this.colour,
                    count: 4,
                    speedMin: 0.5,
                    speedMax: 1.5,
                    lifeMin: 10,
                    lifeMax: 20,
                    sizeMin: this.width / 2,
                    sizeMax: this.width * 1.1,
                    gravity: 0.01
                })
                this.applyVulnerableDebuff();
                return
            }

            // move the bullet towards enemy in a tickwise fashion
            const direction = bulletEnemyVector.normalize()
            this.x += direction.x * stepDistance
            this.y += direction.y * stepDistance
            this.updateSpritePosition()
        }

        this.updateTicker?.add(onTick)
        this.updateTicker?.start()
    }

    private applyVulnerableDebuff() {
        if (!this.targetEnemy) {
            return
        }
        if (this.targetEnemy.vulnerableDebuffStats.extraDamage <= this.extraDamage) {
            this.targetEnemy.vulnerableDebuffStats.timeLeft = 1000;
            this.targetEnemy.vulnerableDebuffStats.extraDamage = this.extraDamage
        }

        this.hasHit = true;
        this.cleanUpResources();
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