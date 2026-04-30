/* eslint-disable no-unused-vars */
import { Enemy } from "../killers/Enemy";
import { Entity } from "../Entity"
import * as PIXI from "pixi.js";


export abstract class Projectile extends Entity {
    damage: number;
    targetEnemy?: Enemy;
    hasHit: boolean;
    updateTicker?: PIXI.Ticker;
    autoStart: boolean;
    colour: number;
    graphics?: PIXI.Graphics;

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, colour : number) {
        super(x, y, width, height);
        this.damage = damage
        this.targetEnemy = targetEnemy
        this.hasHit = false
        this.updateTicker = new PIXI.Ticker()
        this.autoStart = false
        this.colour = colour || 0xFFFFFF


        if (new.target === Projectile) {
            throw new Error("Projectile is an abstract class. Cannot instantiate a Projectile instance")
        }
    }

    setEnemy(enemy : Enemy) {
        this.targetEnemy = enemy
    }

    abstract fire(deltaTime : number, enemies? : Enemy[]) : void

    protected spawnImpactParticleBurst(config: {
        x: number
        y: number
        colour: number
        count: number
        speedMin: number
        speedMax: number
        lifeMin: number
        lifeMax: number
        sizeMin: number
        sizeMax: number
        gravity?: number
    }) {
        if (!this.graphics?.parent) {
            return
        }
        const parentContainer = this.graphics.parent
        type ImpactParticle = { graphics: PIXI.Graphics, vx: number, vy: number, life: number, maxLife: number, gravity: number }
        const particles: ImpactParticle[] = []

        for (let i = 0; i < config.count; i++) {
            const particle = new PIXI.Graphics()
            const radius = config.sizeMin + Math.random() * (config.sizeMax - config.sizeMin)
            particle.beginFill(config.colour)
            particle.drawCircle(0, 0, radius)
            particle.endFill()
            particle.x = config.x
            particle.y = config.y
            particle.alpha = 1
            parentContainer.addChild(particle)

            const angle = Math.random() * Math.PI * 2
            const speed = config.speedMin + Math.random() * (config.speedMax - config.speedMin)
            const life = config.lifeMin + Math.random() * (config.lifeMax - config.lifeMin)
            particles.push({
                graphics: particle,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life,
                maxLife: life,
                gravity: config.gravity || 0
            })
        }

        const tick = (delta: number) => {
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i]
                particle.life -= delta
                if (particle.life <= 0) {
                    if (particle.graphics.parent) {
                        particle.graphics.parent.removeChild(particle.graphics)
                    }
                    particle.graphics.destroy()
                    particles.splice(i, 1)
                    continue
                }
                particle.vy += particle.gravity * delta
                particle.graphics.x += particle.vx * delta
                particle.graphics.y += particle.vy * delta
                particle.graphics.alpha = particle.life / particle.maxLife
            }

            if (particles.length === 0) {
                PIXI.Ticker.shared.remove(tick)
            }
        }

        PIXI.Ticker.shared.add(tick)
    }


    render(parentContainer : PIXI.Container) {
        if (this.graphics) {
            parentContainer.addChild(this.graphics)
            this.graphics.visible = false
        }
    }

    cleanUpResources() {
        this.updateTicker?.stop()
        this.updateTicker?.destroy()
        this.updateTicker = undefined


        if (this.graphics?.parent) {
            this.graphics.parent.removeChild(this.graphics);
        }

        this.graphics?.clear()
        this.graphics?.destroy(true)
        this.graphics = undefined;

        this.targetEnemy = undefined;
        this.updateTicker = undefined;
    }

}