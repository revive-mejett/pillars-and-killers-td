import { Enemy } from "../objects/killers/Enemy"
import { EventDispatcher } from "../utils/EventDispatcher"
import { AssetLoader } from "../core/AssetLoader"
import { Wave, WavePart } from "../objects/Wave"
import { TdMap } from "src/objects/TdMap"

import * as PIXI from "pixi.js";
import { GameplayScene } from "src/scenes/GameplayScene"


import { testWaves2 } from "../utils/WaveData"

const assetLoader = new AssetLoader()
const eventDispatcher = new EventDispatcher()
import { allEnemyData } from "../utils/EnemyData"
import { EnemyClass, EnemyStats } from "src/ts/types/EnemyData"


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

    /**
     *
     */
    constructor(map: TdMap) {
        this.map = map
        this.waves = []
        this.extraWaves = this.generateExtraWaves()

        this.currentWave = 200
        this.waveInProgress = false

        this.cooldownToNextWave = 0
        this.delaySecondsToNextWave = 10
        this.loadWaves()

        //this ticker ticks the timer of when to send the next enemy in a wave
        this.waveTicker = undefined

        //this ticker ticks the timer of when the next wave should start
        this.wavesTicker = undefined

        this.isFreeplay = this.currentWave >= this.waves.length
    }

    loadWaves() {



        const waves = testWaves2

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
        if (this.waveInProgress) { return }


        this.waveInProgress = true
        this.currentWave++
        const map = this.map
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
        console.log(this.cooldownToNextWave)

        let elapsedMS = 0
        let enemiesSpawned = 0

        let currentWavePartIndex = 0
        let wavePart = waveArray.waveParts[currentWavePartIndex]
        let enemyData = { ...allEnemyData[wavePart.enemy].stats }
        console.log(enemyData)
        //after reaching max waves, buff all enemies expononentially
        if (this.isFreeplay) {
            this.buffKillerHealth(enemyData)
        }


        //spawns an enemy
        const onTick = () => {

            if (!this.waveTicker || !gameplayScene.mapContainer) {
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
                if (this.currentWave === this.waves.length) {
                    console.log("boss sent")
                }


                eventDispatcher.fireEvent("enemySpawn", spawnedEnemy)

                if (enemiesSpawned >= wavePart.count) {
                    currentWavePartIndex++
                    enemiesSpawned = 0

                    if (currentWavePartIndex >= waveArray.waveParts.length) {
                        this.waveTicker.stop()
                        this.waveInProgress = false

                        if (this.currentWave === this.waves.length && this.wavesTicker?.started && !this.isFreeplay) {
                            this.wavesTicker?.stop()
                            this.wavesStarted = false
                            console.log("all waves finish send")
                            this.isFreeplay = true
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
        console.log("buff killer health")
        const exponentialFactor = 1.05
        const exponent = this.currentWave - this.waves.length
        console.log(exponent)
        enemyData.health = Math.floor(enemyData.health * (exponentialFactor ** exponent))
    }

    generateWave() {
        // const enemies : EnemyClass[] = Object.keys(allEnemyData) as EnemyClass[]
        const enemies = ["Infant Circle"] as EnemyClass[]

        const numberWaveParts = Math.floor(Math.random() * 10) + 1

        const waveArray: WavePart[] = []

        for (let i = 0; i < numberWaveParts; i++) {
            waveArray.push({
                enemy: enemies[Math.floor(Math.random() * enemies.length)],
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
    }
}