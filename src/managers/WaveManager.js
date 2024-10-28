import { Enemy } from "../objects/Enemy.js"
import { EventDispatcher } from "../utils/EventDispatcher.js"
import { AssetLoader } from "../core/AssetLoader.js"
import { testWaves2 } from "../utils/WaveData.js"

const assetLoader = new AssetLoader()

export class WaveManager {
    /**
     *
     */

    constructor(map) {
        this.map = map
        this.waves = []

        this.currentWave = 0
        this.waveInProgress = false
        this.loadWaves()
    }

    loadWaves() {



        const waves = testWaves2

        this.waves = waves
    }



    async sendWave(gameplayScene) {
        if (this.waveInProgress) {return}

        this.waveInProgress = true
        this.currentWave++
        const map = this.map
        const enemyAssets = assetLoader.enemies

        //TODO later move enemy data to game data json
        const enemyDataMap = new Map([
            ["greenCircle", { health: 100, speed: 1, damage: 10, killValue: 15, asset: enemyAssets.greenCircle }],
            ["blueCircle", { health: 280, speed: 1.2, damage: 40, killValue: 30, asset: enemyAssets.blueCircle }],
            ["purpleCircle", { health: 700, speed: 1.6, damage: 10, killValue: 50, asset: enemyAssets.purpleCircle }],
            ["yellowCircle", { health: 2000, speed: 0.6, damage: 30, killValue: 16, asset: enemyAssets.yellowCircle }]
        ])


        //throw error if all the waves are already sent
        if (this.currentWave === this.waves.length + 1) {throw new Error("Already at last wave (using advanced wave sturcture)")}

        let waveIndex = this.currentWave - 1
        const waveTicker = new PIXI.Ticker()
        waveTicker.autoStart = false

        let elapsedMS = 0
        let enemiesSpawned = 0


        let waveArray = this.waves[waveIndex]


        let currentWavePartIndex = 0
        let wavePart = waveArray.waveParts[currentWavePartIndex]
        let enemyData = enemyDataMap.get(wavePart.enemy)




        //spawns an enemy
        let onTick = () => {

            elapsedMS += waveTicker.deltaMS
            if (elapsedMS >= wavePart.spacingMillis) {
                elapsedMS = 0
                enemiesSpawned++



                let spawnedEnemy = new Enemy(map.waypoints[0].x, map.waypoints[0].y, map.tileSize, map.tileSize, ...Object.values(enemyData))
                spawnedEnemy.zIndex = 3
                gameplayScene.container.addChild(spawnedEnemy.sprite)


                new EventDispatcher().fireEvent("enemySpawn", spawnedEnemy)

                if (enemiesSpawned >= wavePart.count) {
                    currentWavePartIndex++
                    enemiesSpawned = 0

                    if (currentWavePartIndex >= waveArray.waveParts.length) {
                        waveTicker.stop()
                        this.waveInProgress = false
                    } else {
                        wavePart = waveArray.waveParts[currentWavePartIndex]
                        enemyData = enemyDataMap.get(wavePart.enemy)
                    }
                }
            }
        }

        waveTicker.add(onTick)
        waveTicker.start()
        return this.waves[waveIndex]

    }



}