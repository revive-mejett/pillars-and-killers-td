import { Assets, Spritesheet, Texture } from "pixi.js"
import { allEnemyData, zappedAtlasData } from "../utils/EnemyData"


let instance : AssetLoader | null = null

export class AssetLoader {
    enemies: {[key: string] : string } | undefined
    icons: {[key: string] : string } | undefined
    towers: {[key: string] : string } | undefined
    mapBackgroundImages: {[key: string] : string } | undefined
    otherImages: {[key: string] : string } | undefined
    sfx: {[key: string] : string } | undefined

    spriteSheetEnemies: Map<string, Spritesheet> | undefined
    spriteSheetZapped : Spritesheet | undefined



    constructor() {
        //singleton
        if (!instance) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            instance = this
            this.enemies = {}
            this.spriteSheetEnemies = new Map()
            this.spriteSheetZapped = undefined
            this.icons = {}
            this.towers = {}
            this.mapBackgroundImages = {}
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
            "slowed" : "assets/images/slowed_icon.png",
            "poisonIved" : "assets/images/poison_ived_icon.png",
            "dmgResistance" : "assets/images/resistance_icon.png",
            "musicActive" : "assets/images/icon_sfx_music.png",
            "musicMuted" : "assets/images/icon_sfx_music_muted.png",
            "sfxActive" : "assets/images/icon_sfx_volume.png",
            "sfxMuted" : "assets/images/icon_sfx_volume_muted.png"
        })
        Assets.addBundle("towers", {
            "basicPillarIcon" : "assets/images/basic_pillar.png",
            "basicPillarTop" : "assets/images/basic_pillar_top.png",

            "icePillar" : "assets/images/frozen_pillar_icon.png",
            "icePillarTop" : "assets/images/frozen_pillar_top.png",
            "icePillarTopLv1" : "assets/images/frozen_pillar_top_lv1.png",
            "icePillarTopLv2" : "assets/images/frozen_pillar_top_lv2.png",
            "icePillarTopLv3" : "assets/images/frozen_pillar_top_lv3.png",
            "icePillarTopLv4" : "assets/images/frozen_pillar_top_lv4.png",
            "icePillarTopLv5" : "assets/images/frozen_pillar_top_lv5.png",


            "emberPillar" : "assets/images/ember_pillar_icon.png",
            "emberPillarTop" : "assets/images/ember_pillar_top.png",
            "emberPillarTopLv1" : "assets/images/ember_pillar_top_lv1.png",
            "emberPillarTopLv2" : "assets/images/ember_pillar_top_lv2.png",
            "emberPillarTopLv3" : "assets/images/ember_pillar_top_lv3.png",
            "emberPillarTopLv4" : "assets/images/ember_pillar_top_lv4.png",
            "emberPillarTopLv5" : "assets/images/ember_pillar_top_lv5.png",


            "poisonIvyPillar" : "assets/images/poisonivy_pillar_icon.png",
            "poisonIvyTopLv1" : "assets/images/poisonivy_pillar_top_lv1.png",
            "poisonIvyTopLv2" : "assets/images/poisonivy_pillar_top_lv2.png",
            "poisonIvyTopLv3" : "assets/images/poisonivy_pillar_top_lv3.png",
            "poisonIvyTopLv4" : "assets/images/poisonivy_pillar_top_lv4.png",
            "poisonIvyTopLv5" : "assets/images/poisonivy_pillar_top_lv5.png",


            "advancedPillar" : "assets/images/advanced_pillar_icon.png",
            "advancedPillarTop" : "assets/images/advanced_pillar_top.png",
            "advancedPillarTopLv1" : "assets/images/advanced_pillar_top_lv1.png",
            "advancedPillarTopLv2" : "assets/images/advanced_pillar_top_lv2.png",
            "advancedPillarTopLv3" : "assets/images/advanced_pillar_top_lv3.png",
            "advancedPillarTopLv4" : "assets/images/advanced_pillar_top_lv4.png",
            "advancedPillarTopLv5" : "assets/images/advanced_pillar_top_lv5.png",


            "missilePillar" : "assets/images/missile_pillar_icon.png",
            "missilePillarTopLv1" : "assets/images/missile_pillar_top_lv1.png",
            "missilePillarTopLv2" : "assets/images/missile_pillar_top_lv2.png",
            "missilePillarTopLv3" : "assets/images/missile_pillar_top_lv3.png",
            "missilePillarTopLv4" : "assets/images/missile_pillar_top_lv4.png",
            "missilePillarTopLv5" : "assets/images/missile_pillar_top_lv5.png",

            "dreadglassPillar" : "assets/images/dreadglass_pillar_icon.png",
            "dreadglassPillarTopLv1" : "assets/images/dreadglass_pillar_top_lv1.png",
            "dreadglassPillarTopLv2" : "assets/images/dreadglass_pillar_top_lv2.png",
            "dreadglassPillarTopLv3" : "assets/images/dreadglass_pillar_top_lv3.png",
            "dreadglassPillarTopLv4" : "assets/images/dreadglass_pillar_top_lv4.png",
            "dreadglassPillarTopLv5" : "assets/images/dreadglass_pillar_top_lv5.png",


            "lightningPillar" : "assets/images/lightning_pillar_icon.png",
            "lightningPillarTopLv1" : "assets/images/lightning_pillar_top_lv1.png",
            "lightningPillarTopLv2" : "assets/images/lightning_pillar_top_lv2.png",
            "lightningPillarTopLv3" : "assets/images/lightning_pillar_top_lv3.png",
            "lightningPillarTopLv4" : "assets/images/lightning_pillar_top_lv4.png",
            "lightningPillarTopLv5" : "assets/images/lightning_pillar_top_lv5.png",


            "ultimatePillar" : "assets/images/ultimate_pillar.png",
            "ultimatePillarLv2" : "assets/images/ultimate_pillar_lv2.png",
            "ultimatePillarTop" : "assets/images/ultimate_pillar_top.png",
            "ultimatePillarTopLv1" : "assets/images/ultimate_pillar_top_lv1.png",
            "ultimatePillarTopLv2" : "assets/images/ultimate_pillar_top_lv2.png"
        })

        Assets.addBundle("otherImages", {
            "mainTitle" : "assets/images/td_title.png",
            "mainTitleImage" : "assets/images/pillars_killers_title_pic.png",
            "mainTitleBackground" : "assets/images/main_menu_background.png",
            "chillbg": "assets/images/chill_bg.png",
            "normalbg": "assets/images/normal_bg.png",
            "killerthrillbg": "assets/images/killerthrill_bg.png",
            "victoryChill" : "assets/images/victory_chill.png",
            "victoryNormal" : "assets/images/victory_normal.png",
            "victoryKillerThrill" : "assets/images/victory_killersthrill.png",
            "gameoverGraveyard" : "assets/images/gameover_rip.png",
            "tutorial1" : "assets/images/tutorial_1.png",
            "tutorial2" : "assets/images/tutorial_2.png",
            "tutorial3" : "assets/images/tutorial_3.png",
            "tutorial4" : "assets/images/tutorial_4.png",
            "tutorial5" : "assets/images/tutorial_5.png",
            "tutorial6" : "assets/images/tutorial_6.png",
            "tutorial7" : "assets/images/tutorial_7.png"
        })

        Assets.addBundle("mapBackgroundImages", {
            "starryNight" : "assets/mapbg/starrynight_pvk.png",
            "mediumFrenchVanilla" : "assets/mapbg/Medium_French_Vanilla_pvk.jpg",
            "stairwellOChaos" : "assets/mapbg/stairwellochaos_pvk.png"
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

    async loadMapBackgroundImages() {
        this.mapBackgroundImages = await Assets.loadBundle("mapBackgroundImages")
    }

    async loadOtherImagesSprites() {
        this.otherImages = await Assets.loadBundle("otherImages")
    }



    async loadEnemySpriteSheets() {
        const enemyClasses = Object.keys(allEnemyData)

        enemyClasses.forEach(async enemyClass => {
            const atlasData = allEnemyData[enemyClass].atlasData
            const enemyInfo = allEnemyData[enemyClass].stats
            const spritesheet = new Spritesheet(Texture.from(atlasData.meta.image), atlasData)
            await spritesheet.parse()
            this.spriteSheetEnemies?.set(enemyInfo.className, spritesheet)
        })

        const atlasData = zappedAtlasData
        const spritesheet = new Spritesheet(Texture.from(atlasData.meta.image), atlasData)
        await spritesheet.parse()
        this.spriteSheetZapped = spritesheet
    }



}