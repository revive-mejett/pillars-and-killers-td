

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

    for (let i = 0; i < map.dimensions; i++) {
        for (let j = 0; j < map.dimensions; j++) {
            let tile = new PIXI.Graphics()
            tile.lineStyle(1, 0xAAAAAA)
            tile.drawRect(i * map.tileSize, j * map.tileSize, map.tileSize, map.tileSize)
            // if (i === 0 && j === 0) {
            //     console.log(chocolateHeliMeme.position)
            //     console.log(chocolateHeliMeme.position.scope)
            //     console.log(chocolateHeliMeme.pivot)
            //     console.log(Hi)
            // }
            // chocolateHeliMeme.anchor.set(0)
            app.stage.addChild(tile)
            app.stage.setChildIndex(tile, i)
        }
        
    }
    // let ex = app.stage.removeChildren(1400,1500)
    // console.log(ex)
    console.log(app.stage.children)
    // app.stage.addChild(chocolateHeliMeme)
}

function displayPath(app, map) {
    for (let i = 0; i < map.dimensions; i++) {
        for (let j = 0; j < 2; j++) {
            let tile = new PIXI.Graphics()
            tile.beginFill(0x0000FF)
            tile.drawRect(i * map.tileSize, j * map.tileSize, map.tileSize, map.tileSize)
            tile.endFill()
            app.stage.addChild(tile)
            // app.stage.setChildIndex(tile, i)
        }
        
    }
    console.log(app.stage.children)
    // app.stage.addChild(chocolateHeliMeme)
}

export { TdMap, displayTiles, displayPath }
