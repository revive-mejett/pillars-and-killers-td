import * as PIXI from "pixi.js";
import { Enemy } from "./killers/Enemy";

type Particle = {
    graphics: PIXI.Graphics
    vx: number
    vy: number
    life: number
    maxLife: number
    gravity: number
}

export class EnemyStatusEffectParticles {
    private readonly container: PIXI.Container<PIXI.DisplayObject>
    private readonly particles: Particle[] = []
    private readonly trailCooldownByEnemy = new WeakMap<Enemy, number>()
    private readonly slowColour = 0x3B82F6
    private readonly poisonIvyColour = 0x22C55E
    private readonly killColour = 0xFF8A33

    constructor(container: PIXI.Container<PIXI.DisplayObject>) {
        this.container = container
    }

    update(enemies: Enemy[], delta: number) {
        enemies.forEach(enemy => {
            this.tickTrailCooldown(enemy, delta)
            this.maybeSpawnStatusTrail(enemy)
        })
        this.tickParticles(delta)
    }

    spawnKillBurst(enemy: Enemy) {
        const center = enemy.getCenterPosition()
        const particleCount = 10 + Math.floor(Math.random() * 8)

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2
            const speed = 1.2 + Math.random() * 2.2
            const vx = Math.cos(angle) * speed
            const vy = Math.sin(angle) * speed
            this.spawnParticle(center.x, center.y, this.killColour, vx, vy, 45 + Math.random() * 25, 0.04)
        }
    }

    cleanUpResources() {
        this.particles.forEach(particle => {
            if (particle.graphics.parent) {
                particle.graphics.parent.removeChild(particle.graphics)
            }
            particle.graphics.destroy()
        })
        this.particles.length = 0
    }

    private tickTrailCooldown(enemy: Enemy, delta: number) {
        const currentCooldown = this.trailCooldownByEnemy.get(enemy) || 0
        if (currentCooldown <= 0) {
            return
        }
        this.trailCooldownByEnemy.set(enemy, Math.max(0, currentCooldown - delta))
    }

    private maybeSpawnStatusTrail(enemy: Enemy) {
        const currentCooldown = this.trailCooldownByEnemy.get(enemy) || 0
        if (currentCooldown > 0) {
            return
        }

        const center = enemy.getCenterPosition()
        if (enemy.slowDebuffStats.timeLeft > 0 && enemy.slowDebuffStats.speedMultiplier < 1) {
            this.spawnTrailParticle(center.x, center.y, this.slowColour)
            this.trailCooldownByEnemy.set(enemy, 9)
        }

        if (enemy.vulnerableDebuffStats.timeLeft > 0 && enemy.vulnerableDebuffStats.extraDamage > 0) {
            this.spawnTrailParticle(center.x, center.y, this.poisonIvyColour)
            this.trailCooldownByEnemy.set(enemy, 9)
        }
    }

    private spawnTrailParticle(x: number, y: number, colour: number) {
        const offsetX = (Math.random() - 0.5) * 8
        const offsetY = (Math.random() - 0.5) * 8
        const vx = (Math.random() - 0.5) * 0.6
        const vy = -0.25 - Math.random() * 0.4
        const life = 18 + Math.random() * 8
        this.spawnParticle(x + offsetX, y + offsetY, colour, vx, vy, life, -0.002)
    }

    private spawnParticle(x: number, y: number, colour: number, vx: number, vy: number, life: number, gravity: number) {
        const graphics = new PIXI.Graphics()
        const radius = 1.2 + Math.random() * 2.2
        graphics.beginFill(colour)
        graphics.drawCircle(0, 0, radius)
        graphics.endFill()
        graphics.x = x
        graphics.y = y
        graphics.alpha = 1
        this.container.addChild(graphics)

        this.particles.push({
            graphics,
            vx,
            vy,
            life,
            maxLife: life,
            gravity
        })
    }

    private tickParticles(delta: number) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i]
            particle.life -= delta

            if (particle.life <= 0) {
                if (particle.graphics.parent) {
                    particle.graphics.parent.removeChild(particle.graphics)
                }
                particle.graphics.destroy()
                this.particles.splice(i, 1)
                continue
            }

            particle.vy += particle.gravity * delta
            particle.graphics.x += particle.vx * delta
            particle.graphics.y += particle.vy * delta
            particle.graphics.alpha = particle.life / particle.maxLife
        }
    }
}
