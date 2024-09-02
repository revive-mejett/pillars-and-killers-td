export class Enemy {

    /**
     *
     */
    constructor(health, speed, xPosition, yPosition, textureFilePath) {
        super();
        this.health = health
        this.speed = speed
        this.textureFilePath = textureFilePath
        this.position = { x: xPosition, y: yPosition }

        this.xToNextWaypoint = 0
        this.yToNextWaypoint = 0
        this.nextWayPointIndex = 1
        this.sprite = PIXI.Sprite.from('./assets/textures/chocolate_helicopter.jpg')

    }

    updatePos() {

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