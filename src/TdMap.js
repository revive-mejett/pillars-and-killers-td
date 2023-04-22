

class TdMap {
    constructor(mapWidth,mapHeight, dimensions) {
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
            // if (i === 0 && j === 0) {
            //     console.log(chocolateHeliMeme.position)
            //     console.log(chocolateHeliMeme.position.scope)
            //     console.log(chocolateHeliMeme.pivot)
            //     console.log(Hi)
            // }
            // chocolateHeliMeme.anchor.set(0)
            app.stage.addChild(tile)
            // app.stage.setChildIndex(tile, i)
        }
        
    }
    // let ex = app.stage.removeChildren(1400,1500)
    // console.log(ex)
    console.log(app.stage.children)
    // app.stage.addChild(chocolateHeliMeme)
}

function displayPath(app, map) {
    let currWayPtNum = 0
    const waypoints = map.waypoints

    let x = waypoints[currWayPtNum].x
    let y = map.waypoints[currWayPtNum].y

    
    while (currWayPtNum < map.waypoints.length - 1) {
        console.log(currWayPtNum)
        console.log(x)
        console.log(y)
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

}

export { TdMap, displayTiles, displayPath }
