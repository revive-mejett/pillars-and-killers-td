import { Text, TextStyle } from "pixi.js"
import { UIHelper } from "./UIHelper"
import { EventDispatcher } from "../utils/EventDispatcher"
import { AssetLoader } from "../core/AssetLoader"
import { InfoPanelHealthBar } from "./InfoPanelHealthBar"
import { Tower } from "src/objects/pillars/Tower"
import * as PIXI from "pixi.js";
import { Enemy } from "src/objects/killers/Enemy"
import { HUD } from "./HUD"
import TowerData from "src/ts/types/TowerData"
import { Wave } from "src/objects/Wave"
import { countEnemyQuantityInWave, formatMillionString } from "../utils/Calc"
import { allEnemyData } from "../utils/EnemyData"
import { IcePillar } from "../objects/pillars/IcePillar"
import { CyroBlastPillar } from "../objects/pillars/CyroBlastPillar"
import { PoisonIvyPillar } from "../objects/pillars/PoisonIvyPillar"
import { DreadglassPillar } from "../objects/pillars/DreadglassPillar"
import { EmberPillar } from "../objects/pillars/EmberPillar"
import { MissilePillar } from "../objects/pillars/MissilePillar"

const eventDispatcher = new EventDispatcher()
const assetLoader = new AssetLoader()
export class InfoPanel {

    static createTowerStatsInfoPanel(tower : Tower, sellValuePercentage: number) {

        if (!tower.upgrades) {
            throw new Error("Upgrades not provided")
        }

        if (!assetLoader.icons) {
            throw new Error("Assetloader icons is not defined - something went wrong")
        }

        const padding = 5
        const isUpgradable = tower.level <= tower.upgrades.length

        const infoPanel = new PIXI.Container()
        const infoPanelOutline = UIHelper.createInfoPanelOutline(0x00FF00)
        infoPanel.addChild(infoPanelOutline)

        if (tower.assetIcon) {
            const currentTowerIcon = UIHelper.createIcon(tower.assetIcon, padding, padding, 0x000000)
            currentTowerIcon.x = 165
            infoPanel.addChild(currentTowerIcon)
        }


        const towerTitleText = UIHelper.createText(0 + padding, 0 + padding,`${tower.towerName}`, 20, "0xFFFFFF")
        infoPanel.addChild(towerTitleText)
        const towerLevelText = UIHelper.createText(0 + padding, 30 + padding,`Lv. ${tower.level}`, 20, "0xC7C7FF")
        infoPanel.addChild(towerLevelText)
        const towerDamageText = UIHelper.createText(0 + padding, 50 + padding,`damage/shot: ${tower.damage}`, 20, "0xFFC7C7")
        infoPanel.addChild(towerDamageText)
        const towerRangeText = UIHelper.createText(0 + padding, 70 + padding,`range: ${tower.range}`, 20, "0xC7FFFF")
        infoPanel.addChild(towerRangeText)
        const towerFireRateText = UIHelper.createText(0 + padding, 90 + padding,`fire rate: ${tower.fireRate}`, 20, "0xFFC7FF")
        infoPanel.addChild(towerFireRateText)

        //if tower has splash radius
        if ((tower instanceof CyroBlastPillar || tower instanceof EmberPillar || tower instanceof MissilePillar) && tower.impactRadius > 0) {
            const splashRadiusText = UIHelper.createText(0 + padding, 110 + padding,`Splash radius: ${tower.impactRadius}`, 20, "0xFFE1C7")
            infoPanel.addChild(splashRadiusText)
        }


        //special properties start here
        let specialPropertyYpos = 130
        const textYOffset = 10
        if (tower instanceof IcePillar || tower instanceof CyroBlastPillar) {
            const snailIcon = UIHelper.createIcon(assetLoader.icons.slowed, padding, specialPropertyYpos + padding, 0x000000, 40, 40)
            infoPanel.addChild(snailIcon)
            const speedMultiplierText = UIHelper.createText(40 + padding, specialPropertyYpos + padding + textYOffset,`Speed (x${tower.speedMultiplier})`, 20, "0xA9A9FF")
            infoPanel.addChild(speedMultiplierText)
            specialPropertyYpos += 40
        }
        if (tower instanceof PoisonIvyPillar) {
            const oakIcon = UIHelper.createIcon(assetLoader.icons.poisonIved, padding, specialPropertyYpos + padding, 0x000000, 40, 40)
            infoPanel.addChild(oakIcon)
            const extraDamageText = UIHelper.createText(40 + padding, specialPropertyYpos + padding + textYOffset,`Extra damage (+${tower.extraDamage})`, 20, "0xA9FF00")
            infoPanel.addChild(extraDamageText)
            specialPropertyYpos += 40
        }
        if (tower instanceof DreadglassPillar) {
            const dreadglassIcon = UIHelper.createIcon(assetLoader.icons.dreadglass, padding, specialPropertyYpos + padding, 0x000000, 40, 40)
            infoPanel.addChild(dreadglassIcon)
            const resistanceReductionText = UIHelper.createText(40 + padding, specialPropertyYpos + padding + textYOffset,`Resistance loss (-${tower.armourReduction})`, 20, "0xC70077")
            infoPanel.addChild(resistanceReductionText)
            specialPropertyYpos += 40
        }

        const sellValue = Math.floor(tower.cost * sellValuePercentage/100)



        //special targeting section
        const targetingContainerYPos = 210

        const txtTogglePrevTargeting = UIHelper.createText(0 + padding, targetingContainerYPos + padding,"< Q", 20, "0x00FFFF")
        infoPanel.addChild(txtTogglePrevTargeting)

        const txtToggleNextTargeting = UIHelper.createText(200 + padding, targetingContainerYPos + padding,"E >", 20, "0x00FFFF")
        infoPanel.addChild(txtToggleNextTargeting)

        const currentTargetingContainer = new PIXI.Container()
        currentTargetingContainer.x = 30 + padding
        currentTargetingContainer.y = targetingContainerYPos + padding

        infoPanel.addChild(currentTargetingContainer)
        currentTargetingContainer.width = 500
        const background = new PIXI.Graphics()
        background.beginFill(0x000000)
        background.drawRect(0,0,170,20)
        background.endFill()
        background.alpha = 0
        currentTargetingContainer.addChild(background)

        const txtCurrentTargeting = new Text(`Target: ${tower.targetingStrategies[tower.currentTargetingIndex]}`, new TextStyle({ fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFFFF, align: "center" }))
        txtCurrentTargeting.x = (currentTargetingContainer.width - txtCurrentTargeting.width) / 2;
        txtCurrentTargeting.y = (currentTargetingContainer.height - txtCurrentTargeting.height) / 2;
        currentTargetingContainer.addChild(txtCurrentTargeting)

        //upgrade/sell btns
        if (isUpgradable) {
            const upgradeButton = UIHelper.createButton(0 + padding, 250 - padding, 110, 50, `Upgrade\n$${isUpgradable ? tower.upgrades[tower.level - 1].cost : "N/A"}`, 20, 0xFFFF00)
            infoPanel.addChild(upgradeButton)
            //register event listener on upgrade btn
            upgradeButton.on("pointerdown", () => {
                if (isUpgradable) {
                    eventDispatcher.fireEvent("towerUpgradeAction", tower.tile)
                }
            })
        }


        const sellButton = UIHelper.createButton(0 + padding + 120 + padding, 250 - padding, 110, 50, `Sell\n$${sellValue}`, 20, 0x888888)
        infoPanel.addChild(sellButton)

        //register event listener on sell btn
        sellButton.on("pointerdown", () => {
            tower.tile?.sellTower()
            eventDispatcher.fireEvent("towerSellAction")
        })



        return infoPanel
    }


