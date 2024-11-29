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

    waveDurationMillis() {
        return this.waveParts.reduce((prev, curr) => prev + curr.spacingMillis, 0)
    }
}

export { WavePart }