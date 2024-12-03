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
import { Enemy } from "src/objects/killers/Enemy"
import { Tower } from "src/objects/pillars/Tower"
import { InputManager } from "../managers/InputManager"

import { WaveTimeline } from "../UI/WaveTimeline"
import { AudioManager } from "../managers/AudioManager";

const audioManager = new AudioManager()
const eventDispatcher = new EventDispatcher()

export class GameplayScene extends Scene {
    tdMap?: TdMap
    gamestate?: GameState
    hud?: HUD
    waveManager?: WaveManager
    uiManager?: UIManager
    inputManager?: InputManager
    enemiesPresent: Enemy[]
    towersPresent: Tower[]
    healthBarManager?: HealthBarManager
    mapContainer: PIXI.Container<PIXI.DisplayObject> = new PIXI.Container()
    waveTimeline: WaveTimeline | undefined

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



        this.mapContainer = new PIXI.Container()
        this.container.addChild(this.mapContainer)
        this.mapContainer.x = 100
        this.buildMap()
        this.inputManager = new InputManager(this.container, this.mapContainer)

        this.waveTimeline = new WaveTimeline(this.waveManager)
        this.container.addChild(this.waveTimeline.container)



        const gameplaySceneTicker : PIXI.Ticker = new Ticker()
        gameplaySceneTicker.autoStart = false
        gameplaySceneTicker.add(() => this.update())
        gameplaySceneTicker.start()


        eventDispatcher.on("enemySpawn", this.addEnemyToPresent.bind(this))
        eventDispatcher.on("enemyArmorSoundPlay", this.playArmorSound.bind(this))
        eventDispatcher.on("towerAttackSoundPlay", this.onTowerAttackSoundPlay.bind(this))

        eventDispatcher.on("enemyDied", this.updateEnemiesPresentList.bind(this))


        eventDispatcher.on("towerPlaced", this.addTowerToPresent.bind(this))
        eventDispatcher.on("towerSold", this.updateTowersPresent.bind(this))
        eventDispatcher.on("defeat", () => {
            gameplaySceneTicker.stop()
            if (this.waveManager) {
                this.waveManager.waveInProgress = false
            }
        })
    }

    buildMap() {
        if (!this.mapContainer) {
            return
        }
        this.tdMap?.displayTiles(this.mapContainer)
        this.tdMap?.displayPath()
        this.tdMap?.repaveGrass()
    }

    update() {
        if (!this.mapContainer) {
            return
        }
        // console.log(new PIXI.interaction.InteractionManager())
        // console.log(this.enemiesPresent);


        //input manager update
        this.inputManager?.update()

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

        this.healthBarManager?.updateAllHealthBars(this.mapContainer)

        this.waveTimeline?.render()
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

    playArmorSound() {
        const rng = Math.floor(Math.random() * this.enemiesPresent.length)

        if ( this.enemiesPresent.length <= 20 || rng <= Math.floor(Math.cbrt(this.enemiesPresent.length))) {
            audioManager.playArmourSound()
        }
    }

    onTowerAttackSoundPlay(data : {towerName: string, maxSources: number, path: string, volume?: number, speed?: number}) {
        const towerCount = this.numberTowersOf(data.towerName)

        audioManager.playSoundLimited(towerCount, data.maxSources, towerCount, data.path, data.volume || 1, data.speed || 1)
    }

    private numberTowersOf(towerName : string) {
        return this.towersPresent.filter(tower => tower.towerName === towerName).length
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

        this.inputManager?.cleanUpResources()
        this.inputManager = undefined

        //clean up event listeners akshan
        eventDispatcher.clearListenersOfEvent("enemySpawn")
        eventDispatcher.clearListenersOfEvent("enemyArmorSoundPlay")
        eventDispatcher.clearListenersOfEvent("towerAttackSoundPlay")
        eventDispatcher.clearListenersOfEvent("enemyDied")
        eventDispatcher.clearListenersOfEvent("towerPlaced")
        eventDispatcher.clearListenersOfEvent("towerSold")
        eventDispatcher.clearListenersOfEvent("defeat")
    }
}