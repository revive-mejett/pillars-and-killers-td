import { Vector } from "../../utils/Vector";
import { Enemy } from "../killers/Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../../utils/EventDispatcher";


const eventDispatcher = new EventDispatcher()

export class Bullet extends Projectile {
    speed: number;
    sfxPath: string | undefined
    towerName: string | undefined

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, bulletSpeed: number, colour : number, sfxPath?: string, towerName?: string) {
        super(x, y, width, height, targetEnemy, damage, colour);
        this.speed = bulletSpeed
        this.sfxPath = sfxPath
        this.towerName = towerName

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(this.colour)
        this.graphics.drawRect(0, 0, this.width, this.height)
        this.graphics.endFill()
    }

    fire(deltaTime : number) {
        if (this.sfxPath && this.towerName) {
            eventDispatcher.fireEvent("towerAttackSoundPlay", {path: this.sfxPath, maxSources: 8, towerName: this.towerName, volume: 0.5})
        }

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
            this.updateSpritePosition()
        }

        this.updateTicker?.add(onTick)
        this.updateTicker?.start()
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