    static createTowerGeneralInfoPanel(towerData : TowerData) {
        const infoPanel = new PIXI.Container()
        const infoPanelOutline = UIHelper.createInfoPanelOutline(0x000077)
        infoPanel.addChild(infoPanelOutline)

        const padding = 5

        if (!towerData.towerInfo.info) {
            throw new Error("No info provided in tower stats")
        }


        const currentTowerIcon = UIHelper.createIcon(towerData.towerInfo.assetIcon, padding, padding, 0X000000)
        infoPanel.addChild(currentTowerIcon)
        const towerNameText = new Text(towerData.towerInfo.info.title, new TextStyle({ fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFFFF, align: "center" }))
        towerNameText.x = 90 + padding
        towerNameText.y = 0 + padding
        infoPanel.addChild(towerNameText)
        const towerPriceText = new Text(`$${towerData.towerStats.cost}`, new TextStyle({ fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFF00, align: "center", wordWrap: true, wordWrapWidth: 1000 * 0.25 }))
        towerPriceText.x = 90 + padding
        towerPriceText.y = 40 + padding
        infoPanel.addChild(towerPriceText)
        const towerDescriptionText = new Text(towerData.towerInfo.info.description, new TextStyle({ fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFFFF, align: "center", wordWrap: true, wordWrapWidth: infoPanel.width * 0.95 }))
        towerDescriptionText.x = padding
        towerDescriptionText.y = 100
        infoPanel.addChild(towerDescriptionText)

        return infoPanel
    }

