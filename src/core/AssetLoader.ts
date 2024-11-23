import { Assets } from "pixi.js"


let instance : AssetLoader | null = null

export class AssetLoader {
    enemies: {[key: string] : string } | undefined
    icons: {[key: string] : string } | undefined
    towers: {[key: string] : string } | undefined
    otherImages: {[key: string] : string } | undefined
    sfx: {[key: string] : string } | undefined

    spriteSheetEnemies: {[key: string] : string } | undefined



    constructor() {
        //singleton
        if (!instance) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            instance = this
            this.enemies = {}
            this.spriteSheetEnemies = {}
            this.icons = {}
            this.towers = {}
            this.otherImages = {}
            this.sfx = {}
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
            "emberPillar" : "assets/images/ember_pillar_icon.png",
            "emberPillarTop" : "assets/images/ember_pillar_top.png",
            "advancedPillar" : "assets/images/advanced_pillar_icon.png",
            "advancedPillarTop" : "assets/images/advanced_pillar_top.png",
            "lightningPillar" : "assets/images/lightning_pillar_icon.png",
            "lightningPillarTopLv1" : "assets/images/lightning_pillar_top_lv1.png",
            "lightningPillarTopLv2" : "assets/images/lightning_pillar_top_lv2.png",
            "lightningPillarTopLv3" : "assets/images/lightning_pillar_top_lv3.png",
            "lightningPillarTopLv4" : "assets/images/lightning_pillar_top_lv4.png",
            "lightningPillarTopLv5" : "assets/images/lightning_pillar_top_lv5.png",
            "ultimatePillar" : "assets/images/ultimate_pillar.png",
            "ultimatePillarTop" : "assets/images/ultimate_pillar_top.png"
        })

        Assets.addBundle("otherImages", {
            "mainTitle" : "assets/images/td_title.png",
            "mainTitleImage" : "assets/images/pillars_killers_title_pic.png",
            "gameoverGraveyard" : "assets/images/gameover_rip.png"
        })

        // Assets.addBundle("sfx", {
        //     "towerBuy" : "assets/sounds/sfx/tower_buy.mp3"
        // })
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

    async loadEnemySpriteSheets() {
        // const infantCircle = new Spritesheet()
        
    }

    // async loadSfx() {
    //     this.sfx = await Assets.loadBundle("sfx")
    // }


}