import { EventDispatcher } from "../utils/EventDispatcher.js"
export class Enemy {

    /**
     *
     */
    constructor(map, health, speed, damage, asset) {
        this.map = map
        this.health = health
        this.speed = speed
        this.damage = damage
        this.asset = asset
        this.position = { x: map.waypoints[0].x, y: map.waypoints[0].y }

        this.xToNextWaypoint = 0
        this.yToNextWaypoint = 0
        this.nextWayPointIndex = 1
        this.sprite = PIXI.Sprite.from(asset)
        this.sprite.height = map.tileSize
        this.sprite.width = map.tileSize

        this.position.x = map.waypoints[0].x * map.tileSize
        this.position.y = map.waypoints[0].y * map.tileSize
        this.isAlive = true
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


    updateMovement(delta) {
        
        const waypoints = this.map.waypoints
        const speed = this.speed
        const map = this.map

        if (this.nextWayPointIndex >= waypoints.length) return

        if (this.xToNextWaypoint !== 0) {
            this.position.x += speed * (this.xToNextWaypoint > 0 ? 1 : -1) * delta
        }
        else if (this.yToNextWaypoint !== 0) {
            this.position.y += speed * (this.yToNextWaypoint > 0 ? 1 : -1) * delta
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

    
}

function reachEnd(enemy) {
    const eventDispatcher = new EventDispatcher()
    enemy.isAlive = false
    enemy.destroy()
    eventDispatcher.fireEvent("enemyReachEnd", 1)
    eventDispatcher.fireEvent("enemyDied")
}

