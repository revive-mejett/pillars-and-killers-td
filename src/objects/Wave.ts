type WavePart = {
    enemy: string,
    count: number,
    spacingMillis: number,
}

export class Wave {
    waveParts: WavePart[]

    constructor(waveParts : WavePart[]) {
        this.waveParts = waveParts
    }
}