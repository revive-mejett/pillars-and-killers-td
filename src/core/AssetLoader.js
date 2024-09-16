import { Assets } from "pixi.js"


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

    async loadAssets() {
        this.resources = Assets.addBundle("enemies", {
            "greenCircle" : "assets/images/killer_green_circle.png",
            "blueCircle" : "assets/images/killer_blue_circle.png",
        })
    }
    
}