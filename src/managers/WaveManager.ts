import { Enemy } from "../objects/killers/Enemy"
import { EventDispatcher } from "../utils/EventDispatcher"
import { AssetLoader } from "../core/AssetLoader"
import { Wave, WavePart } from "../objects/Wave"
import { TdMap } from "src/objects/TdMap"
import * as PIXI from "pixi.js";
import { GameplayScene } from "src/scenes/GameplayScene"
import { productionWaves } from "../utils/WaveData"
import { killerThrillWaves } from "../utils/KillerThrillWaveData"
import { allEnemyData } from "../utils/EnemyData"
import { EnemyClass, EnemyStats } from "src/ts/types/EnemyData"
import { Difficulty } from "src/ts/types/GameSaveData"

const assetLoader = new AssetLoader()
const eventDispatcher = new EventDispatcher()


export class WaveManager {
    map: TdMap
    waves: Wave[]
    currentWave: number
    waveInProgress: boolean
    waveTicker: PIXI.Ticker | undefined
    wavesTicker: PIXI.Ticker | undefined
    cooldownToNextWave: number
    wavesStarted: boolean = false
    delaySecondsToNextWave: number
    extraWaves: Wave[] | undefined
    isFreeplay: boolean = false
    checkpointWave: number
    checkpointWaveBeaten: number
    bossPresent: boolean
    readonly bossWaves = [20, 40, 60, 80, 100]

    /**
     *
     */
    constructor(map: TdMap, startWave: number, difficulty: Difficulty) {
        this.map = map
        this.waves = []
        this.extraWaves = this.generateExtraWaves()

        this.checkpointWaveBeaten = 0
        this.bossPresent = false

        this.waveInProgress = false

        this.cooldownToNextWave = 0
        this.delaySecondsToNextWave = 10
        this.loadWaves(difficulty)

        this.currentWave = startWave
        this.checkpointWave = this.bossWaves.find(wave => wave > this.currentWave) || 0


        if (this.checkpointWave > this.waves.length) {
            this.checkpointWave = this.waves.length
        }

        //this ticker ticks the timer of when to send the next enemy in a wave
        this.waveTicker = undefined

        //this ticker ticks the timer of when the next wave should start
        this.wavesTicker = undefined

        this.isFreeplay = this.currentWave >= this.waves.length

        eventDispatcher.on("boss1Killed", () => {
            this.updateNextCheckpointWave(1)

            if (difficulty === "1Pill2Nil") {
                //this autoclicks the next wave button
                eventDispatcher.fireEvent("nextWaveBtnClick")
                return
            }
            eventDispatcher.fireEvent("saveProgess", {isVictory: false, deleteSave: false})
        })
        eventDispatcher.on("boss2Killed", () => {
            this.updateNextCheckpointWave(2)

            if (difficulty === "1Pill2Nil") {
                //this autoclicks the next wave button
                eventDispatcher.fireEvent("nextWaveBtnClick")
                return
            }
            eventDispatcher.fireEvent("saveProgess", {isVictory: false, deleteSave: false})
        })
        eventDispatcher.on("boss3Killed", () => {
            this.updateNextCheckpointWave(3)

            if (difficulty === "1Pill2Nil") {
                //this autoclicks the next wave button
                eventDispatcher.fireEvent("nextWaveBtnClick")
                return
            }
            eventDispatcher.fireEvent("saveProgess", {isVictory: false, deleteSave: false})
        })

        //If the player plays on Chill (Easy) mode, players only need to beat wave 80 (Unforgiving Stephenson-218) to win
        eventDispatcher.on("boss4Killed", () => {
            if (difficulty === "Chill") {
                eventDispatcher.fireEvent("saveProgess", {isVictory: true, deleteSave: true})
            } else {
                this.updateNextCheckpointWave(4)

                if (difficulty === "1Pill2Nil") {
                    //this autoclicks the next wave button
                    eventDispatcher.fireEvent("nextWaveBtnClick")
                    return
                }
                eventDispatcher.fireEvent("saveProgess", {isVictory: false, deleteSave: false})
            }
        })

        //If boss 5 (TON 618) is killed, save the game regardless of difficulty
        //For 1Pill2Nil, this is the only time a player gets a checkpoint
        eventDispatcher.on("boss5Killed", () => {
            this.cooldownToNextWave = 0
            eventDispatcher.fireEvent("saveProgess", {isVictory: true, deleteSave: false})
        })

        if (difficulty === "Chill") {
            this.bossWaves = [20, 40, 60, 80]
            this.waves.slice(80) //remove waves after 80 from the standard wave set
        }
    }

