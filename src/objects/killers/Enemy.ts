import Position from "src/ts/types/Position";
import { EventDispatcher } from "../../utils/EventDispatcher"
import { all1st } from "../../utils/Nicknames";
import { Entity } from "../Entity"
import * as PIXI from "pixi.js";
import { TdMap } from "../TdMap";
import { EnemyStats } from "src/ts/types/EnemyData";
import EnemyType from "src/ts/types/EnemyType";
import { AudioManager } from "../../managers/AudioManager";
import { SlowDebuffStats, VulnerableDebuffStats } from "src/ts/types/DebuffStats";
import { Tower } from "../pillars/Tower";
import { Vector } from "../../utils/Vector";
import { EMPBeam } from "../projectile/EMPBeam";
import { shouldBossIgnoreDamageFromAdds } from "../../utils/BossPhaseInvulnerability";

const eventDispatcher = new EventDispatcher()
const audioManager = new AudioManager()
const tickCooldown = 60

const empCooldown = 500

export class Enemy extends Entity {
    enemyClassName: string
    health: number
    totalHealth: number
    speed: number
    damage: number
    killValue: number
    nick: string
    position: Position
    xToNextWaypoint: number
    yToNextWaypoint: number
    nextWayPointIndex: number
    sprite: PIXI.AnimatedSprite | undefined
    spritesheet: PIXI.Spritesheet
    animationSpeed?: number
    rotationSpeed: number
    isLooking: boolean
    distanceTravelled: number
    isAlive: boolean

    direction: "NORTH" | "SOUTH" | "EAST" | "WEST" | undefined


    regen: { amount: number, cooldownSeconds: number } | undefined;
    slowImmune: boolean = false
    armour: number = 0

    enemyType: EnemyType;

    //special properties
    slowDebuffStats: SlowDebuffStats
    vulnerableDebuffStats: VulnerableDebuffStats

    //properties used for EMP enemies
    empCooldown? : number
    towers?: Tower[]
    mapContainer?: PIXI.Container

    /**
     *
     */
    constructor(x: number, y: number, width: number, height: number, stats: EnemyStats, spritesheet: PIXI.Spritesheet) {
        super(x, y, width, height);
        this.enemyClassName = stats.className
        this.health = stats.health
        this.totalHealth = stats.health
        this.speed = stats.speed
        this.damage = stats.damage
        this.killValue = stats.killValue
        this.nick = bossToName(stats.className) || all1st[Math.floor(Math.random() * all1st.length)]
        this.spritesheet = spritesheet
        this.enemyType = stats.type

        //setting special properties

        this.regen = stats.regen ? { amount: stats.regen, cooldownSeconds: tickCooldown } : undefined
        this.slowImmune = stats.slowImmune || this.slowImmune
        this.armour = stats.armour || this.armour

        //setting debuff stats
        this.slowDebuffStats = { speedMultiplier: 1, timeLeft: 0 }
        this.vulnerableDebuffStats = { extraDamage: 0, timeLeft: 0 }

        this.empCooldown = empCooldown

        this.position = { x: x, y: y }


        this.nextWayPointIndex = 1
        this.xToNextWaypoint = 0
        this.yToNextWaypoint = 0
        this.sprite = new PIXI.AnimatedSprite(spritesheet.animations.enemy)
        this.sprite.height = height
        this.sprite.width = width

        // this.sprite.pivot = new PIXI.Point(this.width/2, this.height/2)
        this.animationSpeed = stats.animationSpeed || 0.1
        this.sprite.animationSpeed = this.animationSpeed
        this.sprite.visible = false //dont render when first init.
        this.sprite.anchor.set(0.5, 0.5)
        this.sprite.play()


        this.rotationSpeed = stats.rotationSpeed
        this.isLooking = stats.isLooking

        this.sprite.eventMode = "static"

        this.position.x = x * width
        this.position.y = y * height

        this.distanceTravelled = 0
        this.isAlive = true

        this.sprite.on("pointerdown", () => this.onEnemySelect())
    }

    onEnemySelect() {
        eventDispatcher.fireEvent("enemySelectAction", this)
    }

