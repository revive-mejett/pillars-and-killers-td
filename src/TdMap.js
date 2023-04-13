class TdMap {

    constructor(mapWidth,mapHeight) {
        this.mapWidth = mapWidth
        this.mapHeight = mapHeight
        this.tiles = [[]]
    }

    seeTiles() {
        console.table(this.tiles)
    }
}

export default TdMap
