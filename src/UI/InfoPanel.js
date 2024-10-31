import { AssetLoader } from "../core/AssetLoader.js"

const assetLoader = new AssetLoader()

export class InfoPanel {
    /**
     *
     */
    constructor() {
    }


    createTowerStatsInfoPanel(towerstats) {

    }

    createTowerGeneralInfoPanel(towerStats) {
        /*

        {
                    assetIcon: towerIcons.basicPillarIcon,
                    asset: towerIcons.basicPillarTop,
                    info: {
                        title: "Basic Pillar",
                        description: "Cheap pillar good against weak killers. Decent hand pick for the early rounds."
                    },
                    range: 150,
                    damage: 10,
                    fireRate: 1,
                    cost: 50
                }
        
        */

        const infoPanel = new PIXI.Container()
        infoPanel.x = 1
        infoPanel.y = 600

        const infoPanelOutline = new PIXI.Graphics()
        infoPanelOutline.lineStyle(3, 0x000077)
        infoPanelOutline.drawRect(0, 0, 1000 * 0.25, 300)
        infoPanel.addChild(infoPanelOutline)

        const padding = 5

        const currentTowerIcon = createTowerIcon(towerStats.assetIcon, padding, padding)
        infoPanel.addChild(currentTowerIcon)
        const towerNameText = new Text(towerStats.info.title, new TextStyle({ fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFFFF, align: "center" }))
        towerNameText.x = 90 + padding
        towerNameText.y = 0 + padding
        infoPanel.addChild(towerNameText)
        const towerPriceText = new Text("$220", new TextStyle({ fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFF00, align: "center", wordWrap: true, wordWrapWidth: 1000 * 0.25 }))
        towerPriceText.x = 90 + padding
        towerPriceText.y = 40 + padding
        infoPanel.addChild(towerPriceText)
        const towerDescriptionText = new Text("Cheap pillar for weak killers. Decent hand pick for the early rounds", new TextStyle({ fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFFFF, align: "center", wordWrap: true, wordWrapWidth: this.towerInfoPanel.width * 0.95 }))
        towerDescriptionText.x = padding
        towerDescriptionText.y = 100
        infoPanel.addChild(towerDescriptionText)
    }
}