    private updateNextCheckpointWave(nextCheckpointIndex: number) {
        this.cooldownToNextWave = 0
        this.bossPresent = false
        this.checkpointWave = this.bossWaves[nextCheckpointIndex]
        if (this.checkpointWave > this.waves.length) {
            this.checkpointWave = this.waves.length
        }
        this.checkpointWaveBeaten = this.bossWaves[nextCheckpointIndex - 1]
    }

    loadWaves(difficulty: Difficulty) {



        //set to an alternatve wave set if player plays on killer's thrill (hard) difficulty
        const waves = difficulty === "Killer's Thrill" || difficulty === "1Pill2Nil" ? killerThrillWaves : productionWaves

        this.waves = waves
    }

    //run the waves
    sendWaves(gameplayScene: GameplayScene) {
        if (this.wavesStarted) {
            return
        }
        this.wavesStarted = true

        this.wavesTicker = new PIXI.Ticker()
        this.wavesTicker.autoStart = false

        this.sendWave(gameplayScene) // send 1st wave

        //spawns an enemy
        const onTick = () => {

            if (!this.wavesTicker) {
                return
            }

            this.cooldownToNextWave -= this.wavesTicker.deltaMS
            if (this.cooldownToNextWave <= 0) {
                this.sendWave(gameplayScene)
            }
        }

        this.wavesTicker.add(onTick)
        this.wavesTicker.start()
    }


