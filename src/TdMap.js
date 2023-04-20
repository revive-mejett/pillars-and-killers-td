

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
                type: "end",
                x: 3,
                y: 5
            },
        ]
    }

}

function displayTiles(app, map) {
    let graphics = new PIXI.Graphics()
    graphics.lineStyle(2, 0xAAAAAA)
    for (let i = 0; i < map.dimensions; i++) {
        for (let j = 0; j < map.dimensions; j++) {
            graphics.drawRect(i * map.tileSize, j * map.tileSize, map.tileSize, map.tileSize)
            // if (i === 0 && j === 0) {
            //     console.log(chocolateHeliMeme.position)
            //     console.log(chocolateHeliMeme.position.scope)
            //     console.log(chocolateHeliMeme.pivot)
            //     console.log(Hi)
            // }
            // chocolateHeliMeme.anchor.set(0)
        }
    }
    app.stage.addChild(graphics)
    // app.stage.addChild(chocolateHeliMeme)
}

export { TdMap, displayTiles }
