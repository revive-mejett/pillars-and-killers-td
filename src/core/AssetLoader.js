import { Assets } from "pixi.js"


let instance = null

export class AssetLoader {



    constructor() {
        //singleton
        if (!instance) {
            instance = this
            this.enemies = {}
            this.icons = {}
            this.towers = {}
            this.otherImages = {}
        }
        return instance
    }

    bundleAssets() {
        Assets.addBundle("enemies", {
            "greenCircle" : "assets/images/killer_green_circle.png",
            "blueCircle" : "assets/images/killer_blue_circle.png",
            "purpleCircle" : "assets/images/killer_purple_circle.png",
            "yellowCircle" : "assets/images/killer_yellow_circle.png"
        })
        Assets.addBundle("icons", {
            "money" : "assets/images/money_icon.png",
            "lives" : "assets/images/couple.png",
            "heart" : "assets/images/heart_icon.png",
            "speedArrow" : "assets/images/speed_icon.png",
            "slowed" : "assets/images/slowed_icon.png"
        })
        Assets.addBundle("towers", {
            "basicPillarIcon" : "assets/images/basic_pillar.png",
            "basicPillarTop" : "assets/images/basic_pillar_top.png",
            "icePillar" : "assets/images/frozen_pillar_icon.png",
            "icePillarTop" : "assets/images/frozen_pillar_top.png",
            "advancedPillar" : "assets/images/advanced_pillar_icon.png",
            "advancedPillarTop" : "assets/images/advanced_pillar_top.png",
            "ultimatePillar" : "assets/images/ultimate_pillar.png",
            "ultimatePillarTop" : "assets/images/ultimate_pillar_top.png"
        })

        Assets.addBundle("otherImages", {
            "mainTitle" : "assets/images/td_title.png",
            "mainTitleImage" : "assets/images/pillars_killers_title_pic.png",
            "gameoverGraveyard" : "assets/images/gameover_rip.png"
        })
    }

    async loadEnemySprites() {
        this.enemies = await Assets.loadBundle("enemies")
    }

    async loadIconSprites() {
        this.icons = await Assets.loadBundle("icons")
    }

    async loadTowerSprites() {
        this.towers = await Assets.loadBundle("towers")
    }

    async loadOtherImagesSprites() {
        this.otherImages = await Assets.loadBundle("otherImages")
    }



}