    sendWave(gameplayScene: GameplayScene) {
        if (this.waveInProgress || !this.map.waypoints) { return }


        this.waveInProgress = true
        this.currentWave++
        const map = this.map

        if (this.bossWaves.includes(this.currentWave)) {
            // console.log("this is a boss wave.")
            this.bossPresent = true
        }

        const enemyAssets = assetLoader.enemies
        const enemySprites = assetLoader.spriteSheetEnemies

        if (!enemyAssets || !enemySprites) {
            throw new Error("Enemy assets not properly loaded...")
        }


        let waveArray




        const waveIndex = this.currentWave - 1
        this.waveTicker = new PIXI.Ticker()
        this.waveTicker.autoStart = false

        if (this.isFreeplay && this.extraWaves) {

            waveArray = this.extraWaves[0]
            this.extraWaves.shift()
            this.extraWaves.push(this.generateWave())
        } else {
            waveArray = this.waves[waveIndex]
        }

        //set the cooldown to next wave to the duration of the current wave
        this.cooldownToNextWave = waveArray.waveDurationMillis() + this.delaySecondsToNextWave * 1000

        let elapsedMS = 0
        let enemiesSpawned = 0

        let currentWavePartIndex = 0
        let wavePart = waveArray.waveParts[currentWavePartIndex]
        let enemyData = { ...allEnemyData[wavePart.enemy].stats }

        //after reaching max waves, buff all enemies expononentially
        if (this.isFreeplay) {
            this.buffKillerHealth(enemyData)
        }


        //spawns an enemy
        const onTick = () => {

            if (!this.waveTicker || !gameplayScene.mapContainer || !map.waypoints) {
                return
            }

            // if (this.currentWave === this.waves.length && this.wavesTicker?.started && !this.isFreeplay) {
            //     this.wavesTicker?.stop()
            //     this.wavesStarted = false
            // }


            elapsedMS += this.waveTicker.deltaMS
            if (elapsedMS >= wavePart.spacingMillis) {
                elapsedMS = 0
                enemiesSpawned++

                if (!enemyData) {
                    throw new Error("enemy data not properly loaded")
                }
                const spritesheet = assetLoader.spriteSheetEnemies?.get(wavePart.enemy)


                if (!spritesheet) {
                    throw new Error("spritesheet not loaded")
                }




                const spawnedEnemy = new Enemy(map.waypoints[0].x, map.waypoints[0].y, map.tileSize, map.tileSize, enemyData, spritesheet)
                // spawnedEnemy.zIndex = 3
                spawnedEnemy.spawn(gameplayScene.mapContainer)
                if (this.currentWave === this.checkpointWave) {
                    //
                }


                eventDispatcher.fireEvent("enemySpawn", spawnedEnemy)

                if (enemiesSpawned >= wavePart.count) {
                    currentWavePartIndex++
                    enemiesSpawned = 0

                    if (currentWavePartIndex >= waveArray.waveParts.length) {
                        this.waveTicker.stop()
                        this.waveInProgress = false

                        if (this.currentWave === this.checkpointWave && this.wavesTicker?.started && !this.isFreeplay) {
                            this.wavesTicker?.stop()
                            this.wavesStarted = false
                            // console.log("boss wave finished")
                            if (this.currentWave === this.waves.length) {
                                // console.log("all waves sent, setting into freeplay")
                                this.wavesTicker?.stop()
                                this.wavesStarted = false
                                this.isFreeplay = true
                            }
                        }
                    } else {
                        wavePart = waveArray.waveParts[currentWavePartIndex]
                        enemyData = {...allEnemyData[wavePart.enemy].stats}

                        //after reaching max waves, buff all enemies expononentially
                        if (this.isFreeplay) {
                            this.buffKillerHealth(enemyData)
                        }

                    }
                }
            }
        }

        this.waveTicker.add(onTick)
        this.waveTicker.start()
        eventDispatcher.fireEvent("waveStarted")
        return this.waves[waveIndex]

    }


    private buffKillerHealth(enemyData: EnemyStats) {
        const exponentialFactor = 1.05
        const exponent = this.currentWave - this.waves.length
        enemyData.health = Math.floor(enemyData.health * (exponentialFactor ** exponent))
    }

    generateWave() {

        // const bosses : EnemyClass[] = Object.values(allEnemyData).filter(enemy => enemy.stats.type === "Boss").map(enemy => enemy.stats.className) as EnemyClass[]
        const enemyClasses : EnemyClass[] = Object.values(allEnemyData).filter(enemy => enemy.stats.type !== "Boss").map(enemy => enemy.stats.className) as EnemyClass[]
        // const enemies = ["Infant Circle"] as EnemyClass[]

        const numberWaveParts = Math.floor(Math.random() * 10) + 1

        const waveArray: WavePart[] = []

        for (let i = 0; i < numberWaveParts; i++) {
            waveArray.push({
                enemy: enemyClasses[Math.floor(Math.random() * enemyClasses.length)],
                count: Math.floor(Math.random() * 10),
                spacingMillis: Math.floor(Math.random() * 10) * 100 + 100
            })
        }

        return new Wave(waveArray)
    }

    generateExtraWaves() {
        const waveArr = []
        const arraySize = 20

        for (let i = 0; i < arraySize; i++) {
            waveArr.push(this.generateWave())
        }

        return waveArr
    }


    cleanUpResources() {
        this.waveTicker?.stop()
        this.waveTicker?.destroy()
        this.wavesTicker?.stop()
        this.wavesTicker?.destroy()
        this.waves = []

        eventDispatcher.clearListenersOfEvent("boss1Killed")
        eventDispatcher.clearListenersOfEvent("boss2Killed")
        eventDispatcher.clearListenersOfEvent("boss3Killed")
        eventDispatcher.clearListenersOfEvent("boss4Killed")
    }
}