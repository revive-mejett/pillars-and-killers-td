import { UIManager } from "../managers/UIManager.js"
import { WaveManager } from "../managers/WaveManager.js"
import { TdMap } from "../objects/TdMap.js"
import { HUD } from "../UI/HUD.js"
import { EventDispatcher } from "../utils/EventDispatcher.js"

const eventDispatcher = new EventDispatcher()
export class GameplayScene {

    constructor(gamestate, app) {
        this.app = app
        this.container = new PIXI.Container()
        this.tdMap = new TdMap(1000, 1000, 25)
        this.gamestate = gamestate
        this.hud = new HUD(this.gamestate)
        this.waveManager = new WaveManager(this.tdMap)
        this.uiManager = new UIManager(this.app, this.gamestate, this, this.hud)
        this.gamestate.linkUiManager(this.uiManager)
        this.setUpHUD()
        this.enemiesPresent = []

        eventDispatcher.on("enemySpawn", this.addEnemyToPresent.bind(this))
        eventDispatcher.on("enemyDied", this.updateEnemiesPresentList.bind(this))
        this.app.ticker.add(() => this.update())

    }

    buildMap() {
        this.tdMap.displayTiles(this.container)
        this.tdMap.displayPath(this.container)

        console.log("verifying akshan")
        console.log(this.tdMap.tiles);
        
    }

    setUpHUD() {
        this.hud.setup(this.container)
    }

    update() {
        this.enemiesPresent.forEach(enemy => {
            enemy?.updateMovement(this.tdMap, this.app.ticker.deltaTime)
        })
    }

    updateEnemiesPresentList() {
        this.enemiesPresent = this.enemiesPresent.filter(enemy => enemy.isAlive)
    }

    //temp function
    playTest() {
        // this.waveManager.sendWave(this.app, this.tdMap)
        // this.waveManager.sendWave(this.app, this.tdMap)
    }

    addEnemyToPresent(enemy) {
        this.enemiesPresent.push(enemy)
    }
}