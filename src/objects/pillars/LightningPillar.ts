
import { Tower } from "./Tower";
import * as PIXI from "pixi.js";
import { GameplayScene } from "src/scenes/GameplayScene";
import { EventDispatcher } from "../../utils/EventDispatcher";
import TowerData from "src/ts/types/TowerData";
import { TowerInfo } from "src/ts/interfaces/TowerInfo";
import { TowerStats } from "src/ts/interfaces/TowerStats";
import { LightningBolt } from "../projectile/LightningBolt";

const eventDispatcher = new EventDispatcher()

export class LightningPillar extends Tower {

    towerName: string;
    // beamWidth: number;


    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, towerData : TowerData<TowerStats, TowerInfo>) {
        super(x, y, width, height, towerData);
        this.towerName = "Lightning Pillar"
        // this.beamWidth = towerData.towerInfo.beamWidth
    }

    runTower(gameplayScene : GameplayScene) : void {
        const gameplaySceneContainer = gameplayScene.container

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
                    const beam = new LightningBolt(this.getCenterPosition().x, this.getCenterPosition().y, 5, 5, this.targetedEnemy, this.damage, 0xFFFFFF, 4)
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

        const newVisualStats = this.visualUpgrades[index]
        this.tileColour = newVisualStats.tileColour
        // this.beamWidth = newVisualStats.beamWidth
    }
}