import { TdMap } from "../objects/TdMap.js"

export class GameplayScene {

    constructor() {
        this.container = new PIXI.Container()
        this.tdMap = new TdMap(1100, 1100, 25)

    }

    buildMap() {
        this.tdMap.displayTiles(this.container)
        this.tdMap.displayPath(this.container)
    }
}