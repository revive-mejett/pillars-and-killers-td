import { Tower } from "./Tower";
import { GameplayScene } from "src/scenes/GameplayScene";
import * as PIXI from "pixi.js";
import { Bullet } from "../projectile/Bullet";
import { EventDispatcher } from "../../utils/EventDispatcher";
import TowerData from "src/ts/types/TowerData";

const eventDispatcher = new EventDispatcher()

export class BasicPillar extends Tower {
    towerName: string;
    bulletSize: number

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, towerData : TowerData) {
        super(x, y, width, height, towerData);
        this.towerName = "Basic Pillar"
        this.bulletSize = towerData.towerInfo.bulletSize
    }

    runTower(gameplayScene : GameplayScene) {

        const gameplaySceneContainer = gameplayScene.container


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
                const bullet = new Bullet(this.getCenterPosition().x, this.getCenterPosition().y, this.bulletSize, this.bulletSize, this.targetedEnemy, this.damage, "0xFFFFFF")
                bullet.render(gameplaySceneContainer)
                bullet.fire(gameplayScene.app.ticker.deltaTime)
            }
        }

        towerFireCycleTicker.add(onTick)
        towerFireCycleTicker.start()

        eventDispatcher.on("gameEnd", () => {
            towerFireCycleTicker.stop()
        })
    }

    upgrade(): void {
        if (this.level < this.upgrades.length - 1) {
            return
        }
        const index = this.level - 1
        const newStats = this.upgrades[index]

        this.range = newStats.range
        this.damage = newStats.damage
        this.fireRate = newStats.fireRate
        this.cost = newStats.cost
        this.level++

        const newVisualStats = this.visualUpgrades[index]
        this.tileColour = newVisualStats.tileColour
        this.bulletSize = newVisualStats.bulletSize
    }

}