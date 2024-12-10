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
    sprite: PIXI.AnimatedSprite
    spritesheet: PIXI.Spritesheet
    animationSpeed?: number
    rotationSpeed: number
    isLooking: boolean
    distanceTravelled: number
    isAlive: boolean


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

        this.xToNextWaypoint = 0
        this.yToNextWaypoint = 0
        this.nextWayPointIndex = 1
        this.sprite = new PIXI.AnimatedSprite(spritesheet.animations.enemy)
        this.sprite.height = height
        this.sprite.width = width

        // this.sprite.pivot = new PIXI.Point(this.width/2, this.height/2)
        this.animationSpeed = stats.animationSpeed || 0.1
        this.sprite.animationSpeed = this.animationSpeed
        this.sprite.visible = false //dont render when first init.
        this.sprite.anchor.set(0.5, 0.5)

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
        this.sprite.x = this.getCenterPosition().x
        this.sprite.y = this.getCenterPosition().y
    }


    setDistancesToNext(map: TdMap) {
        this.position.x = map.waypoints[this.nextWayPointIndex - 1].x * map.tileSize
        this.position.y = map.waypoints[this.nextWayPointIndex - 1].y * map.tileSize
        this.xToNextWaypoint = (map.waypoints[this.nextWayPointIndex].x * map.tileSize - this.position.x)
        this.yToNextWaypoint = (map.waypoints[this.nextWayPointIndex].y * map.tileSize - this.position.y)
    }


    findAndAttackTower(delta: number) {
        if (!this.towers || !this.mapContainer) {
            return
        }

        const towersInRange = this.towers.filter(tower => {
            return this.checkTowerInRange(tower)
        })

        const targetTower = towersInRange[Math.floor(Math.random() * this.towers.length)]
        console.log(this.towers.length)



        if (targetTower && !targetTower.isSold) {
            
            const emp = new EMPBeam(this.getCenterPosition().x, this.getCenterPosition().y, 5, 5, targetTower, this)
            emp.render(this.mapContainer)
            emp.fireTower(delta)
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
        this.updateRotation()
        sceneContainer.addChild(this.sprite)
        setTimeout(() => {
            if (this.isAlive) {
                this.sprite.visible = true
            }
        }, 50)


        // if (this.isAlive) {
        //     this.sprite.visible = true
        // }

    }


    updateMovement(map: TdMap, delta: number) {

        const waypoints = map.waypoints
        const speed = this.speed



        if (!this.sprite.playing) {
            this.sprite.play()
        }


        if (this.nextWayPointIndex >= waypoints.length) { return }

        if (this.xToNextWaypoint !== 0) {
            this.position.x += speed * (this.xToNextWaypoint > 0 ? 1 : -1) * delta * this.slowDebuffStats.speedMultiplier
            this.distanceTravelled += Math.abs(speed * (this.xToNextWaypoint > 0 ? 1 : -1) * delta * this.slowDebuffStats.speedMultiplier)
        }
        else if (this.yToNextWaypoint !== 0) {
            this.position.y += speed * (this.yToNextWaypoint > 0 ? 1 : -1) * delta * this.slowDebuffStats.speedMultiplier
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

        this.updateSpritePosition()

        if (Math.abs(this.xToNextWaypoint) < 1 && Math.abs(this.yToNextWaypoint) < 1 && this.nextWayPointIndex < waypoints.length) {
            this.nextWayPointIndex++
            if (this.nextWayPointIndex === waypoints.length) {
                reachEnd(this)
            } else {
                this.setDistancesToNext(map)
            }
        }
    }

    private updateRotation(delta?: number) {
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
        // console.log(this.empCooldown)
        this.empCooldown -= deltaTime
        if (this.empCooldown > 0) {
            this.empCooldown -= deltaTime

            //attack enemy once cooldown reaches 0
            if (this.empCooldown < 0) {
                this.empCooldown = empCooldown
                this.findAndAttackTower(deltaTime)
                console.log("attack tower")
            }
        }
    }

    takeDamage(damage: number) {

        if (!this.isAlive) {
            return
        }


        const damageReduction = this.armour
        // console.log("damage reduction", damageReduction)


        let actualDamage = damage + this.vulnerableDebuffStats.extraDamage - damageReduction
        // console.log("actual damage", actualDamage)

        if (actualDamage < 0) {
            actualDamage = 0
        }

        const deflectedDamagePercent = Math.floor(damageReduction / damage * 100)
        // const damagePercent = 100 - deflectedDamagePercent

        // console.log(damagePercent)
        // console.log(deflectedDamagePercent)

        //play a sound - chance increased the higher the deflected damage percent (100% deflected = always play)
        const rng = Math.floor(Math.random() * 100)

        if (rng <= deflectedDamagePercent && this.armour > 0) {
            eventDispatcher.fireEvent("enemyArmorSoundPlay")
        }


        this.health -= actualDamage

        if (this.health <= 0) {
            this.health = 0
            enemyDied(this)
            eventDispatcher.fireEvent("moneyEarned", this.killValue)
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



    destroy() {
        this.sprite.destroy()
    }

    cleanUpResources() {
        this.sprite.off("pointerdown")
        if (this.sprite.playing) {
            this.sprite.stop()
        }
        // this.sp
    }
}

function enemyDied(enemy: Enemy) {
    enemy.isAlive = false

    audioManager.playKilledSound()

    enemy.destroy()
    eventDispatcher.fireEvent("enemyDied")
    if (enemy.enemyClassName === "Brave Proxima Centauri") {
        eventDispatcher.fireEvent("boss1Killed")
    }
    if (enemy.enemyClassName === "Serious Sirius") {
        eventDispatcher.fireEvent("boss2Killed")
    }
    if (enemy.enemyClassName === "Remorseless Rigel") {
        console.log("remorseless rigel killed akshan!")
        eventDispatcher.fireEvent("boss3Killed")
    }
}

function reachEnd(enemy: Enemy) {
    enemy.isAlive = false
    enemy.destroy()
    eventDispatcher.fireEvent("enemyReachEnd", enemy.damage)
    eventDispatcher.fireEvent("enemyDied")
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
    case "Unforgiving UY Scuti":
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
