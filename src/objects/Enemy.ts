import Position from "src/ts/types/Position.js";
import { EventDispatcher } from "../utils/EventDispatcher.js"
import { all1st } from "../utils/Nicknames";
import { Entity } from "./Entity"
import * as PIXI from "pixi.js";

const eventDispatcher = new EventDispatcher()

type SlowDebuffStats = {
    speedMultiplier: number,
    timeLeft : number
}

export class Enemy extends Entity {
    health: number
    totalHealth: number
    speed: number
    damage: number
    killValue: number
    nick: string
    position : Position
    xToNextWaypoint: number;
    yToNextWaypoint: number;
    nextWayPointIndex: number;
    sprite: PIXI.Sprite;
    asset: PIXI.SpriteSource;
    distanceTravelled: number;
    isAlive: boolean;

    slowDebuffStats : SlowDebuffStats

    /**
     *
     */
    constructor(x : number, y : number, width : number , height : number, health : number, speed : number, damage : number, killValue : number, asset : PIXI.SpriteSource) {
        super(x, y, width, height);
        this.health = health
        this.totalHealth = health
        this.speed = speed
        this.damage = damage
        this.killValue = killValue
        this.nick = all1st[Math.floor(Math.random() * all1st.length)]
        this.asset = asset

        this.slowDebuffStats = { speedMultiplier: 1, timeLeft: 0 }

        this.position = { x: x, y: y }

        this.xToNextWaypoint = 0
        this.yToNextWaypoint = 0
        this.nextWayPointIndex = 1
        this.sprite = PIXI.Sprite.from(asset)
        this.sprite.height = height
        this.sprite.width = width
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
        this.sprite.x = this.position.x
        this.sprite.y = this.position.y
    }


    setDistancesToNext(map) {
        this.position.x = map.waypoints[this.nextWayPointIndex - 1].x * map.tileSize
        this.position.y = map.waypoints[this.nextWayPointIndex - 1].y * map.tileSize
        this.xToNextWaypoint = (map.waypoints[this.nextWayPointIndex].x * map.tileSize - this.position.x)
        this.yToNextWaypoint = (map.waypoints[this.nextWayPointIndex].y * map.tileSize - this.position.y)
    }

    destroy() {
        this.sprite.destroy()
    }


    updateMovement(map, delta) {

        const waypoints = map.waypoints
        const speed = this.speed


        if (this.nextWayPointIndex >= waypoints.length) {return}

        if (this.xToNextWaypoint !== 0) {
            this.position.x += speed * (this.xToNextWaypoint > 0 ? 1 : -1) * delta * this.slowDebuffStats.speedMultiplier
            this.distanceTravelled += Math.abs(speed * (this.xToNextWaypoint > 0 ? 1 : -1) * delta * this.slowDebuffStats.speedMultiplier)
        }
        else if (this.yToNextWaypoint !== 0) {
            this.position.y += speed * (this.yToNextWaypoint > 0 ? 1 : -1) * delta * this.slowDebuffStats.speedMultiplier
            this.distanceTravelled += Math.abs(speed * (this.xToNextWaypoint > 0 ? 1 : -1) * delta * this.slowDebuffStats.speedMultiplier)
        }

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
}

function enemyDied(enemy : Enemy) {
    enemy.isAlive = false
    enemy.destroy()
    eventDispatcher.fireEvent("enemyDied")
}

function reachEnd(enemy : Enemy) {
    enemy.isAlive = false
    enemy.destroy()
    eventDispatcher.fireEvent("enemyReachEnd", enemy.damage)
    eventDispatcher.fireEvent("enemyDied")
}

