import { Wave } from "src/objects/Wave";
import { allEnemyData } from "./EnemyData";

export function calculateWaveValue(wave: Wave) {
    return wave.waveParts.reduce((accum, wavePart) => accum + allEnemyData[wavePart.enemy].stats.killValue * wavePart.count, 0)
}


