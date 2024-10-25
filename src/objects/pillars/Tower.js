import { EventDispatcher } from "../../utils/EventDispatcher.js"
import { Entity } from "../Entity.js"
import { Bullet } from "../projectile/Bullet.js"

const eventDispatcher = new EventDispatcher()
//base class for tower
export class Tower extends Entity {
    constructor(x, y, width, height, towerstats) {
        super(x, y, width, height)

        this.range = towerstats.range
        this.damage = towerstats.damage
        this.fireRate = towerstats.fireRate,
        this.cost = towerstats.cost,
        this.asset = towerstats.asset,
        this.position = { x: x, y: y },

        this.sprite = PIXI.Sprite.from(this.asset)
        this.sprite.height = height
        this.sprite.width = width
        this.sprite.x = this.position.x
        this.sprite.y = this.position.y

        this.targetedEnemy = null
        this.isSold = false

        if (new.target === Tower) {
            throw new Error("Cant instantiate Tower base class")
        }

    }

    executeFiring(gameplaySceneContainer) {

        const towerRef = this

        const towerFireCycleTicker = new PIXI.Ticker()
        towerFireCycleTicker.autoStart = false

        let elapsedMS = 0

        //spawns an enemy
        let onTick = () => {

            elapsedMS += towerFireCycleTicker.deltaMS
            if (elapsedMS >= 1000) {

                elapsedMS = 0


                if (!towerRef.targetedEnemy) {
                    console.log("toer has no targeted enemy")
                    return
                }

                if (!towerRef.targetedEnemy.isAlive) {
                    this.targetedEnemy = null
                    return
                }

                //spawn a bullet
                const bullet = new Bullet(this.getCenterPosition().x, this.getCenterPosition().y, 5, 5, 0xFF0000, this.targetedEnemy)
                bullet.render(gameplaySceneContainer)
                eventDispatcher.fireEvent("projectileSpawn", bullet)
            }
        }

        towerFireCycleTicker.add(onTick)
        towerFireCycleTicker.start()
    }

    lockInEnemy(enemy) {
        this.targetedEnemy = enemy
    }

    renderOnTile(tile) {
        tile.container.addChild(this.sprite)
    }

}