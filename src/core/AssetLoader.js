import { Assets } from "pixi.js"


let instance = null

export class AssetLoader {



    constructor() {
        
        
        //singleton
        if (!instance) {
            instance = this
            this.resources = {}
            this.icons = {}
        }


        return instance
    }

    async loadAssets() {
        this.resources = Assets.addBundle("enemies", {
            "greenCircle" : "assets/images/killer_green_circle.png",
            "blueCircle" : "assets/images/killer_blue_circle.png",
            "blueCircle" : "assets/images/killer_purple_circle.png",
            "blueCircle" : "assets/images/killer_yellow_circle.png",
        })
        this.icons = Assets.addBundle("icons", {
            "money" : "assets/images/money_icon.png",
            "lives" : "assets/images/couple.png",
        })
    }
    
}