

let instance = null

export class AssetLoader {



    constructor() {
        
        
        //singleton
        if (!instance) {
            instance = this
            this.resources = {}
            this.loader = new PIXI.loader.shared
        }


        return instance
    }

    loadAssets() {
        this.loader.add({
            name : "greenEnemy",
            url: "assets/images/killer_green_circle.png"
        })
    }
    
}