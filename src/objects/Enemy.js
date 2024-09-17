import { Assets } from "pixi.js"

export class Enemy {

    /**
     *
     */
    constructor(health, speed, textureFilePath, map) {
        this.health = health
        this.speed = speed
        this.textureFilePath = textureFilePath
        this.position = { x: map.waypoints[0].x, y: map.waypoints[0].y }

        this.xToNextWaypoint = 0
        this.yToNextWaypoint = 0
        this.nextWayPointIndex = 1
        this.sprite = PIXI.Sprite.from(textureFilePath)
        this.sprite.height = map.tileSize
        this.sprite.width = map.tileSize

        this.position.x = map.waypoints[0].x * map.tileSize
        this.position.y = map.waypoints[0].y * map.tileSize
        
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

    update(speed, map, enemyWalkTicker, delta) {
        const waypoints = map.waypoints

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
                console.log("reached end")
                this.destroy()
                enemyWalkTicker.stop()
            } else {
                this.setDistancesToNext(map)
                
            }
        }
    }
}

async function walkPath(app, map) {
    let testEnemyBundle = await Assets.loadBundle("enemies")
    let testEnemy = new Enemy(100, 5, testEnemyBundle.blueCircle, map)
    testEnemy.zIndex = 3


    app.stage.addChild(testEnemy.sprite)
    let enemyWalkTicker = new PIXI.Ticker()

    
    let enemyWalkTickerUpdate = () => testEnemy.update(testEnemy.speed, map, enemyWalkTicker, app.ticker.deltaTime)

    enemyWalkTicker.add(enemyWalkTickerUpdate)
    enemyWalkTicker.start()
}

export { walkPath }