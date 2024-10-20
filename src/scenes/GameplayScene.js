import { HealthBarManager } from "../managers/HealthBarManager.js"
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
        this.healthBarManager = new HealthBarManager()

        eventDispatcher.on("enemySpawn", this.addEnemyToPresent.bind(this))
        eventDispatcher.on("enemyDied", this.updateEnemiesPresentList.bind(this))
        this.app.ticker.add(() => this.update())

    }

    buildMap() {
        this.tdMap.displayTiles(this.container)
        this.tdMap.displayPath(this.container)
        this.tdMap.repaveGrass()
    }

    setUpHUD() {
        this.hud.setup(this.container)
    }

    update() {
        // console.log(new PIXI.interaction.InteractionManager())

        this.enemiesPresent.forEach(enemy => {
            enemy?.updateMovement(this.tdMap, this.app.ticker.deltaTime)
        })
        this.healthBarManager.updateAllHealthBars(this.container)
    }

    updateEnemiesPresentList() {
        this.enemiesPresent = this.enemiesPresent.filter(enemy => enemy.isAlive)
    }

    addEnemyToPresent(enemy) {
        this.enemiesPresent.push(enemy)
    }
}