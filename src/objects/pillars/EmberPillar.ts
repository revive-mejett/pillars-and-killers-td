import { Tower } from "./Tower";
import { Fireball } from "../projectile/Fireball";
import { GameplayScene } from "src/scenes/GameplayScene";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../../utils/EventDispatcher";
import TowerData from "src/ts/types/TowerData";
import { EmberPillarInfo } from "src/ts/interfaces/TowerInfo";
import { EmberPillarStats } from "src/ts/interfaces/TowerStats";

const eventDispatcher = new EventDispatcher()

export class EmberPillar extends Tower {

    towerName: string;
    fireballWidth: number;
    flameColour: number;
    soundPitch: number;
    impactRadius: number;
    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, towerData : TowerData<EmberPillarStats, EmberPillarInfo>) {
        super(x, y, width, height, towerData);
        this.towerName = "Ember Pillar"
        this.fireballWidth = towerData.towerInfo.fireballWidth
        this.flameColour = towerData.towerInfo.flameColour
        this.soundPitch = towerData.towerInfo.soundPitch
        this.impactRadius = towerData.towerStats.impactRadius
    }

    runTower(gameplayScene : GameplayScene) : void {

        const gameplaySceneContainer = gameplayScene.mapContainer


        let towerFireCycleTicker : PIXI.Ticker | undefined = new PIXI.Ticker()
        towerFireCycleTicker.autoStart = false


        let cooldown = 0

        //spawns an enemy
        const onTick = () => {

            if (this.isSold) {
                console.log("tower sold, sitkcer stop fire")
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
                const bullet = new Fireball(this.getCenterPosition().x, this.getCenterPosition().y, this.fireballWidth, this.fireballWidth, this.targetedEnemy, this.damage, this.flameColour, this.soundPitch, this.impactRadius)
                bullet.render(gameplaySceneContainer)
                bullet.fire(gameplayScene.app.ticker.deltaTime, gameplayScene.enemiesPresent)

                eventDispatcher.on("gameEnd", () => {
                    towerFireCycleTicker?.stop()
                    // towerFireCycleTicker?.destroy() // cause error
                })
            }
        }

        towerFireCycleTicker.add(onTick)
        towerFireCycleTicker.start()
    }

    upgrade(): void {
        if (!this.upgrades || !this.visualUpgrades) {
            return
        }
        if (this.level > this.upgrades.length) {
            return
        }
        const index = this.level - 1
        const newStats = this.upgrades[index] as EmberPillarStats

        this.range = newStats.range
        this.damage = newStats.damage
        this.fireRate = newStats.fireRate
        this.cost += newStats.cost
        this.impactRadius = newStats.impactRadius
        this.level++

        const newVisualStats = this.visualUpgrades[index] as EmberPillarInfo
        this.tileColour = newVisualStats.tileColour
        this.flameColour = newVisualStats.flameColour
        this.fireballWidth = newVisualStats.fireballWidth
        this.soundPitch = newVisualStats.soundPitch

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