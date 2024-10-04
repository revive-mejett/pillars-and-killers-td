import { TdMap } from "../objects/TdMap.js"
import { HUD } from "../UI/HUD.js"

export class GameplayScene {

    constructor() {
        this.container = new PIXI.Container()
        this.tdMap = new TdMap(1000, 1000, 25)
        this.hud = new HUD()
        this.setUpHUD()

    }

    buildMap() {
        this.tdMap.displayTiles(this.container)
        this.tdMap.displayPath(this.container)
    }

    setUpHUD() {
        this.hud.setup(this.container)
    }
}