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
        if (this.currentWave === this.waves.length) throw new Error("Already at last wave")

        let waveIndex = this.currentWave - 1
        this.currentWave++

        console.log(`Wave ${this.currentWave} of ${this.waves.length} sent!`);
        
        const waveTicker = new PIXI.Ticker();
        waveTicker.autoStart = false

        let elapsedMS = 0
        let waveArray = this.waves[waveIndex]
        let enemiesSpawned = 0
        //[1,1,1,1,1]
        function onTick() {
            elapsedMS += waveTicker.deltaMS
            if (elapsedMS >= 1000) {
                console.log("spawned");
                elapsedMS = 0
                enemiesSpawned++

                walkPath(app, map)

                if (enemiesSpawned == this.waves[waveIndex]) {
                    log("all enemies spawned in wave")
                }
            }
        }

        waveTicker.add(onTick)
        waveTicker.start()
        return this.waves[waveIndex]

        
    }




}