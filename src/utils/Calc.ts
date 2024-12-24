import { Wave } from "src/objects/Wave";
import { allEnemyData } from "./EnemyData";

export function calculateWaveValue(wave: Wave) {
    return wave.waveParts.reduce((accum, wavePart) => accum + allEnemyData[wavePart.enemy].stats.killValue * wavePart.count, 0)
}

export function formatMillionString(n : number) {
    const millions = n / 1_000_000
    return millions.toFixed(2) + "M"
}


