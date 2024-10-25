import { EventDispatcher } from "../../utils/EventDispatcher.js"
import { Vector } from "../../utils/Vector.js"
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

    runTower(gameplaySceneContainer) {

        const towerRef = this

        const towerFireCycleTicker = new PIXI.Ticker()
        towerFireCycleTicker.autoStart = false


        let cooldown = 0

        //spawns an enemy
        let onTick = () => {

            cooldown -= towerFireCycleTicker.deltaMS
            if (cooldown <= 0) {
                cooldown = 10


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

    findEnemy(enemies) {
        let enemiesInRange = this.checkEnemiesInRange(enemies)
        enemiesInRange = enemiesInRange.sort((e1, e2)=> e2.distanceTravelled-e1.distanceTravelled)
        if (enemiesInRange.length > 0 && enemiesInRange[0].isAlive) {
            this.lockInEnemy(enemiesInRange[0])
        }
    }

    checkEnemiesInRange(enemies) {
        const enemiesInRange = enemies.filter(enemy => {
            return this.checkEnemyInRange(enemy)
        })
        return enemiesInRange
    }

    checkEnemyInRange(enemy) {
        const towerCenterPosition = this.getCenterPosition()
        const enemyCenterPosition = enemy.getCenterPosition()
        const towerEnemyVector = new Vector(enemyCenterPosition.x - towerCenterPosition.x, enemyCenterPosition.y - towerCenterPosition.y)
        return towerEnemyVector.magnitude() <= this.range
    }
}