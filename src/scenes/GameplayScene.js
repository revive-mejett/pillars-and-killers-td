import { TdMap } from "../TdMap"

export class GameplayScene {

    constructor() {
        this.container = new PIXI.Container()
        this.tdMap = new TdMap()
    }
}