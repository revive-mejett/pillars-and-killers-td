import Position from "src/ts/types/Position";
import { EventDispatcher } from "../../utils/EventDispatcher"
import { all1st } from "../../utils/Nicknames";
import { Entity } from "../Entity"
import * as PIXI from "pixi.js";
import { TdMap } from "../TdMap";
import { EnemyStats } from "src/ts/types/EnemyData";
import sound from "pixi-sound";

const eventDispatcher = new EventDispatcher()

type SlowDebuffStats = {
    speedMultiplier: number,
    timeLeft : number
}

export class Enemy extends Entity {
    enemyClassName : string
    health: number
    totalHealth: number
    speed: number
    damage: number
    killValue: number
    nick: string
    position : Position
    xToNextWaypoint: number
    yToNextWaypoint: number
    nextWayPointIndex: number
    sprite: PIXI.AnimatedSprite
    spritesheet: PIXI.Spritesheet
    animationSpeed? : number
    rotationSpeed : number
    isLooking: boolean
    distanceTravelled: number
    isAlive: boolean

    slowDebuffStats : SlowDebuffStats

    /**
     *
     */
    constructor(x : number, y : number, width : number , height : number, stats : EnemyStats, spritesheet: PIXI.Spritesheet) {
        super(x, y, width, height);
        this.enemyClassName = stats.className
        this.health = stats.health
        this.totalHealth = stats.health
        this.speed = stats.speed
        this.damage = stats.damage
        this.killValue = stats.killValue
        this.nick = all1st[Math.floor(Math.random() * all1st.length)]
        this.spritesheet = spritesheet

        this.slowDebuffStats = { speedMultiplier: 1, timeLeft: 0 }

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
        this.sprite.anchor.set(0.5,0.5)

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
            x : this.position.x + this.width / 2,
            y : this.position.y + this.height / 2
        }
    }

    updateSpritePosition() {
        this.sprite.x = this.getCenterPosition().x
        this.sprite.y = this.getCenterPosition().y
    }


    setDistancesToNext(map : TdMap) {
        this.position.x = map.waypoints[this.nextWayPointIndex - 1].x * map.tileSize
        this.position.y = map.waypoints[this.nextWayPointIndex - 1].y * map.tileSize
        this.xToNextWaypoint = (map.waypoints[this.nextWayPointIndex].x * map.tileSize - this.position.x)
        this.yToNextWaypoint = (map.waypoints[this.nextWayPointIndex].y * map.tileSize - this.position.y)
    }



    spawn(sceneContainer : PIXI.Container) {
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


    updateMovement(map : TdMap, delta : number) {

        const waypoints = map.waypoints
        const speed = this.speed



        if (!this.sprite.playing) {
            this.sprite.play()
        }


        if (this.nextWayPointIndex >= waypoints.length) {return}

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

    private updateRotation(delta? : number) {
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

    tickDebuffs(deltaTime : number) {

        if (this.slowDebuffStats.timeLeft === 0) {
            return
        }

        this.slowDebuffStats.timeLeft -= deltaTime

        if (this.slowDebuffStats.timeLeft <= 0) {
            this.slowDebuffStats.timeLeft = 0
            this.slowDebuffStats.speedMultiplier = 1
        }
    }

    takeDamage(damage : number) {

        if (!this.isAlive) {
            return
        }
        this.health -= damage

        if (this.health <= 0) {
            this.health = 0
            enemyDied(this)
            eventDispatcher.fireEvent("moneyEarned", this.killValue)
        }
    }

    destroy() {
        this.sprite.destroy()
    }
}

function enemyDied(enemy : Enemy) {
    enemy.isAlive = false

    const sfxEnemyDied = sound.Sound.from({
        url: "assets/sounds/sfx/killerKilled1.mp3",
        volume: 0.25
    })
    sfxEnemyDied.play()

    if (enemy.sprite.playing) {
        enemy.sprite.stop()
    }

    enemy.destroy()
    eventDispatcher.fireEvent("enemyDied")
}

function reachEnd(enemy : Enemy) {
    enemy.isAlive = false
    enemy.destroy()
    eventDispatcher.fireEvent("enemyReachEnd", enemy.damage)
    eventDispatcher.fireEvent("enemyDied")
}