    static createWaveInfoPanel(waveNumber: number, wave: Wave, waveTextColour: string = "0XFFFFFF") {
        const infoPanel = new PIXI.Container()
        const infoPanelOutline = UIHelper.createInfoPanelOutline(0xFF7700)
        infoPanel.addChild(infoPanelOutline)
        const padding = 5

        if (!wave) {
            throw new Error("Wave invalid")
        }

        const txtWaveNumber = UIHelper.createText(padding, padding,`Wave ${waveNumber}`, 30, waveTextColour)
        infoPanel.addChild(txtWaveNumber)

        let enemiesCount = Array.from(countEnemyQuantityInWave(wave))
        enemiesCount = enemiesCount.sort((enemy1, enemy2) => allEnemyData[enemy2[0]].stats.health - allEnemyData[enemy1[0]].stats.health)

        //create enemy icons and their quantities
        const maxListSize = 4
        const textXPad = 55
        let textYpad = 30
        const textYOffset = 20
        enemiesCount.forEach((enemyCount, i) => {
            if (i < maxListSize) {
                const spritesheet = assetLoader.spriteSheetEnemies?.get(enemyCount[0])
                if (!spritesheet) {
                    return
                }
                const enemyIcon = UIHelper.createAnimatedIcon(spritesheet, padding, padding + textYpad, 0x000000, 50, 50, 0.02, true)
                const enemyQuantityText = UIHelper.createText(textXPad + padding, padding + textYpad,`(x${enemyCount[1]})`, 20, "0xFFFF00")
                infoPanel.addChild(enemyQuantityText)
                const enemyText = UIHelper.createText(textXPad + padding, padding + textYpad + textYOffset,`${enemyCount[0]}`, 15, "0xFF8888")
                infoPanel.addChild(enemyText)
                infoPanel.addChild(enemyIcon)
                textYpad += 55

            }
        })

        return infoPanel
    }


