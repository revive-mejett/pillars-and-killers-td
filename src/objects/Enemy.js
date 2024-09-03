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
        this.sprite.x = 0
        this.sprite.y = 1
        console.log("map start ", map.waypoints[0]);
        console.log("enemy pos", this.sprite);
        
    }

    updateSpritePosition() {
        this.sprite.x = this.position.x
        this.sprite.y = this.position.y
    }

    setSpritePosition(map) {
        console.log("set pos to start");
        
        this.sprite.x = map.waypoints[0].x
        this.sprite.y = map.waypoints[0].y
    }

    setDistancesToNext(map) {
        
        this.position.x = map.waypoints[this.nextWayPointIndex - 1].x * map.tileSize
        this.position.y = map.waypoints[this.nextWayPointIndex - 1].y * map.tileSize
        this.xToNextWaypoint = (map.waypoints[this.nextWayPointIndex].x * map.tileSize - this.position.x)
        this.yToNextWaypoint = (map.waypoints[this.nextWayPointIndex].y * map.tileSize - this.position.y)
        console.log(this.xToNextWaypoint)
        console.log(this.yToNextWaypoint)
    }

    

}

function walkPath2(app, map) {
    let testEnemy = new Enemy(100, 0.2, '../../assets/textures/chocolate_helicopter.jpg', map)
    let speed = testEnemy.speed
    let waypoints = map.waypoints
    testEnemy.zIndex = 3


    app.stage.addChild(testEnemy.sprite)
    testEnemy.setSpritePosition(map)
    
    app.ticker.add(() => {

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
            } else {
                testEnemy.setDistancesToNext(map)
            }
            
        }
    })
}

export { walkPath2 }