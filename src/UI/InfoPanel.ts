import { Text, TextStyle } from "pixi.js"
import { UIHelper } from "./UIHelper"
import { EventDispatcher } from "../utils/EventDispatcher"
import { AssetLoader } from "../core/AssetLoader"
import { InfoPanelHealthBar } from "./InfoPanelHealthBar"
import { Tower } from "src/objects/pillars/Tower"
import * as PIXI from "pixi.js";
import TowerStats from "src/ts/types/TowerStats"
import { Enemy } from "src/objects/Enemy"
import { HUD } from "./HUD"

const eventDispatcher = new EventDispatcher()
const assetLoader = new AssetLoader()
export class InfoPanel {

    static createTowerStatsInfoPanel(tower : Tower) {
        const padding = 5

        const infoPanel = new PIXI.Container()
        const infoPanelOutline = UIHelper.createInfoPanelOutline(0x00FF00)
        infoPanel.addChild(infoPanelOutline)

        const currentTowerIcon = UIHelper.createIcon(tower.assetIcon, padding, padding, 0x000000)
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

        const sellValuePercentage = 60
        const sellValue = Math.floor(tower.cost * sellValuePercentage/100)

        const sellValueText = UIHelper.createText(0 + padding, 230 + padding,`sell value: $${sellValue}`, 20, "0x777777")
        infoPanel.addChild(sellValueText)

        //upgrade/sell btns
        const upgradeButton = UIHelper.createButton(0 + padding, 190, 150, 30, "Upgrade", 20, 0x33FF33)
        infoPanel.addChild(upgradeButton)
        const sellButton = UIHelper.createButton(80 + padding, 260, 150, 30, "Sell", 20, 0xFF3333)
        infoPanel.addChild(sellButton)


        //register event listener on sell btn
        sellButton.on("pointerdown", () => {
            tower.tile?.sellTower()
            eventDispatcher.fireEvent("towerSellAction")
        })

        return infoPanel
    }


    static createTowerGeneralInfoPanel(towerStats : TowerStats) {
        const infoPanel = new PIXI.Container()
        const infoPanelOutline = UIHelper.createInfoPanelOutline(0x000077)
        infoPanel.addChild(infoPanelOutline)

        const padding = 5

        if (!towerStats.info) {
            throw new Error("No info provided in tower stats")
        }


        const currentTowerIcon = UIHelper.createIcon(towerStats.assetIcon, padding, padding, 0X000000)
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


    static createEnemyStatsInfoPanel(enemy : Enemy, hud : HUD, updateTicker : PIXI.Ticker) {

        if (!assetLoader.icons) {
            throw new Error("Assetloader icons is not defined - something went wrong")
        }


        const padding = 5

        const infoPanel = new PIXI.Container()
        const infoPanelOutline = UIHelper.createInfoPanelOutline(0xFF0000)
        infoPanel.addChild(infoPanelOutline)

        const currentEnemyIcon = UIHelper.createIcon(enemy.asset, padding, padding, 0x000000)
        infoPanel.addChild(currentEnemyIcon)
        currentEnemyIcon.x = 160

        const enemyNickText = UIHelper.createText(0 + padding, 5 + padding,`${enemy.nick}`, 20, "0xFFFFFF")
        infoPanel.addChild(enemyNickText)


        const heartIcon = UIHelper.createIcon(assetLoader.icons.heart, padding, 70 + padding, 0x000000, 40, 40)
        infoPanel.addChild(heartIcon)
        const enemyHealthText = UIHelper.createText(40 + padding, 80 + padding,`${enemy.health} / ${enemy.totalHealth}`, 20, "FFFFFF")
        infoPanel.addChild(enemyHealthText)

        const speedIcon = UIHelper.createIcon(assetLoader.icons.speedArrow, padding, 110 + padding, 0x000000, 40, 40)
        infoPanel.addChild(speedIcon)
        const enemySpeedText = UIHelper.createText(40 + padding, 120 + padding,`${enemy.speed}`, 20, "0xFFFFFF")
        infoPanel.addChild(enemySpeedText)

        const damageIcon = UIHelper.createIcon(assetLoader.icons.lives, padding, 150 + padding, 0x000000, 40, 40)
        infoPanel.addChild(damageIcon)
        const damageText = UIHelper.createText(40 + padding, 160 + padding,`${enemy.damage}`, 20, "0xFF0000")
        infoPanel.addChild(damageText)

        const killValueIcon = UIHelper.createIcon(assetLoader.icons.money, padding, 190 + padding, 0x000000, 40, 40)
        infoPanel.addChild(killValueIcon)
        const killValueText = UIHelper.createText(40 + padding, 200 + padding,`${enemy.killValue}`, 20, "0xFFFF00")
        infoPanel.addChild(killValueText)

        const slowedIndicator = UIHelper.createIcon(assetLoader.icons.slowed, padding, 250 + padding, 0x000000, 40, 40)
        infoPanel.addChild(slowedIndicator)
        slowedIndicator.visible = false


        const healthBar = new InfoPanelHealthBar(40, 110, 200, 5, enemy)

        const onTick = () => {
            if (!enemy.isAlive) {
                healthBar.deleteBar()
                updateTicker.stop()
                hud.clearInfoPanel()
            }
            UIHelper.updateText(enemyHealthText.children[0] as PIXI.Text, `${enemy.health} / ${enemy.totalHealth}`)
            slowedIndicator.visible = enemy.slowDebuffStats.timeLeft > 0
            healthBar.renderBar(infoPanel)
        }

        updateTicker.add(onTick)

        updateTicker.start()


        return infoPanel
    }
}
