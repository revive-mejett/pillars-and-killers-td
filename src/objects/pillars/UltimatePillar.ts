import { Tower } from "./Tower";
import * as PIXI from "pixi.js";
import { GameplayScene } from "src/scenes/GameplayScene";
import { IonBeam } from "../projectile/IonBeam";
import { EventDispatcher } from "../../utils/EventDispatcher";
import TowerData from "src/ts/types/TowerData";
import { UltimatePillarInfo } from "src/ts/interfaces/TowerInfo";
import { TowerStats } from "src/ts/interfaces/TowerStats";

const eventDispatcher = new EventDispatcher()

export class UltimatePillar extends Tower {
    towerName: string;
    beamWidth: number;
    beamColour: number;

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, towerData : TowerData<TowerStats, UltimatePillarInfo>) {
        super(x, y, width, height, towerData);
        this.towerName = "Ultimate Pillar"
        this.beamWidth = towerData.towerInfo.beamWidth
        this.beamColour = towerData.towerInfo.beamColour
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
                    const beam = new IonBeam(this.getCenterPosition().x, this.getCenterPosition().y, this.beamWidth, 5, this.targetedEnemy, this.damage, this.beamColour)
                    beam.render(gameplaySceneContainer)
                    beam.fire(gameplayScene.app.ticker.deltaTime)
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
        const newStats = this.upgrades[index]

        this.range = newStats.range
        this.damage = newStats.damage
        this.fireRate = newStats.fireRate
        this.cost += newStats.cost
        this.level++

        const newVisualStats = this.visualUpgrades[index] as UltimatePillarInfo
        this.tileColour = newVisualStats.tileColour
        this.beamWidth = newVisualStats.beamWidth
        this.beamColour = newVisualStats.beamColour
    }


}