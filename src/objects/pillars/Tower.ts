
import Position from "src/ts/types/Position";
import { Vector } from "../../utils/Vector"
import { Entity } from "../Entity"
import { Bullet } from "../projectile/Bullet"
import * as PIXI from "pixi.js";
import { Enemy } from "../Enemy";
import { Tile } from "../Tile";
import TowerStats from "src/ts/types/TowerStats";
import { GameplayScene } from "src/scenes/GameplayScene";


//base class for tower
export class Tower extends Entity {
    range: number;
    damage: number;
    fireRate: number;
    cost: number;
    level: number;
    asset: PIXI.SpriteSource;
    assetIcon: PIXI.SpriteSource;
    position: Position;
    sprite: PIXI.Sprite;
    targetedEnemy?: Enemy;
    isSold : boolean;
    towerName : string = "Tower";

    tile?: Tile;


    constructor(x : number, y : number, width : number, height : number, towerstats : TowerStats) {
        super(x, y, width, height)

        this.range = towerstats.range
        this.damage = towerstats.damage
        this.fireRate = towerstats.fireRate
        this.cost = towerstats.cost
        this.level = 1

        this.asset = towerstats.asset
        this.assetIcon = towerstats.assetIcon

        this.position = { x: x, y: y }

        this.sprite = PIXI.Sprite.from(this.asset)
        this.sprite.height = height
        this.sprite.width = width
        this.sprite.x = this.position.x
        this.sprite.y = this.position.y

        this.targetedEnemy = undefined
        this.isSold = false
        this.tile = undefined


        // if (new.target === Tower) {
        //     throw new Error("Cant instantiate Tower base class")
        // }

    }

    setTileRef(tile : Tile) {
        this.tile = tile
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
                const bullet = new Bullet(this.getCenterPosition().x, this.getCenterPosition().y, 5, 5, this.targetedEnemy, this.damage, "0xFFFFFF")
                bullet.render(gameplaySceneContainer)
                bullet.fire(gameplayScene.app.ticker.deltaTime)
            }
        }

        towerFireCycleTicker.add(onTick)
        towerFireCycleTicker.start()
    }

    lockInEnemy(enemy : Enemy) {
        this.targetedEnemy = enemy
    }

    // renderOnTile(tile) {
    //     tile.container.addChild(this.sprite)
    // }

    findEnemy(enemies : Enemy[]) {
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

    checkEnemiesInRange(enemies : Enemy[]) {
        const enemiesInRange = enemies.filter(enemy => {
            return this.checkEnemyInRange(enemy)
        })
        return enemiesInRange
    }

    checkEnemyInRange(enemy : Enemy) {
        const towerCenterPosition = this.getCenterPosition()
        const enemyCenterPosition = enemy.getCenterPosition()
        const towerEnemyVector = new Vector(enemyCenterPosition.x - towerCenterPosition.x, enemyCenterPosition.y - towerCenterPosition.y)
        return towerEnemyVector.magnitude() <= this.range
    }
}