import * as PIXI from "pixi.js";

type EffectKey = "rocketRadialExplosion" | "bossSupernova"

type EffectPayload = {
    x: number
    y: number
    radius?: number
}

type Particle = {
    graphics: PIXI.Graphics
    vx: number
    vy: number
    life: number
    maxLife: number
    gravity: number
}

type Ring = {
    graphics: PIXI.Graphics
    life: number
    maxLife: number
    startRadius: number
    endRadius: number
    stroke: number
    colour: number
}

export class CombatEffectsFactory {
    private readonly container: PIXI.Container<PIXI.DisplayObject>
    private readonly particles: Particle[] = []
    private readonly rings: Ring[] = []
    private readonly registry: Record<EffectKey, (payload: EffectPayload) => void>
    private readonly updateFn: (delta: number) => void

    constructor(container: PIXI.Container<PIXI.DisplayObject>) {
        this.container = container
        this.registry = {
            rocketRadialExplosion: this.spawnRocketRadialExplosion.bind(this),
            bossSupernova: this.spawnBossSupernova.bind(this)
        }
        this.updateFn = this.tick.bind(this)
        PIXI.Ticker.shared.add(this.updateFn)
    }

    play(effect: EffectKey, payload: EffectPayload) {
        this.registry[effect]?.(payload)
    }

    cleanUpResources() {
        PIXI.Ticker.shared.remove(this.updateFn)

        this.particles.forEach(particle => {
            if (particle.graphics.parent) {
                particle.graphics.parent.removeChild(particle.graphics)
            }
            particle.graphics.destroy()
        })
        this.particles.length = 0

        this.rings.forEach(ring => {
            if (ring.graphics.parent) {
                ring.graphics.parent.removeChild(ring.graphics)
            }
            ring.graphics.destroy()
        })
        this.rings.length = 0
    }

    private spawnRocketRadialExplosion(payload: EffectPayload) {
        const blastRadius = payload.radius || 90
        // Halo-style shock ring: bright inner ring plus a softer outer glow ring.
        this.spawnRing(payload.x, payload.y, {
            startRadius: Math.max(6, blastRadius * 0.08),
            endRadius: blastRadius * 0.62,
            life: 16,
            stroke: 6,
            colour: 0xFFE8A3
        })

        this.spawnRing(payload.x, payload.y, {
            startRadius: Math.max(4, blastRadius * 0.05),
            endRadius: blastRadius * 0.66,
            life: 16,
            stroke: 2,
            colour: 0xFF8A00
        })
    }

    private spawnBossSupernova(payload: EffectPayload) {
        const radius = payload.radius || 240

        this.spawnRing(payload.x, payload.y, {
            startRadius: 6,
            endRadius: radius,
            life: 30,
            stroke: 5,
            colour: 0xD8EEFF
        })
        this.spawnRing(payload.x, payload.y, {
            startRadius: 3,
            endRadius: radius * 0.72,
            life: 24,
            stroke: 3,
            colour: 0x76B9FF
        })

        const coreFlash = new PIXI.Graphics()
        coreFlash.beginFill(0xFFFFFF)
        coreFlash.drawCircle(0, 0, 20)
        coreFlash.endFill()
        coreFlash.x = payload.x
        coreFlash.y = payload.y
        coreFlash.alpha = 0.9
        this.container.addChild(coreFlash)
        this.rings.push({
            graphics: coreFlash,
            life: 9,
            maxLife: 9,
            startRadius: 20,
            endRadius: 56,
            stroke: 0,
            colour: 0xFFFFFF
        })

        const particleCount = 52
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2
            const speed = 1.8 + Math.random() * 5.5
            const colourRoll = Math.random()
            const colour = colourRoll < 0.25 ? 0xFFFFFF : colourRoll < 0.6 ? 0xB3DBFF : 0x6CA7FF
            this.spawnParticle(payload.x, payload.y, colour, Math.cos(angle) * speed, Math.sin(angle) * speed, 32 + Math.random() * 24, 0.02)
        }
    }

    private spawnParticle(x: number, y: number, colour: number, vx: number, vy: number, life: number, gravity: number) {
        const graphics = new PIXI.Graphics()
        const radius = 1.4 + Math.random() * 3
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

    private spawnRing(x: number, y: number, ringConfig: { startRadius: number, endRadius: number, life: number, stroke: number, colour: number }) {
        const ring = new PIXI.Graphics()
        ring.x = x
        ring.y = y
        this.container.addChild(ring)
        this.rings.push({
            graphics: ring,
            life: ringConfig.life,
            maxLife: ringConfig.life,
            startRadius: ringConfig.startRadius,
            endRadius: ringConfig.endRadius,
            stroke: ringConfig.stroke,
            colour: ringConfig.colour
        })
    }

    private tick(delta: number) {
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

        for (let i = this.rings.length - 1; i >= 0; i--) {
            const ring = this.rings[i]
            ring.life -= delta
            if (ring.life <= 0) {
                if (ring.graphics.parent) {
                    ring.graphics.parent.removeChild(ring.graphics)
                }
                ring.graphics.destroy()
                this.rings.splice(i, 1)
                continue
            }

            const t = 1 - (ring.life / ring.maxLife)
            const radius = ring.startRadius + (ring.endRadius - ring.startRadius) * t
            ring.graphics.clear()
            if (ring.stroke > 0) {
                ring.graphics.lineStyle(ring.stroke, ring.colour, 1 - t)
                ring.graphics.drawCircle(0, 0, radius)
            } else {
                ring.graphics.beginFill(ring.colour, 1 - t)
                ring.graphics.drawCircle(0, 0, radius)
                ring.graphics.endFill()
            }
            ring.graphics.alpha = 1 - t
        }
    }
}
