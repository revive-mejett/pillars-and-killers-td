import TowerStats from "src/ts/types/TowerStats";
import { Beam } from "../projectile/Beam";
import { Tower } from "./Tower";
import * as PIXI from "pixi.js";

export class IcePillar extends Tower {
    towerName: string;


    /**
     *
     */
    constructor(x : number, y : number, width : number, height :number, towerstats : TowerStats) {
        super(x, y, width, height, towerstats);
        this.towerName = "Ice Pillar"
    }

    runTower(gameplayScene) {
        console.log("ice pillar")
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

                if (this.targetedEnemy && !towerRef.targetedEnemy.isAlive) {
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
                const beam = new Beam(this.getCenterPosition().x, this.getCenterPosition().y, 5, 5, this.targetedEnemy, this.damage, 0xC7C7FF)
                beam.render(gameplaySceneContainer)
                beam.fire(gameplayScene.app.ticker.deltaTime)
            }
        }

        towerFireCycleTicker.add(onTick)
        towerFireCycleTicker.start()
    }
}