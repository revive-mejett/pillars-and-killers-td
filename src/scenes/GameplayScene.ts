import { Ticker } from "pixi.js"
import { GameState } from "../core/GameState"
import { HealthBarManager } from "../managers/HealthBarManager"
import { UIManager } from "../managers/UIManager"
import { WaveManager } from "../managers/WaveManager"
import { TdMap } from "../objects/TdMap"
import { HUD } from "../UI/HUD"
import { EventDispatcher } from "../utils/EventDispatcher"
import { Scene } from "./Scene"
import * as PIXI from "pixi.js";
import { Enemy } from "src/objects/Enemy"
import { Tower } from "src/objects/pillars/Tower"

const eventDispatcher = new EventDispatcher()
export class GameplayScene extends Scene {
    tdMap?: TdMap
    gamestate?: GameState
    hud?: HUD
    waveManager?: WaveManager
    uiManager?: UIManager
    enemiesPresent: Enemy[]
    towersPresent: Tower[]
    healthBarManager?: HealthBarManager

    constructor(app : PIXI.Application) {
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



        const gameplaySceneTicker : PIXI.Ticker = new Ticker()
        gameplaySceneTicker.autoStart = false
        gameplaySceneTicker.add(() => this.update())
        gameplaySceneTicker.start()


        eventDispatcher.on("enemySpawn", this.addEnemyToPresent.bind(this))
        eventDispatcher.on("enemyDied", this.updateEnemiesPresentList.bind(this))


        eventDispatcher.on("towerPlaced", this.addTowerToPresent.bind(this))
        eventDispatcher.on("towerSold", this.updateTowersPresent.bind(this))
        eventDispatcher.on("defeat", () => {
            gameplaySceneTicker.stop()
            if (this.waveManager) {
                this.waveManager.waveInProgress = false
            }
        })



        this.buildMap()
    }

    buildMap() {
        this.tdMap?.displayTiles(this.container)
        this.tdMap?.displayPath()
        this.tdMap?.repaveGrass()
    }

    update() {
        // console.log(new PIXI.interaction.InteractionManager())
        // console.log(this.enemiesPresent);


        this.enemiesPresent.forEach(enemy => {

            if (this.tdMap) {
                enemy?.updateMovement(this.tdMap, this.app.ticker.deltaTime)
            }
            

        })

        this.towersPresent.forEach(tower => {
            if (this.enemiesPresent.length > 0) {
                if (!tower.targetedEnemy) {
                    tower.findEnemy(this.enemiesPresent)
                }
            }
        })

        this.healthBarManager?.updateAllHealthBars(this.container)
    }

    updateEnemiesPresentList() {
        this.enemiesPresent = this.enemiesPresent.filter(enemy => enemy.isAlive)
    }

    // updateProjectilesPresent() {
    //     this.projectilesPresent = this.projectilesPresent.filter(projectile => !projectile.hasHit)
    // }

    addEnemyToPresent(enemy : Enemy) {
        this.enemiesPresent.push(enemy)
    }

    // addProjectileToPresent(projectile) {
    //     this.projectilesPresent.push(projectile)
    // }

    addTowerToPresent(tower : Tower) {
        this.towersPresent.push(tower)
    }

    updateTowersPresent() {
        this.towersPresent = this.towersPresent.filter(tower => !tower.isSold)
    }

    cleanUpResources() {
        this.towersPresent = []
        this.enemiesPresent = []

        this.uiManager?.cleanUpResources()
        this.uiManager = undefined

        this.waveManager?.cleanUpResources()
        this.waveManager = undefined
        // this.tdMap = null
        this.hud = undefined

        this.gamestate?.cleanUpResources()
        this.gamestate = undefined

        //clean up event listeners akshan
        eventDispatcher.clearListenersOfEvent("enemySpawn")
        eventDispatcher.clearListenersOfEvent("enemyDied")
        eventDispatcher.clearListenersOfEvent("towerPlaced")
        eventDispatcher.clearListenersOfEvent("towerSold")
        eventDispatcher.clearListenersOfEvent("defeat")
    }
}