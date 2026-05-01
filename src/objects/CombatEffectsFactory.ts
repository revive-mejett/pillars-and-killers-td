import * as PIXI from "pixi.js";

type EffectKey = "rocketRadialExplosion" | "bossSupernova"

type EffectPayload = {
    x: number
    y: number
    radius?: number
    /** Boss wave (20 / 40 / 60 / 80 / 100) — drives explosion palette and intensity */
    bossWave?: number
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
        const w = payload.bossWave
        const radius = payload.radius ?? (w === 100 ? 320 : 240)

        // Wave-specific rings + particles (defaults: cool blue if bossWave unknown)
        type BossNovaStyle = {
            ringOuter: number
            ringInner: number
            core: number
            pickParticle: () => number
            particleCount: number
            speedMin: number
            speedMax: number
        }

        const orangeRed: BossNovaStyle = {
            ringOuter: 0xFF5533,
            ringInner: 0xFF2200,
            core: 0xFFAA66,
            pickParticle: () => {
                const r = Math.random()
                if (r < 0.35) { return 0xFF3300 }
                if (r < 0.7) { return 0xFF6600 }
                return 0xFFAA44
            },
            particleCount: 52,
            speedMin: 1.8,
            speedMax: 5.5
        }
        const whiteBlast: BossNovaStyle = {
            ringOuter: 0xF5F5F5,
            ringInner: 0xDDDDEE,
            core: 0xFFFFFF,
            pickParticle: () => {
                const r = Math.random()
                if (r < 0.5) { return 0xFFFFFF }
                if (r < 0.85) { return 0xE8E8F0 }
                return 0xC8C8D8
            },
            particleCount: 52,
            speedMin: 1.6,
            speedMax: 5.2
        }
        const blueBlast: BossNovaStyle = {
            ringOuter: 0xD8EEFF,
            ringInner: 0x76B9FF,
            core: 0xFFFFFF,
            pickParticle: () => {
                const r = Math.random()
                if (r < 0.25) { return 0xFFFFFF }
                if (r < 0.6) { return 0xB3DBFF }
                return 0x6CA7FF
            },
            particleCount: 52,
            speedMin: 1.8,
            speedMax: 5.5
        }
        const redYellow: BossNovaStyle = {
            ringOuter: 0xFFCC00,
            ringInner: 0xFF2200,
            core: 0xFFEE44,
            pickParticle: () => {
                const r = Math.random()
                if (r < 0.33) { return 0xFF0000 }
                if (r < 0.66) { return 0xFFEE00 }
                return 0xFF8800
            },
            particleCount: 56,
            speedMin: 2.0,
            speedMax: 6.0
        }
        const finale: BossNovaStyle = {
            ringOuter: 0xE8CCFF,
            ringInner: 0x8866FF,
            core: 0xFFFFFF,
            pickParticle: () => {
                const r = Math.random()
                if (r < 0.2) { return 0xFFFFFF }
                if (r < 0.45) { return 0xFFDD88 }
                if (r < 0.7) { return 0xAA66FF }
                return 0x66CCFF
            },
            particleCount: 200 + Math.floor(Math.random() * 48),
            speedMin: 1.5,
            speedMax: 7.2
        }

        let style: BossNovaStyle = blueBlast
        if (w === 20) { style = orangeRed }
        else if (w === 40) { style = whiteBlast }
        else if (w === 60) { style = blueBlast }
        else if (w === 80) { style = redYellow }
        else if (w === 100) { style = finale }

        this.spawnRing(payload.x, payload.y, {
            startRadius: 6,
            endRadius: radius,
            life: w === 100 ? 36 : 30,
            stroke: w === 100 ? 6 : 5,
            colour: style.ringOuter
        })
        this.spawnRing(payload.x, payload.y, {
            startRadius: 3,
            endRadius: radius * 0.72,
            life: w === 100 ? 28 : 24,
            stroke: w === 100 ? 4 : 3,
            colour: style.ringInner
        })

        const coreFlash = new PIXI.Graphics()
        coreFlash.beginFill(style.core)
        coreFlash.drawCircle(0, 0, w === 100 ? 28 : 20)
        coreFlash.endFill()
        coreFlash.x = payload.x
        coreFlash.y = payload.y
        coreFlash.alpha = 0.9
        this.container.addChild(coreFlash)
        this.rings.push({
            graphics: coreFlash,
            life: w === 100 ? 12 : 9,
            maxLife: w === 100 ? 12 : 9,
            startRadius: w === 100 ? 28 : 20,
            endRadius: w === 100 ? 72 : 56,
            stroke: 0,
            colour: style.core
        })

        for (let i = 0; i < style.particleCount; i++) {
            const angle = Math.random() * Math.PI * 2
            const speed = style.speedMin + Math.random() * (style.speedMax - style.speedMin)
            const colour = style.pickParticle()
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
