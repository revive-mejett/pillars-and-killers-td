import { Assets } from "pixi.js"


let instance = null

export class AssetLoader {



    constructor() {
        
        
        //singleton
        if (!instance) {
            instance = this
        }


        return instance
    }

    async loadAssets() {
        Assets.addBundle("enemies", {
            "greenCircle" : "assets/images/killer_green_circle.png",
            "blueCircle" : "assets/images/killer_blue_circle.png",
            "purpleCircle" : "assets/images/killer_purple_circle.png",
            "yellowCircle" : "assets/images/killer_yellow_circle.png",
        })
        Assets.addBundle("icons", {
            "money" : "assets/images/money_icon.png",
            "lives" : "assets/images/couple.png",
        })
        Assets.addBundle("towerSprites", {
            "basicPillarIcon" : "assets/images/basic_pillar.png",
            "basicPillarTop" : "assets/images/basic_pillar_top.png",
            "frozenPillar" : "assets/images/frozen_pillar_icon.png",
            "frozenPillarTop" : "assets/images/frozen_pillar_top.png",
            "advancedPillar" : "assets/images/advanced_pillar_icon.png",
            "advancedPillarTop" : "assets/images/advanced_pillar_top.png",
            "ultimatePillar" : "assets/images/ultimate_pillar.png",
            "ultimatePillarTop" : "assets/images/ultimate_pillar_top.png",
        })
    }
    
}