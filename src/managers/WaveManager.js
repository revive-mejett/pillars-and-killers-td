import { Assets } from "pixi.js"
import { Enemy } from "../objects/Enemy.js"
import { EventDispatcher } from "../utils/EventDispatcher.js"

export class WaveManager {
    /**
     *
     */

    constructor() {
        this.waves = [
         [1,1,1,1,1],
         [1,1,1,1,1,1,1,1,1,1,1,1,1,1] 
        ]
        this.currentWave = 1
    }

    async sendWave(app, map) {
        //throw error if all the waves are already sent
        if (this.currentWave === this.waves.length + 1) throw new Error("Already at last wave")

        let waveIndex = this.currentWave - 1
        let testEnemyBundle = await Assets.loadBundle("enemies")
        console.log(`Wave ${this.currentWave} of ${this.waves.length} sent!`);
        this.currentWave++
        const waveTicker = new PIXI.Ticker()
        waveTicker.autoStart = false

        let elapsedMS = 0
        let enemiesSpawned = 0

        //spawns an enemy
        let onTick = () => {
            elapsedMS += waveTicker.deltaMS
            if (elapsedMS >= 160 * (400 + Math.random() * 800) / 800) {
                elapsedMS = 0
                enemiesSpawned++
                let spawnedEnemy = new Enemy(100, 5, testEnemyBundle.blueCircle, map)
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




}