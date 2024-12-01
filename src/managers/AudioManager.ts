let instance : AudioManager | null = null

export class AudioManager {




    constructor() {
        //singleton
        if (!instance) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            instance = this
        }
        return instance
    }
}