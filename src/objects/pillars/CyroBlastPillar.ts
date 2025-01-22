import { Tower } from "./Tower";
import * as PIXI from "pixi.js";
import { GameplayScene } from "src/scenes/GameplayScene";
import { EventDispatcher } from "../../utils/EventDispatcher";
import TowerData from "src/ts/types/TowerData";
import { CyroPillarStats } from "src/ts/interfaces/TowerStats";
import { CyroPillarInfo } from "src/ts/interfaces/TowerInfo";
import { CyroBeam } from "../projectile/CyroBeam";

const eventDispatcher = new EventDispatcher()

export class CyroBlastPillar extends Tower {

    towerName: string;
    speedMultiplier: number;
    beamWidth: number;
    soundPitch: number;
    impactRadius: number;


    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, towerData : TowerData<CyroPillarStats, CyroPillarInfo>) {
        super(x, y, width, height, towerData);
        this.towerName = "Cyro Blast Pillar"
        this.speedMultiplier = towerData.towerStats.speedMultiplier
        this.impactRadius = towerData.towerStats.impactRadius
        this.beamWidth = towerData.towerInfo.beamWidth
        this.soundPitch = towerData.towerInfo.soundPitch
    }

    runTower(gameplayScene : GameplayScene) : void {
        const gameplaySceneContainer = gameplayScene.mapContainer

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const towerRef = this

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
                if (!towerRef.targetedEnemy) {
                    cooldown = 0 //reset cooldown
                    return
                }

                if (!towerRef.targetedEnemy.isAlive) {
                    this.targetedEnemy = undefined
                    cooldown = 0 //reset cooldown
                    return
                }

                //check if enemy is no longer in range
                if (!this.checkEnemyInRange(towerRef.targetedEnemy)) {
                    this.targetedEnemy = undefined
                    cooldown = 0 //reset cooldown
                    return
                }

                //spawn a beam
                if (this.targetedEnemy) {
                    const beam = new CyroBeam(this.getCenterPosition().x, this.getCenterPosition().y, 5, 5, this.targetedEnemy, this.damage, this.speedMultiplier, 0xC7C7FF, this.beamWidth, this.soundPitch, this.impactRadius)
                    beam.render(gameplaySceneContainer)
                    beam.fire(gameplayScene.app.ticker.deltaTime, gameplayScene.enemiesPresent)
                }

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
        const newStats = this.upgrades[index] as CyroPillarStats

        this.range = newStats.range
        this.damage = newStats.damage
        this.fireRate = newStats.fireRate
        this.cost += newStats.cost
        this.speedMultiplier = newStats.speedMultiplier
        this.impactRadius = newStats.impactRadius
        this.level++

        const newVisualStats = this.visualUpgrades[index] as CyroPillarInfo
        this.tileColour = newVisualStats.tileColour
        this.beamWidth = newVisualStats.beamWidth
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