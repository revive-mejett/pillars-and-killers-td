

export class EventDispatcher {


    constructor() {
        //singleton
        if (!instance) {
            instance = this
        }
        return instance
    }
}