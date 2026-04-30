import { Vector } from "../../utils/Vector";
import { Enemy } from "../killers/Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../../utils/EventDispatcher";


const eventDispatcher = new EventDispatcher()

type BulletTrailConfig = {
    colour?: number
    radius?: number
    maxLife?: number
    spawnInterval?: number
}

type TrailParticle = {
    graphics: PIXI.Graphics
    life: number
    maxLife: number
}

export class Bullet extends Projectile {
    speed: number;
    sfxPath: string | undefined
    towerName: string | undefined
    trailConfig?: BulletTrailConfig
    trailParticles: TrailParticle[]
    trailSpawnCooldown: number

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, bulletSpeed: number, colour : number, sfxPath?: string, towerName?: string, trailConfig?: BulletTrailConfig) {
        super(x, y, width, height, targetEnemy, damage, colour);
        this.speed = bulletSpeed
        this.sfxPath = sfxPath
        this.towerName = towerName
        this.trailConfig = trailConfig
        this.trailParticles = []
        this.trailSpawnCooldown = 0

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
            this.updateTrail(currentDelta)
        }

        this.updateTicker?.add(onTick)
        this.updateTicker?.start()
    }

    private updateTrail(deltaTime: number) {
        if (!this.trailConfig || !this.graphics?.parent) {
            return
        }
        const spawnInterval = this.trailConfig.spawnInterval || 1.5
        const maxLife = this.trailConfig.maxLife || 14
        const trailRadius = this.trailConfig.radius || Math.max(1.5, this.width * 0.5)
        const trailColour = this.trailConfig.colour || this.colour
        const parentContainer = this.graphics.parent

        this.trailSpawnCooldown -= deltaTime
        if (this.trailSpawnCooldown <= 0) {
            this.trailSpawnCooldown = spawnInterval

            const trailParticleGraphic = new PIXI.Graphics()
            trailParticleGraphic.beginFill(trailColour)
            trailParticleGraphic.drawCircle(0, 0, trailRadius)
            trailParticleGraphic.endFill()
            trailParticleGraphic.x = this.getCenterPosition().x
            trailParticleGraphic.y = this.getCenterPosition().y
            trailParticleGraphic.alpha = 0.75
            parentContainer.addChild(trailParticleGraphic)

            this.trailParticles.push({
                graphics: trailParticleGraphic,
                life: maxLife,
                maxLife
            })
        }

        for (let i = this.trailParticles.length - 1; i >= 0; i--) {
            const particle = this.trailParticles[i]
            particle.life -= deltaTime
            if (particle.life <= 0) {
                if (particle.graphics.parent) {
                    particle.graphics.parent.removeChild(particle.graphics)
                }
                particle.graphics.destroy()
                this.trailParticles.splice(i, 1)
                continue
            }

            particle.graphics.alpha = (particle.life / particle.maxLife) * 0.75
            particle.graphics.scale.set(0.92 + (particle.life / particle.maxLife) * 0.08)
        }
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

    cleanUpResources() {
        for (const particle of this.trailParticles) {
            if (particle.graphics.parent) {
                particle.graphics.parent.removeChild(particle.graphics)
            }
            particle.graphics.destroy()
        }
        this.trailParticles = []
        super.cleanUpResources()
    }


}