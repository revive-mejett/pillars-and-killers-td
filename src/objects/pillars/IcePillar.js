import { Beam } from "../projectile/Beam.js";
import { Tower } from "./Tower.js";


export class IcePillar extends Tower {


    /**
     *
     */
    constructor(x, y, width, height, towerstats) {
        super(x, y, width, height, towerstats);
        this.towerName = "Ice Pillar"
    }

    runTower(gameplayScene) {
        console.log("ice pillar")
        const gameplaySceneContainer = gameplayScene.container

        const towerRef = this

        const towerFireCycleTicker = new PIXI.Ticker()
        towerFireCycleTicker.autoStart = false


        let cooldown = 0

        //spawns an enemy
        let onTick = () => {

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
                    this.targetedEnemy = null
                    cooldown = 0 //reset cooldown
                    return
                }

                //check if enemy is no longer in range
                if (!this.checkEnemyInRange(towerRef.targetedEnemy)) {
                    this.targetedEnemy = null
                    cooldown = 0 //reset cooldown
                    return
                }

                //spawn a beam
                const beam = new Beam(this.getCenterPosition().x, this.getCenterPosition().y, 5, 5, this.targetedEnemy, this.damage, 0xFAFAFF)
                beam.render(gameplaySceneContainer)
                beam.fire(gameplayScene.app.ticker.deltaTime)
            }
        }

        towerFireCycleTicker.add(onTick)
        towerFireCycleTicker.start()
    }
}