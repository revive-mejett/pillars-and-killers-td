import { Ticker } from "pixi.js"
import { GameState } from "../core/GameState.js"
import { HealthBarManager } from "../managers/HealthBarManager.js"
import { UIManager } from "../managers/UIManager.js"
import { WaveManager } from "../managers/WaveManager.js"
import { TdMap } from "../objects/TdMap.js"
import { HUD } from "../UI/HUD.js"
import { EventDispatcher } from "../utils/EventDispatcher.js"
import { Scene } from "./Scene.js"

const eventDispatcher = new EventDispatcher()
export class GameplayScene extends Scene {

    constructor(app) {
        super(app)
        this.tdMap = undefined
        this.gamestate = undefined
        this.hud = undefined
        this.waveManager = undefined
        this.uiManager = undefined
        this.enemiesPresent = []
        this.towersPresent = []
    }

    constructScene() {
        this.tdMap = new TdMap(1000, 1000, 25)
        this.gamestate = new GameState()
        this.hud = new HUD(this.gamestate)
        this.waveManager = new WaveManager(this.tdMap)
        this.hud.setup(this.container)
        this.uiManager = new UIManager(this.app, this.gamestate, this, this.hud)
        this.gamestate.linkUiManager(this.uiManager)

        this.healthBarManager = new HealthBarManager()



        let gameplaySceneTicker = new Ticker()
        gameplaySceneTicker.autoStart = false
        gameplaySceneTicker.add(() => this.update())
        gameplaySceneTicker.start()


        eventDispatcher.on("enemySpawn", this.addEnemyToPresent.bind(this))
        eventDispatcher.on("enemyDied", this.updateEnemiesPresentList.bind(this))


        eventDispatcher.on("towerPlaced", this.addTowerToPresent.bind(this))
        eventDispatcher.on("towerSold", this.updateTowersPresent.bind(this))
        eventDispatcher.on("defeat", () => {
            gameplaySceneTicker.stop()
            this.waveManager.waveInProgress = false
        })



        this.buildMap()
    }

    buildMap() {
        this.tdMap.displayTiles(this.container)
        this.tdMap.displayPath(this.container)
        this.tdMap.repaveGrass()
    }

    update() {
        // console.log(new PIXI.interaction.InteractionManager())
        // console.log(this.enemiesPresent);


        this.enemiesPresent.forEach(enemy => {

            enemy?.updateMovement(this.tdMap, this.app.ticker.deltaTime)

        })

        this.towersPresent.forEach(tower => {
            if (this.enemiesPresent.length > 0) {
                if (!tower.targetedEnemy) {
                    tower.findEnemy(this.enemiesPresent)
                }
            }
        })

        this.healthBarManager.updateAllHealthBars(this.container)
    }

    updateEnemiesPresentList() {
        this.enemiesPresent = this.enemiesPresent.filter(enemy => enemy.isAlive)
    }

    updateProjectilesPresent() {
        this.projectilesPresent = this.projectilesPresent.filter(projectile => !projectile.hasHit)
    }

    addEnemyToPresent(enemy) {
        this.enemiesPresent.push(enemy)
    }

    addProjectileToPresent(projectile) {
        this.projectilesPresent.push(projectile)
    }

    addTowerToPresent(tower) {
        this.towersPresent.push(tower)
    }

    updateTowersPresent() {
        this.towersPresent = this.towersPresent.filter(tower => !tower.isSold)
    }

    cleanUpResources() {
        this.towersPresent = []
        this.enemiesPresent = []

        this.uiManager?.cleanUpResources()
        this.uiManager = null

        this.waveManager?.cleanUpResources()
        this.waveManager = null
        // this.tdMap = null
        this.hud = null

        this.gamestate?.cleanUpResources()
        this.gamestate = null

        //clean up event listeners akshan
        eventDispatcher.clearListenersOfEvent("enemySpawn")
        eventDispatcher.clearListenersOfEvent("enemyDied")
        eventDispatcher.clearListenersOfEvent("towerPlaced")
        eventDispatcher.clearListenersOfEvent("towerSold")
        eventDispatcher.clearListenersOfEvent("defeat")
    }
}