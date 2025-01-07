import { Wave } from "src/objects/Wave";
import { allEnemyData } from "./EnemyData";

export function calculateWaveValue(wave: Wave) {
    return wave.waveParts.reduce((accum, wavePart) => accum + allEnemyData[wavePart.enemy].stats.killValue * wavePart.count, 0)
}

export function countEnemyQuantityInWave(wave: Wave) {
    const enemyMap = new Map()

    wave.waveParts.forEach(wavePart => {
        if (enemyMap.get(wavePart.enemy)) {
            enemyMap.set(wavePart.enemy, enemyMap.get(wavePart.enemy) + wavePart.count)
        } else {
            enemyMap.set(wavePart.enemy, wavePart.count)
        }
    })

    return enemyMap

}

export function formatMillionString(n : number) {
    const millions = n / 1_000_000
    return millions.toFixed(2) + "M"
}


