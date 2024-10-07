import { UIManager } from "../managers/UIManager.js"
import { TdMap } from "../objects/TdMap.js"
import { HUD } from "../UI/HUD.js"

export class GameplayScene {

    constructor(gamestate) {
        this.container = new PIXI.Container()
        this.tdMap = new TdMap(1000, 1000, 25)
        this.gamestate = gamestate
        this.hud = new HUD(this.gamestate)
        this.uiManager = new UIManager(this.gamestate, this.hud)
        this.gamestate.linkUiManager(this.uiManager)
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