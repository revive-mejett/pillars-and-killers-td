import { Text, TextStyle } from "pixi.js"
import { AssetLoader } from "../core/AssetLoader.js"
import { UIHelper } from "./UIHelper.js"

const assetLoader = new AssetLoader()

export class InfoPanel {
    /**
     *
     */
    constructor() {
    }


    createTowerStatsInfoPanel(towerstats) {

    }

    static createTowerGeneralInfoPanel(towerStats) {
        const infoPanel = new PIXI.Container()
        infoPanel.x = 0
        infoPanel.y = 0

        const infoPanelOutline = new PIXI.Graphics()
        // infoPanelOutline.lineStyle(3, 0x000077)
        infoPanelOutline.lineStyle(3, 0xFF0000)
        infoPanelOutline.drawRect(0, 0, 1000 * 0.25, 300)
        infoPanel.addChild(infoPanelOutline)

        const padding = 5


        const currentTowerIcon = UIHelper.createTowerIcon(towerStats.assetIcon, padding, padding)
        infoPanel.addChild(currentTowerIcon)
        const towerNameText = new Text(towerStats.info.title, new TextStyle({ fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFFFF, align: "center" }))
        towerNameText.x = 90 + padding
        towerNameText.y = 0 + padding
        infoPanel.addChild(towerNameText)
        const towerPriceText = new Text(`$${towerStats.cost}`, new TextStyle({ fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFF00, align: "center", wordWrap: true, wordWrapWidth: 1000 * 0.25 }))
        towerPriceText.x = 90 + padding
        towerPriceText.y = 40 + padding
        infoPanel.addChild(towerPriceText)
        const towerDescriptionText = new Text(towerStats.info.description, new TextStyle({ fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFFFF, align: "center", wordWrap: true, wordWrapWidth: infoPanel.width * 0.95 }))
        towerDescriptionText.x = padding
        towerDescriptionText.y = 100
        infoPanel.addChild(towerDescriptionText)

        return infoPanel
    }
}

