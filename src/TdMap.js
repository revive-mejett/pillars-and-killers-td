

class TdMap {
    constructor(mapWidth, mapHeight, dimensions) {
        this.mapWidth = mapWidth
        this.mapHeight = mapHeight
        this.dimensions = dimensions
        this.tileSize = mapWidth / dimensions
        this.tiles = [[]]
        this.waypoints = [
            {
                type: "start",
                x: 0,
                y: 1
            },
            {
                type: "point",
                x: 0,
                y: 5
            },
            {
                type: "point",
                x: 10,
                y: 5
            },
            {
                type: "point",
                x: 10,
                y: 10
            },
            {
                type: "point",
                x: 5,
                y: 10
            },
            {
                type: "point",
                x: 5,
                y: 20
            },
            {
                type: "point",
                x: 20,
                y: 20
            },
            {
                type: "point",
                x: 20,
                y: 0
            },
        ]
    }

}

function displayTiles(app, map) {

    for (let i = 0; i < map.dimensions; i++) {
        for (let j = 0; j < map.dimensions; j++) {
            let tile = new PIXI.Graphics()
            tile.beginFill(0x001100)
            tile.lineStyle(2, 0x005500)
            tile.drawRect(i * map.tileSize, j * map.tileSize, map.tileSize, map.tileSize)
            tile.endFill()
            app.stage.addChild(tile)
        }
    }
}

function displayPath(app, map) {
    let currWayPtNum = 0
    const waypoints = map.waypoints

    let x = waypoints[currWayPtNum].x
    let y = waypoints[currWayPtNum].y

    while (currWayPtNum < map.waypoints.length - 1) {
        let pathTile = new PIXI.Graphics()
        pathTile.beginFill(0x111111)
        pathTile.drawRect(x * map.tileSize, y * map.tileSize, map.tileSize, map.tileSize)
        pathTile.endFill()
        app.stage.addChild(pathTile)

        if (map.waypoints[currWayPtNum + 1].x > x) {
            x++
        }
        if (map.waypoints[currWayPtNum + 1].x < x) {
            x--
        }

        if (map.waypoints[currWayPtNum + 1].y > y) {
            y++
        }
        if (map.waypoints[currWayPtNum + 1].y < y) {
            y--
        }
        if (map.waypoints[currWayPtNum + 1].x === x && map.waypoints[currWayPtNum + 1].y === y) {
            currWayPtNum++;
        }
    }

    //mark start and end tiles
    let startTile = new PIXI.Graphics()
    startTile.beginFill(0x005500)
    startTile.drawRect(waypoints[0].x * map.tileSize, waypoints[0].y * map.tileSize, map.tileSize, map.tileSize)
    startTile.endFill()
    app.stage.addChild(startTile)
    let endTile = new PIXI.Graphics()
    endTile.beginFill(0x550000)
    endTile.drawRect(x * map.tileSize, y * map.tileSize, map.tileSize, map.tileSize)
    endTile.endFill()
    app.stage.addChild(endTile)

}

function walkPath(app, map) {
    let testEnemy = PIXI.Sprite.from('./assets/textures/chocolate_helicopter.jpg')
    let waypoints = map.waypoints
    testEnemy.height = map.tileSize
    testEnemy.width = map.tileSize
    testEnemy.zIndex = 3

    let xToNextWaypoint = 0
    let yToNextWaypoint = 0
    let nextWayPointIndex = 1
    let speed = 11
    
    let setDistancesToNext = () => {
        
        testEnemy.x = waypoints[nextWayPointIndex - 1].x * map.tileSize
        testEnemy.y = waypoints[nextWayPointIndex - 1].y * map.tileSize
        xToNextWaypoint = (waypoints[nextWayPointIndex].x * map.tileSize - testEnemy.x)
        yToNextWaypoint = (waypoints[nextWayPointIndex].y * map.tileSize - testEnemy.y)
        // console.log(xToNextWaypoint)
        // console.log(yToNextWaypoint)
    }


    app.stage.addChild(testEnemy)
    setDistancesToNext()
    app.ticker.add(() => {

        if (xToNextWaypoint !== 0) {
            testEnemy.x += speed * (xToNextWaypoint > 0 ? 1 : -1) * app.ticker.deltaTime
        }
        else if (yToNextWaypoint !== 0) {
            testEnemy.y += speed * (yToNextWaypoint > 0 ? 1 : -1) * app.ticker.deltaTime
        }
        xToNextWaypoint = (waypoints[nextWayPointIndex].x * map.tileSize - testEnemy.x)
        yToNextWaypoint = (waypoints[nextWayPointIndex].y * map.tileSize - testEnemy.y)
        if (Math.abs(xToNextWaypoint) < 1 && Math.abs(yToNextWaypoint) < 1 && nextWayPointIndex < waypoints.length) {
            nextWayPointIndex++
            if (nextWayPointIndex === waypoints.length) {
                console.log("reached end")
                testEnemy.destroy()
            } else {
                setDistancesToNext()
            }
            
        }
    })

    
    
}

export { TdMap, displayTiles, displayPath, walkPath }
