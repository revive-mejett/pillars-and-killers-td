import { walkPath2 } from "./Enemy.js"

export class WaveManager {
    /**
     *
     */

    constructor() {
        this.waves = [
         [1,1,1,1,1],
         [1,1,1,1,1,1,1,1,1,1,1,1]   
        ]
        this.currentWave = 1
    }

    sendWave(app, map) {
        console.log("send wave")
        if (this.currentWave === this.waves.length) throw new Error("Already at last wave")

        let waveIndex = this.currentWave - 1
        

        console.log(`Wave ${this.currentWave} of ${this.waves.length} sent!`);
        this.currentWave++
        const waveTicker = new PIXI.Ticker();
        waveTicker.autoStart = false

        let elapsedMS = 0
        console.log(this.waves[waveIndex].length)
        let enemiesSpawned = 0
        //[1,1,1,1,1]
        let onTick = () => {
            elapsedMS += waveTicker.deltaMS
            if (elapsedMS >= 500) {
                elapsedMS = 0
                enemiesSpawned++

                walkPath2(app, map)

                if (enemiesSpawned >= this.waves[waveIndex].length) {
                    console.log("all enemies spawned in wave")
                    waveTicker.stop()
                }
            }
        }

        waveTicker.add(onTick)
        waveTicker.start()
        return this.waves[waveIndex]

        
    }




}