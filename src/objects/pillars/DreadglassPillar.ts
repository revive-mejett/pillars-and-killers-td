import { Tower } from "./Tower";
import { GameplayScene } from "src/scenes/GameplayScene";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../../utils/EventDispatcher";
import TowerData from "src/ts/types/TowerData";
import { DreadglassPillarStats } from "src/ts/interfaces/TowerStats";
import { DreadglassPillarInfo } from "src/ts/interfaces/TowerInfo";
import { Dreadglass } from "../projectile/Dreadglass";

const eventDispatcher = new EventDispatcher()

export class DreadglassPillar extends Tower {
    towerName: string
    bulletSize: number
    bulletColour: number
    soundPitch: number
    armourReduction: number

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, towerData : TowerData<DreadglassPillarStats, DreadglassPillarInfo>) {
        super(x, y, width, height, towerData);
        this.towerName = "Dreadglass Pillar"
        this.bulletSize = towerData.towerInfo.bulletSize
        this.bulletColour = towerData.towerInfo.bulletColour
        this.soundPitch = towerData.towerInfo.soundPitch
        this.armourReduction = towerData.towerStats.armourReduction
    }

    runTower(gameplayScene : GameplayScene) {

        const gameplaySceneContainer = gameplayScene.mapContainer


        let towerFireCycleTicker : PIXI.Ticker | undefined = new PIXI.Ticker()
        towerFireCycleTicker.autoStart = false


        let cooldown = 0

        //spawns an enemy
        const onTick = () => {

            if (this.isSold) {
                towerFireCycleTicker?.stop()
                towerFireCycleTicker?.destroy()
                towerFireCycleTicker = undefined
            }

            if (towerFireCycleTicker) {
                this.tickDisabled(towerFireCycleTicker)
            }

            cooldown -= towerFireCycleTicker?.deltaMS || 0
            if (cooldown <= 0) {
                cooldown = 1000 * 1/this.fireRate

                //disabled towers cant attack
                if (this.disabledCooldown > 0) {
                    return
                }

                // Find the best enemy before firing
                this.findEnemy(gameplayScene.enemiesPresent);
                if (!this.targetedEnemy) {
                    cooldown = 0 //reset cooldown
                    return
                }

                if (!this.targetedEnemy.isAlive) {
                    this.targetedEnemy = undefined
                    cooldown = 0 //reset cooldown
                    return
                }

                //check if enemy is no longer in range
                if (!this.checkEnemyInRange(this.targetedEnemy)) {
                    this.targetedEnemy = undefined
                    cooldown = 0 //reset cooldown
                    return
                }

                //spawn a bullet
                const dreadglass = new Dreadglass(this.getCenterPosition().x, this.getCenterPosition().y, this.bulletSize, this.bulletSize, this.targetedEnemy, this.damage, 4, this.bulletColour, this.armourReduction, this.soundPitch)
                dreadglass.render(gameplaySceneContainer)
                dreadglass.fire(gameplayScene.app.ticker.deltaTime)
            }
        }

        towerFireCycleTicker.add(onTick)
        towerFireCycleTicker.start()

        eventDispatcher.on("gameEnd", () => {
            towerFireCycleTicker?.stop()
            towerFireCycleTicker?.destroy()
            towerFireCycleTicker = undefined
        })
    }


    upgrade(): void {
        if (!this.upgrades || !this.visualUpgrades) {
            return
        }
        if (this.level > this.upgrades.length) {
            return
        }
        const index = this.level - 1
        const newStats = this.upgrades[index] as DreadglassPillarStats

        this.range = newStats.range
        this.damage = newStats.damage
        this.fireRate = newStats.fireRate
        this.armourReduction = newStats.armourReduction
        this.cost += newStats.cost

        this.level++

        const newVisualStats = this.visualUpgrades[index] as DreadglassPillarInfo
        this.tileColour = newVisualStats.tileColour
        this.bulletSize = newVisualStats.bulletSize
        this.bulletColour = newVisualStats.bulletColour
        this.soundPitch = newVisualStats.soundPitch;

        if (newVisualStats.asset) {
            this.asset = newVisualStats.asset
            this.sprite = PIXI.Sprite.from(this.asset)
            this.sprite.height = this.height
            this.sprite.width = this.width
            this.sprite.x = this.position?.x || 0
            this.sprite.y = this.position?.y || 0
        }
    }

}