

let instance = null

export class AssetLoader {



    constructor() {
        
        
        //singleton
        if (!instance) {
            instance = this
            this.resources = {}
        }


        return instance
    }
    
}