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

    runTower(gameplayScene) {

        const gameplaySceneContainer = gameplayScene.container

        const towerRef = this

        const towerFireCycleTicker = new PIXI.Ticker()
        towerFireCycleTicker.autoStart = false


        let cooldown = 0

        //spawns an enemy
        let onTick = () => {

            cooldown -= towerFireCycleTicker.deltaMS
            if (cooldown <= 0) {
                cooldown = 10


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
        let bestEnemy = this.targetedEnemy; // Start with current target, if it exists
        enemies.forEach(enemy => {
            // Check if the enemy is alive and within range
            if (enemy.isAlive && this.checkEnemyInRange(enemy)) {
                // If we don't have a target or this enemy has traveled further, update the target
                if (!bestEnemy || enemy.distanceTravelled > bestEnemy.distanceTravelled) {
                    bestEnemy = enemy;
                }
            }
        });

        // If we found a better target, lock it in
        if (bestEnemy && bestEnemy !== this.targetedEnemy) {
            this.lockInEnemy(bestEnemy);
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