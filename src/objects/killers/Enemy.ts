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
                const randomEnemyIndex = Math.floor(Math.random() * this.towers.length)

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

        if (this.xToNextWaypoint !== 0) {
            this.position.x += (speed) * (this.xToNextWaypoint > 0 ? 1 : -1) * delta * this.slowDebuffStats.speedMultiplier
            this.distanceTravelled += Math.abs(speed * (this.xToNextWaypoint > 0 ? 1 : -1) * delta * this.slowDebuffStats.speedMultiplier)
        }
        else if (this.yToNextWaypoint !== 0) {
            this.position.y += (speed) * (this.yToNextWaypoint > 0 ? 1 : -1) * delta * this.slowDebuffStats.speedMultiplier
            this.distanceTravelled += Math.abs(speed * (this.xToNextWaypoint > 0 ? 1 : -1) * delta * this.slowDebuffStats.speedMultiplier)
        }

        this.updateRotation(delta)
        this.tickDebuffs(delta)
        this.tickRegen(delta)

        if (this.enemyType === "EMP") {
            this.tickEMP(delta)
        }

        this.xToNextWaypoint = (waypoints[this.nextWayPointIndex].x * map.tileSize - this.position.x)
        this.yToNextWaypoint = (waypoints[this.nextWayPointIndex].y * map.tileSize - this.position.y)

        if (!this.direction) {
            this.determineDirection()
        }

        this.updateSpritePosition()

        if (((this.direction === "EAST" && this.xToNextWaypoint < 0) || (this.direction === "WEST" && this.xToNextWaypoint > 0) || (this.direction === "NORTH" && this.yToNextWaypoint > 0) || (this.direction === "SOUTH" && this.yToNextWaypoint < 0)) && this.nextWayPointIndex < waypoints.length) {
            this.nextWayPointIndex++


            if (this.nextWayPointIndex === waypoints.length) {
                reachEnd(this)
            } else {
                this.setDistancesToNext(map)

                this.determineDirection();
            }
        }
    }

    private determineDirection() {
        if (this.xToNextWaypoint > 0 && this.yToNextWaypoint === 0) {
            this.direction = "EAST";
        }
        if (this.xToNextWaypoint < 0 && this.yToNextWaypoint === 0) {
            this.direction = "WEST";
        }
        if (this.xToNextWaypoint === 0 && this.yToNextWaypoint < 0) {
            this.direction = "NORTH";
        }
        if (this.xToNextWaypoint === 0 && this.yToNextWaypoint > 0) {
            this.direction = "SOUTH";
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
        if (!this.empCooldown) {
            return
        }

        this.empCooldown -= deltaTime
        if (this.empCooldown > 0) {
            this.empCooldown -= deltaTime

            //attack enemy once cooldown reaches 0
            if (this.empCooldown < 0) {

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
    }

    takeDamage(damage: number, muteImpactSound: boolean = false) {

        if (!this.isAlive) {
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


    eventDispatcher.fireEvent("enemyDied")
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
    eventDispatcher.fireEvent("enemyDied")
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
