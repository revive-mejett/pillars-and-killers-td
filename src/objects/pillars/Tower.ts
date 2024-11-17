
import Position from "src/ts/types/Position";
import { Vector } from "../../utils/Vector"
import { Entity } from "../Entity"
import * as PIXI from "pixi.js";
import { Enemy } from "../Enemy";
import { Tile } from "../Tile";
import TowerInfo from "src/ts/types/TowerInfo";
import { GameplayScene } from "src/scenes/GameplayScene";



//base class for tower
export abstract class Tower extends Entity {
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


    constructor(x : number, y : number, width : number, height : number, towerstats : TowerInfo) {
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

    }

    // eslint-disable-next-line no-unused-vars
    abstract runTower(_gameplayScene : GameplayScene) : void

    setTileRef(tile : Tile) {
        this.tile = tile
    }



    lockInEnemy(enemy : Enemy) {
        this.targetedEnemy = enemy
    }

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