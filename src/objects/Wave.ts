import { EnemyClass } from "src/ts/types/EnemyData"

type WavePart = {
    enemy: EnemyClass,
    count: number,
    spacingMillis: number,
}

export class Wave {
    waveParts: WavePart[]

    constructor(waveParts : WavePart[]) {
        this.waveParts = waveParts
    }
}

export { WavePart }