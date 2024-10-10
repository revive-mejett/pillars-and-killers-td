import { Assets } from "pixi.js"
import { Enemy } from "../objects/Enemy.js"
import { EventDispatcher } from "../utils/EventDispatcher.js"
import { Wave } from "../objects/Wave.js"
import { AssetLoader } from "../core/AssetLoader.js"

const assetLoader = new AssetLoader()

export class WaveManager {
    /**
     *
     */

    constructor() {
        this.waves = [
         [1,1,1,1,1],
         [1,1,1,1,1,1,1,1,1,1,1,1,1,1] 
        ]
        this.advancedWaves = []
        
        this.currentWave = 1
        this.loadWaves()
    }

    loadWaves() {

        const waves = [
            new Wave(
                [
                    {
                        enemy: "greenCircle",
                        count: 10,
                        spacingMillis: 500
                    }
                ]
            )
        ]

        this.advancedWaves = waves
    }


    async sendWave(app, map) {
        const enemySprites = assetLoader.enemies
        //throw error if all the waves are already sent
        if (this.currentWave === this.waves.length + 1) throw new Error("Already at last wave")

        let waveIndex = this.currentWave - 1
        console.log(`Wave ${this.currentWave} of ${this.waves.length} sent!`);
        this.currentWave++
        const waveTicker = new PIXI.Ticker()
        waveTicker.autoStart = false

        let elapsedMS = 0
        let enemiesSpawned = 0

        //spawns an enemy
        let onTick = () => {
            elapsedMS += waveTicker.deltaMS
            if (elapsedMS >= 500) {
                elapsedMS = 0
                enemiesSpawned++
                let spawnedEnemy = new Enemy(100, 5, enemySprites.greenCircle, map)
                spawnedEnemy.zIndex = 3
                app.stage.addChild(spawnedEnemy.sprite)
                new EventDispatcher().fireEvent("enemySpawn", spawnedEnemy)

                if (enemiesSpawned >= this.waves[waveIndex].length) {
                    waveTicker.stop()
                }
            }
        }

        waveTicker.add(onTick)
        waveTicker.start()
        return this.waves[waveIndex]

    }

    async sendWaveAdvanced(app, map) {
        const enemyAssets = assetLoader.enemies

        //TODO later move enemy data to game data json
        const enemyDataMap = new Map([
            ["greenCircle", {health: 100, speed: 1, damage: 10, asset: enemyAssets.greenCircle}],
            ["blueCircle", {health: 300, speed: 1.5, damage: 40, asset: enemyAssets.blueCircle}],
            ["purpleCircle", {health: 400, speed: 3, damage: 10, asset: enemyAssets.purpleCircle}],
            ["yellowCircle", {health: 1200, speed: 0.25, damage: 30, asset: enemyAssets.yellowCircle}],
        ])


        //throw error if all the waves are already sent
        if (this.currentWave === this.advancedWaves.length + 1) throw new Error("Already at last wave (using advanced wave sturcture)")

        let waveIndex = this.currentWave - 1
        console.log(`Wave ${this.currentWave} of ${this.advancedWaves.length} sent!`);
        this.currentWave++
        const waveTicker = new PIXI.Ticker()
        waveTicker.autoStart = false

        let elapsedMS = 0
        let enemiesSpawned = 0
        const waveArray = this.advancedWaves[0]
        const wavePart = waveArray.waveParts[0]
        let enemyData = enemyDataMap.get("greenCircle")
        console.log(assetLoader.greenCircle)


        //spawns an enemy
        let onTick = () => {
            elapsedMS += waveTicker.deltaMS
            if (elapsedMS >= wavePart.spacingMillis) {
                elapsedMS = 0
                enemiesSpawned++
                let spawnedEnemy = new Enemy(map, ...Object.values(enemyData))
                spawnedEnemy.zIndex = 3
                app.stage.addChild(spawnedEnemy.sprite)
                new EventDispatcher().fireEvent("enemySpawn", spawnedEnemy)
                if (enemiesSpawned >= wavePart.count) {
                    waveTicker.stop()
                }
            }
        }

        waveTicker.add(onTick)
        waveTicker.start()
        return this.advancedWaves[waveIndex]

    }



}