    static createEnemyStatsInfoPanel(enemy : Enemy, hud : HUD, updateTicker : PIXI.Ticker, killBountyMultiplier: number) {

        if (!assetLoader.icons) {
            throw new Error("Assetloader icons is not defined - something went wrong")
        }


        const padding = 5

        const infoPanel = new PIXI.Container()
        const infoPanelOutline = UIHelper.createInfoPanelOutline(0xFF0000)
        infoPanel.addChild(infoPanelOutline)

        const currentEnemyIcon = UIHelper.createAnimatedIcon(enemy.spritesheet, padding, padding, 0x000000, 80, 80, enemy.animationSpeed)
        infoPanel.addChild(currentEnemyIcon)
        currentEnemyIcon.x = 165

        const enemyNickText = UIHelper.createText(0 + padding, 5 + padding,`${enemy.nick}`, 20, "0xFFFFFF")
        infoPanel.addChild(enemyNickText)

        const enemyClassText = UIHelper.createText(0 + padding, 30 + padding,`${enemy.enemyClassName}`, 13, "0xA7A7A7")
        infoPanel.addChild(enemyClassText)


        const heartIcon = UIHelper.createIcon(assetLoader.icons.heart, padding, 70 + padding, 0x000000, 40, 40)
        infoPanel.addChild(heartIcon)
        const enemyHealthText = UIHelper.createText(40 + padding, 80 + padding,`${enemy.health} / ${enemy.totalHealth}`, 20, "FFFFFF")
        infoPanel.addChild(enemyHealthText)

        const dmgResistanceIcon = UIHelper.createIcon(assetLoader.icons.dmgResistance, 100 + padding, 110 + padding, 0x000000, 40, 40)
        infoPanel.addChild(dmgResistanceIcon)
        const dmgResistanceText = UIHelper.createText(140 + padding, 120 + padding,`${enemy.armour}`, 20, "0x9955FF")
        infoPanel.addChild(dmgResistanceText)

        const speedIcon = UIHelper.createIcon(assetLoader.icons.speedArrow, padding, 110 + padding, 0x000000, 40, 40)
        infoPanel.addChild(speedIcon)
        const enemySpeedText = UIHelper.createText(40 + padding, 120 + padding,`${enemy.speed}`, 20, "0xFFFFFF")
        infoPanel.addChild(enemySpeedText)

        const damageIcon = UIHelper.createIcon(assetLoader.icons.lives, padding, 150 + padding, 0x000000, 40, 40)
        infoPanel.addChild(damageIcon)
        const damageText = UIHelper.createText(40 + padding, 160 + padding,`${enemy.damage}`, 20, "0xFF0000")
        infoPanel.addChild(damageText)

        const killValueIcon = UIHelper.createIcon(assetLoader.icons.money, 100 + padding, 150 + padding, 0x000000, 40, 40)
        infoPanel.addChild(killValueIcon)
        const killValueText = UIHelper.createText(140 + padding, 160 + padding,`${Math.ceil(enemy.killValue * killBountyMultiplier) >= 1_000_000 ? formatMillionString(Math.ceil(enemy.killValue * killBountyMultiplier)) : Math.ceil(enemy.killValue * killBountyMultiplier)}`, 20, "0xFFFF00")
        infoPanel.addChild(killValueText)

        const slowedIndicator = UIHelper.createIcon(assetLoader.icons.slowed, 200 + padding, 200 + padding, 0x000000, 40, 40)
        infoPanel.addChild(slowedIndicator)
        slowedIndicator.visible = false

        const poisonIvedIndicator = UIHelper.createIcon(assetLoader.icons.poisonIved, 200 + padding, 200 + padding + 40, 0x000000, 40, 40)
        infoPanel.addChild(poisonIvedIndicator)
        poisonIvedIndicator.visible = false


        const healthBar = new InfoPanelHealthBar(45, 110, 200, 5, enemy)

        //special properties start here
        let specialPropertyYpos = 190
        const textYOffset = 10
        if (enemy.slowImmune) {
            const slowImmuneIcon = UIHelper.createIcon(assetLoader.icons.slowImmune, padding, specialPropertyYpos + padding, 0x000000, 40, 40)
            infoPanel.addChild(slowImmuneIcon)
            const speedMultiplierText = UIHelper.createText(40 + padding, specialPropertyYpos + padding + textYOffset,"Immune to Slow", 20, "0x0055FF")
            infoPanel.addChild(speedMultiplierText)
            specialPropertyYpos += 40
        }
        if (enemy.regen) {
            const regenIcon = UIHelper.createIcon(assetLoader.icons.regenerating, padding, specialPropertyYpos + padding, 0x000000, 40, 40)
            infoPanel.addChild(regenIcon)
            const regenText = UIHelper.createText(40 + padding, specialPropertyYpos + padding + textYOffset,`Regen: ${enemy.regen.amount}`, 20, "0x00FF00")
            infoPanel.addChild(regenText)
            specialPropertyYpos += 40
        }
        if (enemy.enemyType === "EMP" && (enemy.enemyClassName === "12p 2028" || enemy.enemyClassName === "256p 2152" || enemy.enemyClassName === "2^1024p 137632")) {
            const disablesPillarsIcon = UIHelper.createIcon(assetLoader.icons.disablesPillars, padding, specialPropertyYpos + padding, 0x000000, 40, 40)
            infoPanel.addChild(disablesPillarsIcon)
            const dreadglassResistText = UIHelper.createText(40 + padding, specialPropertyYpos + padding + textYOffset,"Disables Pillars", 20, "0x00FFFF")
            infoPanel.addChild(dreadglassResistText)
            specialPropertyYpos += 40
        }
        if (enemy.enemyType === "Boss") {
            const dreadglassResistantIcon = UIHelper.createIcon(assetLoader.icons.dreadglassResistant, padding, specialPropertyYpos + padding, 0x000000, 40, 40)
            infoPanel.addChild(dreadglassResistantIcon)
            const dreadglassResistText = UIHelper.createText(40 + padding, specialPropertyYpos + padding + textYOffset,"Resists Dreadglass", 20, "0xFF00FF")
            infoPanel.addChild(dreadglassResistText)
            specialPropertyYpos += 40
        }
        //special property that TON 618 has
        if (enemy.enemyClassName === "TON 618") {
            const armourIcon = UIHelper.createIcon(assetLoader.icons.dmgResistance, padding, specialPropertyYpos + padding, 0x000000, 40, 40)
            infoPanel.addChild(armourIcon)
            const minArmourText = UIHelper.createText(40 + padding, specialPropertyYpos + padding + textYOffset,"Minimum: 10000", 20, "0xFF00FF")
            infoPanel.addChild(minArmourText)
            specialPropertyYpos += 40
        }

        const onTick = () => {
            if (!enemy.isAlive) {
                healthBar.deleteBar()
                updateTicker.stop()
                hud.clearInfoPanel()
            }
            const speedTxt = enemySpeedText.children[0] as PIXI.Text
            UIHelper.updateText(enemyHealthText.children[0] as PIXI.Text, `${enemy.health} / ${enemy.totalHealth}`)
            UIHelper.updateText(dmgResistanceText.children[0] as PIXI.Text, `${enemy.armour}`)
            UIHelper.updateText(speedTxt, `${(enemy.speed * enemy.slowDebuffStats.speedMultiplier).toFixed(2)}`)
            speedTxt.style.fill = enemy.slowDebuffStats.timeLeft > 0 ? 0x7777FF : 0xFFFFFF

            slowedIndicator.visible = enemy.slowDebuffStats.timeLeft > 0
            poisonIvedIndicator.visible = enemy.vulnerableDebuffStats.timeLeft > 0
            healthBar.renderBar(infoPanel)
        }

        updateTicker.add(onTick)

        updateTicker.start()


        return infoPanel
    }
}

