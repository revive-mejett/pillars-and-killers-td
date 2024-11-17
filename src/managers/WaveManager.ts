import { Enemy } from "../objects/Enemy"
import { EventDispatcher } from "../utils/EventDispatcher"
import { AssetLoader } from "../core/AssetLoader"
import { testWaves2 } from "../utils/WaveData"
import { Wave } from "../objects/Wave"
import { TdMap } from "src/objects/TdMap"

import * as PIXI from "pixi.js";
import { GameplayScene } from "src/scenes/GameplayScene"

const assetLoader = new AssetLoader()
const eventDispatcher = new EventDispatcher()

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



        const waves = testWaves2

        this.waves = waves
    }



    sendWave(gameplayScene : GameplayScene) {
        if (this.waveInProgress) {return}

        this.waveInProgress = true
        this.currentWave++
        const map = this.map
        const enemyAssets = assetLoader.enemies

        if (!enemyAssets) {
            throw new Error("Enemy assets not properly loaded...")
        }

        //TODO later move enemy data to game data json
        let enemyDataMap = new Map([
            ["greenCircle", { health: 100, speed: 1, damage: 1, killValue: 15, asset: enemyAssets.greenCircle }],
            ["blueCircle", { health: 280, speed: 1.2, damage: 1, killValue: 30, asset: enemyAssets.blueCircle }],
            ["purpleCircle", { health: 700, speed: 1.6, damage: 3, killValue: 50, asset: enemyAssets.purpleCircle }],
            ["yellowCircle", { health: 2000, speed: 0.6, damage: 5, killValue: 320, asset: enemyAssets.yellowCircle }]
        ])


        let waveArray

        if (this.currentWave >= this.waves.length + 1) {
            enemyDataMap = new Map([
                ["greenCircle", { health: Math.floor(100 * 1.05 ** (this.currentWave - this.waves.length)), speed: 1, damage: 1, killValue: 15, asset: enemyAssets.greenCircle }],
                ["blueCircle", { health: Math.floor(280 * 1.05 ** (this.currentWave - this.waves.length)), speed: 1.2, damage: 1, killValue: 30, asset: enemyAssets.blueCircle }],
                ["purpleCircle", { health: Math.floor(700 * 1.05 ** (this.currentWave - this.waves.length)), speed: 1.6, damage: 3, killValue: 50, asset: enemyAssets.purpleCircle }],
                ["yellowCircle", { health: Math.floor(2000 * 1.05 ** (this.currentWave - this.waves.length)), speed: 0.6, damage: 5, killValue: 320, asset: enemyAssets.yellowCircle }]
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

                const spawnedEnemy = new Enemy(map.waypoints[0].x, map.waypoints[0].y, map.tileSize, map.tileSize, enemyData.health, enemyData.speed, enemyData.damage, enemyData.killValue, enemyData.asset)
                // spawnedEnemy.zIndex = 3
                gameplayScene.container.addChild(spawnedEnemy.sprite)


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
        const enemies = ["greenCircle", "blueCircle", "purpleCircle", "yellowCircle"]

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