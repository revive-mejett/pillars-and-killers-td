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

        //set to start of the path
        this.position.x = map.waypoints[0].x * map.tileSize
        this.position.y = map.waypoints[0].y * map.tileSize
        
        console.log("map start ", map.waypoints[0]);
        console.log("enemy pos", this.sprite);
        
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

    

}

function walkPath2(app, map) {
    let testEnemy = new Enemy(100, 5, '../../assets/textures/chocolate_helicopter.jpg', map)
    let speed = testEnemy.speed
    let waypoints = map.waypoints
    testEnemy.zIndex = 3


    app.stage.addChild(testEnemy.sprite)
    let enemyWalkTicker = new PIXI.Ticker()

    
    let enemyWalkTickerUpdate = () => {

        if (testEnemy.xToNextWaypoint !== 0) {
            testEnemy.position.x += speed * (testEnemy.xToNextWaypoint > 0 ? 1 : -1) * app.ticker.deltaTime
        }
        else if (testEnemy.yToNextWaypoint !== 0) {
            testEnemy.position.y += speed * (testEnemy.yToNextWaypoint > 0 ? 1 : -1) * app.ticker.deltaTime
        }
        testEnemy.xToNextWaypoint = (waypoints[testEnemy.nextWayPointIndex].x * map.tileSize - testEnemy.position.x)
        testEnemy.yToNextWaypoint = (waypoints[testEnemy.nextWayPointIndex].y * map.tileSize - testEnemy.position.y)
        testEnemy.updateSpritePosition()
        if (Math.abs(testEnemy.xToNextWaypoint) < 1 && Math.abs(testEnemy.yToNextWaypoint) < 1 && testEnemy.nextWayPointIndex < waypoints.length) {
            testEnemy.nextWayPointIndex++
            if (testEnemy.nextWayPointIndex === waypoints.length) {
                console.log("reached end")
                testEnemy.destroy()
                enemyWalkTicker.stop()
            } else {
                testEnemy.setDistancesToNext(map)
                
            }
        }
    }

    enemyWalkTicker.add(enemyWalkTickerUpdate)
    enemyWalkTicker.start()
}

export { walkPath2 }