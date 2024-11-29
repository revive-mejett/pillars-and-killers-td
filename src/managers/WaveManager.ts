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

const delaySecondsToNextWave = 10

export class WaveManager {
    map: TdMap
    waves: Wave[]
    currentWave: number
    waveInProgress: boolean
    waveTicker: PIXI.Ticker | undefined
    wavesTicker: PIXI.Ticker |undefined
    cooldownToNextWave: number
    wavesStarted: boolean = false

    /**
     *
     */
    constructor(map : TdMap) {
        this.map = map
        this.waves = []

        this.currentWave = 0
        this.waveInProgress = false

        this.cooldownToNextWave = 0
        this.loadWaves()

        //this ticker ticks the timer of when to send the next enemy in a wave
        this.waveTicker = undefined

        //this ticker ticks the timer of when the next wave should start
        this.wavesTicker = undefined
    }

    loadWaves() {



        const waves = testWaves2

        this.waves = waves
    }

    //run the waves
    sendWaves(gameplayScene : GameplayScene) {
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


    sendWave(gameplayScene : GameplayScene) {
        if (this.waveInProgress) {return}


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

        if (this.currentWave >= this.waves.length + 1) {
            console.log("gen wave")
            waveArray = this.generateWave()
        } else {
            waveArray = this.waves[waveIndex]
        }

        //set the cooldown to next wave to the duration of the current wave
        this.cooldownToNextWave = waveArray.waveDurationMillis() + delaySecondsToNextWave * 1000

        let elapsedMS = 0
        let enemiesSpawned = 0

        let currentWavePartIndex = 0
        let wavePart = waveArray.waveParts[currentWavePartIndex]
        let enemyData = allEnemyData[wavePart.enemy].stats
        //after reaching max waves, buff all enemies expononentially
        if (this.currentWave >= this.waves.length + 1) {
            this.buffKillerHealth(enemyData)
        }


        //spawns an enemy
        const onTick = () => {

            if (!this.waveTicker) {
                return
            }

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
                spawnedEnemy.spawn(gameplayScene.container)

                eventDispatcher.fireEvent("enemySpawn", spawnedEnemy)

                if (enemiesSpawned >= wavePart.count) {
                    currentWavePartIndex++
                    enemiesSpawned = 0

                    if (currentWavePartIndex >= waveArray.waveParts.length) {
                        this.waveTicker.stop()
                        this.waveInProgress = false
                    } else {
                        wavePart = waveArray.waveParts[currentWavePartIndex]
                        enemyData = allEnemyData[wavePart.enemy].stats
                        //after reaching max waves, buff all enemies expononentially
                        if (this.currentWave >= this.waves.length + 1) {
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
        enemyData.health = Math.floor(enemyData.health * exponentialFactor ** (this.currentWave - this.waves.length))
    }

    generateWave() {
        // const enemies : EnemyClass[] = Object.keys(allEnemyData) as EnemyClass[]
        const enemies = ["Infant Circle"] as EnemyClass[]

        const numberWaveParts = Math.floor(Math.random() * 10) + 1

        const waveArray : WavePart[] = []

        for (let i = 0; i < numberWaveParts; i++) {
            waveArray.push({
                enemy: enemies[Math.floor(Math.random() * enemies.length)],
                count: Math.floor(Math.random() * 10),
                spacingMillis: Math.floor(Math.random() * 10) * 100 + 100
            })
        }

        return new Wave(waveArray)
    }


    cleanUpResources() {
        this.waveTicker?.stop()
        this.waveTicker?.destroy()
        this.wavesTicker?.stop()
        this.wavesTicker?.destroy()
        this.waves = []
    }
}