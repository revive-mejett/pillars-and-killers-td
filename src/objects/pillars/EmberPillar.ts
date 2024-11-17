import TowerStats from "src/ts/types/TowerStats";
import { Tower } from "./Tower";
import { Fireball } from "../projectile/Fireball";
import { GameplayScene } from "src/scenes/GameplayScene";
import * as PIXI from "pixi.js";

export class EmberPillar extends Tower {
    towerName: string;


    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, towerstats : TowerStats) {
        super(x, y, width, height, towerstats);
        this.towerName = "Ember Akshan"
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
                const bullet = new Fireball(this.getCenterPosition().x, this.getCenterPosition().y, 10, 10, this.targetedEnemy, this.damage, "0xFFA700")
                bullet.render(gameplaySceneContainer)
                bullet.fire(gameplayScene.app.ticker.deltaTime, gameplayScene.enemiesPresent)
            }
        }

        towerFireCycleTicker.add(onTick)
        towerFireCycleTicker.start()
    }
}