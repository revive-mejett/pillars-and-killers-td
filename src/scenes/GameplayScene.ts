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
import { Difficulty, GameSaveData, TowerData } from "src/ts/types/GameSaveData"
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

    fileNumber: 1 | 2 | 3 | 4 | 5 | 6
    mapTitle: string | undefined
    difficulty: Difficulty | undefined

    //if the player loads the game
    savedData: GameSaveData | undefined

    constructor(app: PIXI.Application, fileNumber: 1 | 2 | 3 | 4 | 5 | 6, gameSaveData?: GameSaveData, mapTitle?: string, difficulty?: Difficulty) {
        super(app)
        this.tdMap = undefined
        this.gamestate = undefined
        this.hud = undefined
        this.waveManager = undefined
        this.uiManager = undefined
        this.enemiesPresent = []
        this.towersPresent = []
        this.savedData = gameSaveData
        this.fileNumber = fileNumber
        this.mapTitle = mapTitle
        this.difficulty = difficulty

    }

    constructScene() {

        this.gamestate = new GameState(this.fileNumber, this.savedData, this.mapTitle, this.difficulty)

        if (!allMaps.get(this.gamestate.mapName)) {
            throw new Error("Map not correctly loaded; please check the name of the map to ensure it exists.")
        }
        this.tdMap = new TdMap(allMaps.get(this.gamestate.mapName)!, 1000, 1000, 25)
        this.hud = new HUD(this.gamestate)

        this.waveManager = new WaveManager(this.tdMap, this.gamestate.startWave, this.gamestate.difficulty)
        this.hud.setup(this.container)
        this.uiManager = new UIManager(this.app, this.gamestate, this, this.hud)
        this.uiManager?.updateLives()
        this.gamestate.linkUiManager(this.uiManager)

        this.healthBarManager = new HealthBarManager()



        this.mapContainer = new PIXI.Container()
        this.container.addChild(this.mapContainer)
        this.mapContainer.x = 100
        this.buildMap()
        this.inputManager = new InputManager(this.container, this.mapContainer, this.uiManager)

        this.waveTimeline = new WaveTimeline(this.waveManager, this.hud)
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

        eventDispatcher.on("saveProgess", this.handleCheckpoint.bind(this))
    }

    handleCheckpoint(modifiers: {isVictory: boolean, deleteSave : boolean}) {
        setTimeout(() => {
            if (!this.gamestate || !this.waveManager) {
                return
            }
            const towerData: TowerData[] = []

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
                checkpointWave: this.waveManager.currentWave,
                difficulty: this.gamestate.difficulty
            }
            if (modifiers.deleteSave) {
                this.wipeSave()
            } else {
                gameDataManager.saveData(this.gamestate.saveFileIndex, gameSaveData)
            }

            if (modifiers.isVictory) {
                if (this.hud && this.hud.exitButton) {
                    this.hud.exitButton.visible = false
                }
                if (this.hud && this.hud.nextWaveButton) {
                    this.hud.nextWaveButton.visible = false
                }
                setTimeout(() => {
                    eventDispatcher.fireEvent("victory", this.gamestate?.difficulty)
                }, 5000);
            }
        }, 0);

    }

    wipeSave() {
        if (this.gamestate?.saveFileIndex) {
            gameDataManager.wipeSaveData(this.gamestate?.saveFileIndex)
        }
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



        const rng = Math.floor(Math.random() * this.enemiesPresent.length + Math.random() * this.towersPresent.length)

        if (this.enemiesPresent.length + this.towersPresent.length <= 10 || rng <= Math.floor((isBoss? 5 : 3) * Math.sqrt(this.enemiesPresent.length + this.towersPresent.length))) {
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
        eventDispatcher.clearListenersOfEvent("victory")
        eventDispatcher.clearListenersOfEvent("saveProgress")
    }
}