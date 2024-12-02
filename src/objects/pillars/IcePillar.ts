import { Beam } from "../projectile/Beam";
import { Tower } from "./Tower";
import * as PIXI from "pixi.js";
import { GameplayScene } from "src/scenes/GameplayScene";
import { EventDispatcher } from "../../utils/EventDispatcher";
import TowerData from "src/ts/types/TowerData";
import { IcePillarStats } from "src/ts/interfaces/TowerStats";
import { IcePillarInfo } from "src/ts/interfaces/TowerInfo";

const eventDispatcher = new EventDispatcher()

export class IcePillar extends Tower {

    towerName: string;
    speedMultiplier: number;
    beamWidth: number;


    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, towerData : TowerData<IcePillarStats, IcePillarInfo>) {
        super(x, y, width, height, towerData);
        this.towerName = "Ice Pillar"
        this.speedMultiplier = towerData.towerStats.speedMultiplier
        this.beamWidth = towerData.towerInfo.beamWidth
    }

    runTower(gameplayScene : GameplayScene) : void {
        const gameplaySceneContainer = gameplayScene.mapContainer

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const towerRef = this

        const towerFireCycleTicker = new PIXI.Ticker()
        towerFireCycleTicker.autoStart = false


        let cooldown = 0

        //spawns an enemy
        const onTick = () => {

            if (this.isSold) {
                console.log("tower sold, sitkcer stop fire")
                towerFireCycleTicker.stop()
            }

            cooldown -= towerFireCycleTicker.deltaMS
            if (cooldown <= 0) {
                cooldown = 1000 * 1/this.fireRate


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
                    const beam = new Beam(this.getCenterPosition().x, this.getCenterPosition().y, 5, 5, this.targetedEnemy, this.damage, this.speedMultiplier, 0xC7C7FF, this.beamWidth)
                    beam.render(gameplaySceneContainer)
                    beam.fire(gameplayScene.app.ticker.deltaTime)
                }

            }
        }

        towerFireCycleTicker.add(onTick)
        towerFireCycleTicker.start()

        eventDispatcher.on("gameEnd", () => {
            towerFireCycleTicker.stop()
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
        const newStats = this.upgrades[index] as IcePillarStats

        this.range = newStats.range
        this.damage = newStats.damage
        this.fireRate = newStats.fireRate
        this.cost += newStats.cost
        this.speedMultiplier = newStats.speedMultiplier
        this.level++

        const newVisualStats = this.visualUpgrades[index] as IcePillarInfo
        this.tileColour = newVisualStats.tileColour
        this.beamWidth = newVisualStats.beamWidth
    }
}