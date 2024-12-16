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
import { allMaps } from "../utils/MapData"
import { GameSaveData, TowerData } from "src/ts/types/GameSaveData"
import { towerNameToKey } from "../utils/TowerStatsData"
import { GameDataManager } from "../managers/GameDataManager"

const audioManager = new AudioManager()
const eventDispatcher = new EventDispatcher()
const gameDataManager = new GameDataManager()

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

    //if the player loads the game
    savedData: GameSaveData | undefined

    constructor(app: PIXI.Application, gameSaveData?: GameSaveData) {
        super(app)
        this.tdMap = undefined
        this.gamestate = undefined
        this.hud = undefined
        this.waveManager = undefined
        this.uiManager = undefined
        this.enemiesPresent = []
        this.towersPresent = []
        this.savedData = gameSaveData

    }

    constructScene() {

        this.gamestate = new GameState(this.savedData)

        if (!allMaps.get(this.gamestate.mapName)) {
            throw new Error("Map not correctly loaded; please check the name of the map to ensure it exists.")
        }
        this.tdMap = new TdMap(allMaps.get(this.gamestate.mapName)!, 1000, 1000, 25)

        this.hud = new HUD(this.gamestate)
        this.waveManager = new WaveManager(this.tdMap, this.gamestate.startWave)
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



        const gameplaySceneTicker: PIXI.Ticker = new Ticker()
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

        eventDispatcher.on("saveProgess", this.saveData.bind(this))
    }

    saveData() {
        if (!this.gamestate || !this.waveManager) {
            return
        }

        const towerData: TowerData[] = []
        console.log(this.gamestate.money)

        this.towersPresent.forEach(tower => {
            towerData.push({
                towerType: towerNameToKey.get(tower.towerName)!,
                x: tower.x,
                y: tower.y,
                level: tower.level
            })
        })
        const gameSaveData : GameSaveData = {
            map: this.gamestate.mapName,
            money: this.gamestate.money,
            lives: this.gamestate.lives,
            researchLevel: this.gamestate.researchLevel,
            saveFileIndex: this.gamestate.saveFileIndex,
            towers: towerData,
            checkpointWave: this.waveManager?.currentWave
        }

        setTimeout(() => {
            if (!this.gamestate) {return}
            console.log(this.gamestate.money)
            gameDataManager.saveData(this.gamestate.saveFileIndex, gameSaveData)
        }, 500);



    }

    buildMap() {
        if (!this.mapContainer) {
            return
        }
        if(this.savedData) {
            this.tdMap?.displayTiles(this.mapContainer, this, this.savedData.towers)
        } else {
            this.tdMap?.displayTiles(this.mapContainer, this)
        }

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
            if (enemy.enemyType === "EMP") {
                enemy.towers = this.towersPresent
                enemy.mapContainer = this.mapContainer
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

    addEnemyToPresent(enemy: Enemy) {
        this.enemiesPresent.push(enemy)
    }

    // addProjectileToPresent(projectile) {
    //     this.projectilesPresent.push(projectile)
    // }

    addTowerToPresent(tower: Tower) {
        this.towersPresent.push(tower)
    }

    updateTowersPresent() {
        this.towersPresent = this.towersPresent.filter(tower => !tower.isSold)
    }

    playArmorSound(isBoss: boolean = false) {

        //always play armour impact for bosses
        if (isBoss) {
            audioManager.playArmourSound()
            return
        }

        const rng = Math.floor(Math.random() * this.enemiesPresent.length + Math.random() * this.towersPresent.length)

        if (this.enemiesPresent.length + this.towersPresent.length <= 10 || rng <= Math.floor(Math.sqrt(this.enemiesPresent.length + this.towersPresent.length))) {
            audioManager.playArmourSound()
        }
    }

    onTowerAttackSoundPlay(data: { towerName: string, maxSources: number, path: string, volume?: number, speed?: number }) {
        const towerCount = this.numberTowersOf(data.towerName)

        audioManager.playSoundLimited(towerCount, data.maxSources, towerCount, data.path, data.volume || 1, data.speed || 1)
    }

    private numberTowersOf(towerName: string) {
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
        eventDispatcher.clearListenersOfEvent("saveProgress")
    }
}