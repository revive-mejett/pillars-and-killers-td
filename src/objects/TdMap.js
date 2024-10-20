import { Tile } from "./Tile.js"


class TdMap {
    constructor(mapWidth, mapHeight, dimensions) {
        this.mapWidth = mapWidth
        this.mapHeight = mapHeight
        this.dimensions = dimensions
        this.tileSize = mapWidth / dimensions
        this.tiles = []
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
            }
        ]
    }

    displayTiles(container) {

        //init array with array of 0

        for (let i = 0; i < this.dimensions; i++) {
            this.tiles.push([])
            for (let j = 0; j < this.dimensions; j++) {

                let tile = new Tile(i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize, "grass", container)
                tile.paveGrass()
                this.tiles[i].push(tile)
            }
        }
    }

    displayPath() {
        let currWayPtNum = 0
        const waypoints = this.waypoints

        let x = waypoints[currWayPtNum].x
        let y = waypoints[currWayPtNum].y

        while (currWayPtNum < this.waypoints.length - 1) {
            let pathTile = new PIXI.Graphics()
            pathTile.beginFill(0x070707)
            pathTile.drawRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
            pathTile.endFill()

            this.tiles[x][y].setTileContainer(pathTile)
            this.tiles[x][y].changeTileType("path")

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
        startTile.beginFill(0x999900)
        startTile.drawRect(waypoints[0].x * this.tileSize, waypoints[0].y * this.tileSize, this.tileSize, this.tileSize)
        startTile.endFill()
        this.tiles[waypoints[0].x][waypoints[0].y].setTileContainer(startTile)
        this.tiles[waypoints[0].x][waypoints[0].y].changeTileType("start")


        let endTile = new PIXI.Graphics()
        endTile.beginFill(0x220000)
        endTile.drawRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
        endTile.endFill()
        this.tiles[waypoints[waypoints.length - 1].x][waypoints[waypoints.length - 1].y].setTileContainer(endTile)
        this.tiles[waypoints[waypoints.length - 1].x][waypoints[waypoints.length - 1].y].changeTileType("end")


    }
}



export { TdMap }