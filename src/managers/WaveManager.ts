import { Enemy } from "../objects/Enemy"
import { EventDispatcher } from "../utils/EventDispatcher"
import { AssetLoader } from "../core/AssetLoader"
import { Wave } from "../objects/Wave"
import { TdMap } from "src/objects/TdMap"

import * as PIXI from "pixi.js";
import { GameplayScene } from "src/scenes/GameplayScene"


import { oneEnemy, stressTest } from "../utils/WaveData"

const assetLoader = new AssetLoader()
const eventDispatcher = new EventDispatcher()
import { allEnemyData } from "../utils/EnemyData"

export class WaveManager {
    map: TdMap
    waves: Wave[]
    currentWave: number
    waveInProgress: boolean
    waveTicker: PIXI.Ticker | undefined

    /**
     *
     */
    constructor(map : TdMap) {
        this.map = map
        this.waves = []

        this.currentWave = 0
        this.waveInProgress = false
        this.loadWaves()

        this.waveTicker = undefined
    }

    loadWaves() {



        const waves = stressTest

        this.waves = waves
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

        //TODO later move enemy data to game data json
        let enemyDataMap = new Map([
            ["greenCircle", { health: 100, speed: 1, damage: 1, killValue: 15, asset: enemyAssets.greenCircle }]
        ])


        let waveArray

        if (this.currentWave >= this.waves.length + 1) {
            enemyDataMap = new Map([
                ["greenCircle", { health: Math.floor(100 * 1.05 ** (this.currentWave - this.waves.length)), speed: 1, damage: 1, killValue: 15, asset: enemyAssets.greenCircle }],
            ])
        }


        const waveIndex = this.currentWave - 1
        this.waveTicker = new PIXI.Ticker()
        this.waveTicker.autoStart = false

        if (this.currentWave >= this.waves.length + 1) {
            waveArray = this.generateWave()
        } else {
            waveArray = this.waves[waveIndex]
        }

        let elapsedMS = 0
        let enemiesSpawned = 0

        let currentWavePartIndex = 0
        let wavePart = waveArray.waveParts[currentWavePartIndex]
        let enemyData = enemyDataMap.get(wavePart.enemy)


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
                    return
                }
                const spritesheet = assetLoader.spriteSheetEnemies?.get("Infant Circle")

                if (!spritesheet) {
                    throw new Error("spritesheet not loaded")
                }

                const spawnedEnemy = new Enemy(map.waypoints[0].x, map.waypoints[0].y, map.tileSize, map.tileSize, allEnemyData["infantCircle"].stats, spritesheet)
                // spawnedEnemy.zIndex = 3
                gameplayScene.container.addChild(spawnedEnemy.sprite)
                spawnedEnemy.sprite.visible = false //dont render when first init.

                eventDispatcher.fireEvent("enemySpawn", spawnedEnemy)

                if (enemiesSpawned >= wavePart.count) {
                    currentWavePartIndex++
                    enemiesSpawned = 0

                    if (currentWavePartIndex >= waveArray.waveParts.length) {
                        this.waveTicker.stop()
                        this.waveInProgress = false
                    } else {
                        wavePart = waveArray.waveParts[currentWavePartIndex]
                        enemyData = enemyDataMap.get(wavePart.enemy)
                    }
                }
            }
        }

        this.waveTicker.add(onTick)
        this.waveTicker.start()
        return this.waves[waveIndex]

    }


    generateWave() {
        const enemies = ["greenCircle"]

        const numberWaveParts = Math.floor(Math.random() * 10) + 1

        const waveArray = []

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
        this.waves = []
    }
}