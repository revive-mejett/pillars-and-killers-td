

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

    displayTiles(container) {

        for (let i = 0; i < this.dimensions; i++) {
            for (let j = 0; j < this.dimensions; j++) {
                let tile = new PIXI.Graphics()
                tile.beginFill(0x001100)
                tile.lineStyle(2, 0x005500)
                tile.drawRect(i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize)
                tile.endFill()
                container.addChild(tile)
            }
        }
    }

    displayPath(container) {
        let currWayPtNum = 0
        const waypoints = this.waypoints
    
        let x = waypoints[currWayPtNum].x
        let y = waypoints[currWayPtNum].y
    
        while (currWayPtNum < this.waypoints.length - 1) {
            let pathTile = new PIXI.Graphics()
            pathTile.beginFill(0x111111)
            pathTile.drawRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
            pathTile.endFill()
            container.addChild(pathTile)
    
            if (this.waypoints[currWayPtNum + 1].x > x) {
                x++
            }
            if (this.waypoints[currWayPtNum + 1].x < x) {
                x--
            }
    
            if (this.waypoints[currWayPtNum + 1].y > y) {
                y++
            }
            if (this.waypoints[currWayPtNum + 1].y < y) {
                y--
            }
            if (this.waypoints[currWayPtNum + 1].x === x && this.waypoints[currWayPtNum + 1].y === y) {
                currWayPtNum++;
            }
        }
    
        //mark start and end tiles
        let startTile = new PIXI.Graphics()
        startTile.beginFill(0x005500)
        startTile.drawRect(waypoints[0].x * this.tileSize, waypoints[0].y * this.tileSize, this.tileSize, this.tileSize)
        startTile.endFill()
        container.addChild(startTile)
        let endTile = new PIXI.Graphics()
        endTile.beginFill(0x550000)
        endTile.drawRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
        endTile.endFill()
        container.addChild(endTile)
    
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



export { TdMap, displayTiles, displayPath }