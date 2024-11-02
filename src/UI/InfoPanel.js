import { Text, TextStyle } from "pixi.js"
import { UIHelper } from "./UIHelper.js"


export class InfoPanel {

    static createTowerStatsInfoPanel(tower) {
        const padding = 5

        const infoPanel = new PIXI.Container()
        const infoPanelOutline = UIHelper.createInfoPanelOutline(0x00FF00)
        infoPanel.addChild(infoPanelOutline)

        const currentTowerIcon = UIHelper.createTowerIcon(tower.assetIcon, padding, padding)
        currentTowerIcon.x = 160

        infoPanel.addChild(currentTowerIcon)

        const towerTitleText = UIHelper.createText(0 + padding, 0 + padding,`${tower.towerName}`, 20, "0xFFFFFF")
        infoPanel.addChild(towerTitleText)
        const towerLevelText = UIHelper.createText(0 + padding, 50 + padding,`Lv. ${tower.level}`, 20, "0xC7C7FF")
        infoPanel.addChild(towerLevelText)
        const towerDamageText = UIHelper.createText(0 + padding, 70 + padding,`damage/shot: ${tower.damage}`, 20, "0xFFC7C7")
        infoPanel.addChild(towerDamageText)
        const towerRangeText = UIHelper.createText(0 + padding, 90 + padding,`range: ${tower.range}`, 20, "0xC7FFFF")
        infoPanel.addChild(towerRangeText)
        const towerFireRateText = UIHelper.createText(0 + padding, 110 + padding,`fire rate: ${tower.fireRate}`, 20, "0xFFC7FF")
        infoPanel.addChild(towerFireRateText)


        const upgradeCostText = UIHelper.createText(0 + padding, 160 + padding,`upgrade cost: $9999999${padding}`, 20, "0xFFFF00")
        infoPanel.addChild(upgradeCostText)

        const sellValueText = UIHelper.createText(0 + padding, 230 + padding,`sell value: $9999999${padding}`, 20, "0x777777")
        infoPanel.addChild(sellValueText)

        //upgrade/sell btns
        const upgradeButton = UIHelper.createButton(0 + padding, 190, 150, 30, "Upgrade", 20, "0x33FF33")
        infoPanel.addChild(upgradeButton)
        const sellButton = UIHelper.createButton(80 + padding, 260, 150, 30, "Sell", 20, "0xFF3333")
        infoPanel.addChild(sellButton)

        return infoPanel
    }


    static createTowerGeneralInfoPanel(towerStats) {
        const infoPanel = new PIXI.Container()
        const infoPanelOutline = UIHelper.createInfoPanelOutline(0x000077)
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