    //overridden
    getCenterPosition() {
        return {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
    }

    updateSpritePosition() {
        if (!this.sprite) {
            return
        }
        this.sprite.x = this.getCenterPosition().x
        this.sprite.y = this.getCenterPosition().y
    }


    setDistancesToNext(map: TdMap) {
        if (!map.waypoints) {
            return
        }
        this.position.x = map.waypoints[this.nextWayPointIndex - 1].x * map.tileSize
        this.position.y = map.waypoints[this.nextWayPointIndex - 1].y * map.tileSize
        this.xToNextWaypoint = (map.waypoints[this.nextWayPointIndex].x * map.tileSize - this.position.x)
        this.yToNextWaypoint = (map.waypoints[this.nextWayPointIndex].y * map.tileSize - this.position.y)
    }


    findAndAttackTower(delta: number, numberAttacks?: number) {
        if (!this.towers || !this.mapContainer) {
            return
        }

        const towersInRange = this.towers.filter(tower => {
            return this.checkTowerInRange(tower)
        })

        const mapContainer = this.mapContainer

        let possibleNumberAttacks = numberAttacks || 1


        if (towersInRange.length < possibleNumberAttacks) {
            possibleNumberAttacks = towersInRange.length
            towersInRange.forEach(targetTower => {
                if (targetTower && !targetTower.isSold) {
                    const emp = new EMPBeam(this.getCenterPosition().x, this.getCenterPosition().y, 5, 5, targetTower, this)
                    emp.render(mapContainer)
                    emp.fireTower(delta)
                }
            })
        } else {
            //more towers in range than number of attacks
            for (let i = 0; i < possibleNumberAttacks; i++) {
                const randomEnemyIndex = Math.floor(Math.random() * towersInRange.length)

                const targetTower = towersInRange[randomEnemyIndex]
                if (targetTower && !targetTower.isSold) {
                    const emp = new EMPBeam(this.getCenterPosition().x, this.getCenterPosition().y, 5, 5, targetTower, this)
                    emp.render(this.mapContainer)
                    emp.fireTower(delta)
                }
            }
        }


    }

    private checkTowerInRange(tower : Tower) {
        const enemyRange = 200
        const enemyCenterPosition = this.getCenterPosition()
        const towerCenterPosition = tower.getCenterPosition()
        const enemyTowerVector = new Vector(towerCenterPosition.x - enemyCenterPosition.x, towerCenterPosition.y - enemyCenterPosition.y)
        return enemyTowerVector.magnitude() <= enemyRange
    }

    spawn(sceneContainer: PIXI.Container) {
        if (!this.sprite) {
            return
        }
        this.updateRotation()
        sceneContainer.addChild(this.sprite)
        setTimeout(() => {
            if (this.sprite && this.isAlive) {
                this.sprite.visible = true
            }
        }, 50)
    }


    updateMovement(map: TdMap, delta: number) {
        if (!map.waypoints) {
            return
        }
        const waypoints = map.waypoints
        const speed = this.speed

        if (this.nextWayPointIndex >= waypoints.length) {
            return
        }

        if (!this.direction) {
            this.xToNextWaypoint = (waypoints[this.nextWayPointIndex].x * map.tileSize - this.position.x)
            this.yToNextWaypoint = (waypoints[this.nextWayPointIndex].y * map.tileSize - this.position.y)
            this.determineDirection()
        }

        // Total distance the enemy is allowed to travel this frame. We carry this
        // budget across waypoints so corners don't cause progress loss or stalls.
        let travelBudget = speed * delta * this.slowDebuffStats.speedMultiplier

        // Safety cap to avoid any chance of an infinite loop on a malformed map.
        let iterations = 0
        const maxIterations = waypoints.length + 1

        // Move along axis-aligned segments, advancing waypoints as we cross them.
        // Looping here lets a single frame traverse multiple short segments
        // (e.g. on tight corners) without the enemy briefly halting.
        while (travelBudget > 0 && this.nextWayPointIndex < waypoints.length && iterations < maxIterations) {
            iterations++

            const targetX = waypoints[this.nextWayPointIndex].x * map.tileSize
            const targetY = waypoints[this.nextWayPointIndex].y * map.tileSize

            // Distance left to the next waypoint on each axis.
            const dx = targetX - this.position.x
            const dy = targetY - this.position.y

            // If direction is unset (e.g. first frame after spawning, or after
            // a duplicate waypoint), derive it from the current deltas.
            if (!this.direction) {
                this.xToNextWaypoint = dx
                this.yToNextWaypoint = dy
                this.determineDirection()
            }

            let remaining = 0
            let axis: "x" | "y" | undefined
            let sign = 0

            if (this.direction === "EAST") {
                axis = "x"
                sign = 1
                remaining = dx
            } else if (this.direction === "WEST") {
                axis = "x"
                sign = -1
                remaining = -dx
            } else if (this.direction === "SOUTH") {
                axis = "y"
                sign = 1
                remaining = dy
            } else if (this.direction === "NORTH") {
                axis = "y"
                sign = -1
                remaining = -dy
            }

            // If we're at or past the next waypoint along our travel axis
            // (covers exact-landing and any small floating-point overshoot),
            // advance without consuming any of the travel budget.
            if (!axis || remaining <= 0) {
                this.advanceToNextWaypoint(map)
                continue
            }

            const step = Math.min(travelBudget, remaining)
            if (axis === "x") {
                this.position.x += sign * step
            } else {
                this.position.y += sign * step
            }
            this.distanceTravelled += step
            travelBudget -= step

            // Reached the waypoint exactly: advance and let any remaining budget
            // continue along the next segment.
            if (step >= remaining) {
                this.advanceToNextWaypoint(map)
            }
        }

        this.xToNextWaypoint = (waypoints[Math.min(this.nextWayPointIndex, waypoints.length - 1)].x * map.tileSize - this.position.x)
        this.yToNextWaypoint = (waypoints[Math.min(this.nextWayPointIndex, waypoints.length - 1)].y * map.tileSize - this.position.y)

        this.updateRotation(delta)
        this.tickDebuffs(delta)
        this.tickRegen(delta)

        if (this.enemyType === "EMP") {
            this.tickEMP(delta)
        }

        this.updateSpritePosition()
    }

    private advanceToNextWaypoint(map: TdMap) {
        if (!map.waypoints) {
            return
        }
        const waypoints = map.waypoints

        this.nextWayPointIndex++

        if (this.nextWayPointIndex >= waypoints.length) {
            reachEnd(this)
            return
        }

        // Snap to the waypoint we just hit so subsequent direction changes
        // start from a clean axis-aligned position.
        const reachedWaypoint = waypoints[this.nextWayPointIndex - 1]
        this.position.x = reachedWaypoint.x * map.tileSize
        this.position.y = reachedWaypoint.y * map.tileSize

        this.xToNextWaypoint = (waypoints[this.nextWayPointIndex].x * map.tileSize - this.position.x)
        this.yToNextWaypoint = (waypoints[this.nextWayPointIndex].y * map.tileSize - this.position.y)

        this.determineDirection()
    }

    private determineDirection() {
        // Pick the dominant axis so that small floating point drift on the
        // perpendicular axis can't leave the enemy without a direction.
        const absX = Math.abs(this.xToNextWaypoint)
        const absY = Math.abs(this.yToNextWaypoint)

        if (absX === 0 && absY === 0) {
            // No distance to next waypoint (e.g. duplicate waypoint); leave
            // direction unset so the caller can decide to skip ahead.
            this.direction = undefined
            return
        }

        if (absX >= absY) {
            this.direction = this.xToNextWaypoint > 0 ? "EAST" : "WEST"
        } else {
            this.direction = this.yToNextWaypoint > 0 ? "SOUTH" : "NORTH"
        }
    }

    private updateRotation(delta?: number) {
        if (!this.sprite) {
            return
        }
        if (this.isLooking && this.xToNextWaypoint > 0) {
            this.sprite.rotation = Math.PI / 2;
            // this.sprite.anchor.set(0, 1);
        }
        if (this.isLooking && this.xToNextWaypoint < 0) {
            this.sprite.rotation = -Math.PI / 2;
            // this.sprite.anchor.set(1, 0);
        }
        if (this.isLooking && this.yToNextWaypoint > 0) {
            this.sprite.rotation = Math.PI;
            // this.sprite.anchor.set(1, 1);
        }
        if (this.isLooking && this.yToNextWaypoint < 0) {
            this.sprite.rotation = 0;
            // this.sprite.anchor.set(0, 0);
        }

        if (this.rotationSpeed > 0) {
            this.sprite.rotation += this.rotationSpeed * (delta || 0) * 0.1
        }
    }

    tickDebuffs(deltaTime: number) {

        // tick slow debuff
        if (this.slowDebuffStats.timeLeft > 0) {
            this.slowDebuffStats.timeLeft -= deltaTime

            // remove debuff
            if (this.slowDebuffStats.timeLeft <= 0) {
                this.slowDebuffStats.timeLeft = 0
                this.slowDebuffStats.speedMultiplier = 1
            }
        }

        // tick vulnerable debuff
        if (this.vulnerableDebuffStats.timeLeft > 0) {
            this.vulnerableDebuffStats.timeLeft -= deltaTime

            // remove debuff
            if (this.vulnerableDebuffStats.timeLeft <= 0) {
                this.vulnerableDebuffStats.timeLeft = 0
                this.vulnerableDebuffStats.extraDamage = 0
            }
        }

    }

    tickEMP(deltaTime : number) {
        if (this.empCooldown === undefined) {
            return
        }

        const empBefore = this.empCooldown
        this.empCooldown -= deltaTime

        // Fire once when cooldown crosses from positive to non-positive (avoids double-tick bugs and spam if stuck negative)
        if (empBefore > 0 && this.empCooldown <= 0) {

            let numberAttacks = 1

            if (this.enemyClassName === "256p 2152") {
                numberAttacks = 2
            }

            if (this.enemyClassName === "2^1024p 137632") {
                numberAttacks = 5
            }
            this.empCooldown = empCooldown
            this.findAndAttackTower(deltaTime, numberAttacks)
        }
    }

    takeDamage(damage: number, muteImpactSound: boolean = false) {

        if (!this.isAlive) {
            return
        }
        if (shouldBossIgnoreDamageFromAdds(this)) {
            return
        }
        const damageReduction = this.armour

        let actualDamage = damage + this.vulnerableDebuffStats.extraDamage - damageReduction


        if (actualDamage < 0) {
            actualDamage = 0
        }

        const deflectedDamagePercent = Math.floor(damageReduction / damage * 100)

        //play a sound - chance increased the higher the deflected damage percent (100% deflected = always play)
        const rng = Math.floor(Math.random() * 100)

        //bosses always play armour sound even if mute sound is set to true

        if ((!muteImpactSound && rng <= deflectedDamagePercent && this.armour > 0) || (this.enemyType === "Boss" && this.armour > 0)) {
            eventDispatcher.fireEvent("enemyArmorSoundPlay", this.enemyType === "Boss")
        }


        this.health -= actualDamage

        if (this.health <= 0) {
            this.health = 0
            enemyDied(this)
            eventDispatcher.fireEvent("moneyEarned", {source: "bounty", money: this.killValue})
        }
    }

    //propertie effects
    tickRegen(delta: number) {
        if (!this.regen) {
            return
        }
        this.regen.cooldownSeconds -= delta

        if (this.regen.cooldownSeconds <= 0) {

            this.regen.cooldownSeconds = tickCooldown
            //add health
            this.health += this.regen.amount
            //prevent from going over its max health
            if (this.health > this.totalHealth) {
                this.health = this.totalHealth
            }
        }
    }


    cleanUpResources() {
        if (!this.sprite) {
            return
        }
        this.sprite.off("pointerdown")
        if (this.sprite.playing) {
            this.sprite.stop()
        }
        if (this.sprite?.parent) {
            this.sprite.parent.removeChild(this.sprite);
            this.sprite.destroy()

            if (this.sprite?.texture?.baseTexture) {
                this.sprite.texture.destroy(true); // `true` forces the texture's base to be destroyed
            }
            this.sprite = undefined
        }
    }
}

function enemyDied(enemy: Enemy) {
    enemy.isAlive = false

    if (enemy.enemyType === "Boss") {
        audioManager.playBossKilledSound()
    } else {
        audioManager.playKilledSound()
    }


    eventDispatcher.fireEvent("enemyDied", enemy)
    if (enemy.enemyClassName === "Brave Proxima Centauri") {
        eventDispatcher.fireEvent("boss1Killed")
    }
    if (enemy.enemyClassName === "Serious Sirius") {
        eventDispatcher.fireEvent("boss2Killed")
    }
    if (enemy.enemyClassName === "Remorseless Rigel") {
        eventDispatcher.fireEvent("boss3Killed")
    }
    if (enemy.enemyClassName === "Unforgiving Stephenson 2-18") {
        eventDispatcher.fireEvent("boss4Killed")
    }
    if (enemy.enemyClassName === "TON 618") {
        eventDispatcher.fireEvent("boss5Killed")
    }

    enemy.cleanUpResources()
}

function reachEnd(enemy: Enemy) {
    enemy.isAlive = false
    audioManager.playSound("assets/sounds/sfx/live_lost_glass_smash.mp3", 0.7, 1)
    eventDispatcher.fireEvent("enemyReachEnd", enemy.damage)
    eventDispatcher.fireEvent("enemyDied", enemy)
    enemy.cleanUpResources()
}

function bossToName(enemyClass: string) {
    switch (enemyClass) {
    case "Brave Proxima Centauri":
        // Tyler
        return "Tyler"
    case "Serious Sirius":
        // Zhao Qiang
        return "Zhao Qiang"
    case "Remorseless Rigel":
        // Alexandra
        return "Alexandra"
    case "Unforgiving Stephenson 2-18":
        // Kyle
        return "Kyle"
    case "TON 618":
        // François
        return "François"
        break;
    default:
        return undefined
    }
}
