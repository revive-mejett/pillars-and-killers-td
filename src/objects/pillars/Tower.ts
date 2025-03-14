
import Position from "src/ts/types/Position";
import { Vector } from "../../utils/Vector"
import { Entity } from "../Entity"
import * as PIXI from "pixi.js";
import { Enemy } from "../killers/Enemy";
import { Tile } from "../Tile";
import { GameplayScene } from "src/scenes/GameplayScene";
import TowerData from "src/ts/types/TowerData";
import { TowerStats } from "src/ts/interfaces/TowerStats";
import { TowerInfo } from "src/ts/interfaces/TowerInfo";
import { AssetLoader } from "../../core/AssetLoader";
import { FastTargetingStrategy, FirstTargetingStrategy, ITargetingStrategy, LastTargetingStrategy, StrongTargetingStrategy, WeakTargetingStrategy } from "../../utils/targeting/TargetingStrategy";
import TargetingStrategy from "src/ts/types/TargetingStrategy";
import { all1st } from "../../utils/Nicknames";

const assetLoader = new AssetLoader()

//base class for tower
export abstract class Tower extends Entity {
    range: number;
    damage: number;
    fireRate: number;
    cost: number;
    level: number;
    asset: PIXI.SpriteSource | undefined;
    assetIcon: PIXI.SpriteSource | undefined;
    position: Position | undefined;
    sprite: PIXI.Sprite | undefined;
    targetedEnemy?: Enemy;
    isSold : boolean;

    upgrades: TowerStats[] | undefined = [];
    visualUpgrades: TowerInfo[] | undefined = [];

    towerName : string = "Tower";

    tile?: Tile;
    tileColour: number;

    //is affected by EMP if cooldown is > 0
    disabledCooldown: number = 0
    zappedGraphics: PIXI.AnimatedSprite


    //fields for targeting strategies
    currentTargetingIndex: number
    targetingStrategies: TargetingStrategy[]

    //nickname
    nick: string



    constructor(x : number, y : number, width : number, height : number, towerdata : TowerData<TowerStats, TowerInfo>) {
        super(x, y, width, height)

        this.range = towerdata.towerStats.range
        this.damage = towerdata.towerStats.damage
        this.fireRate = towerdata.towerStats.fireRate
        this.cost = towerdata.towerStats.cost
        this.level = 1
        this.upgrades = towerdata.upgrades
        this.visualUpgrades = towerdata.visualUpgrades

        this.asset = towerdata.towerInfo.asset
        this.assetIcon = towerdata.towerInfo.assetIcon
        this.tileColour = towerdata.towerInfo.tileColour

        this.position = { x: x, y: y }

        this.sprite = PIXI.Sprite.from(this.asset)
        this.sprite.height = height
        this.sprite.width = width
        this.sprite.x = this.position.x
        this.sprite.y = this.position.y

        if (!assetLoader.spriteSheetZapped) {
            throw new Error("zapped animation failed to load")
        }

        this.zappedGraphics = new PIXI.AnimatedSprite(assetLoader.spriteSheetZapped.animations.empParticle)
        this.zappedGraphics.height = height
        this.zappedGraphics.width = width
        this.zappedGraphics.x = this.position.x
        this.zappedGraphics.y = this.position.y
        this.zappedGraphics.animationSpeed = 0.05
        this.zappedGraphics.visible = false

        this.targetedEnemy = undefined
        this.isSold = false
        this.tile = undefined

        //debuffs
        this.disabledCooldown = 0

        //targeting strategies
        this.targetingStrategies = ["1st", "Last", "Strong", "Weak", "Fastest"]
        this.currentTargetingIndex = 0

        //nickname
        this.nick = all1st[Math.floor(Math.random() * all1st.length)]

        //set to random nickname
        this.setNickname(undefined)

    }

    setNickname(nick: string  | undefined) {
        if (!nick) {
            //random nickname
            this.nick = all1st[Math.floor(Math.random() * all1st.length)]
        } else {
            //from loaded data
            this.nick = nick
        }
    }

    // eslint-disable-next-line no-unused-vars
    abstract runTower(_gameplayScene : GameplayScene) : void

    setTileRef(tile : Tile) {
        this.tile = tile
    }

    presetLevel(desiredLevel: number) {
        for (let i = this.level; i < desiredLevel; i++) {
            this.upgrade()
        }
    }



    lockInEnemy(enemy : Enemy) {
        this.targetedEnemy = enemy
    }

    disableTower() {
        this.disabledCooldown = 5000
        this.zappedGraphics.visible = true
        this.zappedGraphics.play()
    }

    tickDisabled(towerFireCycleTicker : PIXI.Ticker) {
        if (this.disabledCooldown > 0 && towerFireCycleTicker) {
            this.disabledCooldown -= towerFireCycleTicker?.deltaMS || 0
            if (this.disabledCooldown <=0 ) {
                this.zappedGraphics.visible = false
                this.disabledCooldown = 0
            }
        }
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
        let targetingStrategy : ITargetingStrategy

        switch (this.targetingStrategies[this.currentTargetingIndex]) {
        case "1st":
            targetingStrategy = new FirstTargetingStrategy()
            break;
        case "Last":
            targetingStrategy = new LastTargetingStrategy()
            break;
        case "Strong":
            targetingStrategy = new StrongTargetingStrategy()
            break;
        case "Weak":
            targetingStrategy = new WeakTargetingStrategy()
            break;
        case "Fastest":
            targetingStrategy = new FastTargetingStrategy()
            break;
        default:
            targetingStrategy = new FirstTargetingStrategy()
            break;
        }
        enemies.forEach(enemy => {
            // Check if the enemy is alive and within range
            if (enemy.isAlive && this.checkEnemyInRange(enemy)) {
                // Use the correct targeting strategy algorithm. If we don't have a target or this enemy has traveled further, update the target
                bestEnemy = targetingStrategy.compareEnemies(enemy, bestEnemy)
            }
        });

        // If we found a better target, lock it in
        if (bestEnemy && bestEnemy !== this.targetedEnemy) {
            this.lockInEnemy(bestEnemy);
        }
    }

    previousTargetingStrategy() {
        if (this.currentTargetingIndex === 0) {
            this.currentTargetingIndex = this.targetingStrategies.length - 1
        } else {
            this.currentTargetingIndex--
        }
    }

    nextTargetingStrategy() {
        if (this.currentTargetingIndex === this.targetingStrategies.length - 1) {
            this.currentTargetingIndex = 0
        } else {
            this.currentTargetingIndex++
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

    abstract upgrade() : void

    cleanUpResources() {
        this.asset = undefined
        this.sprite?.destroy()
        this.sprite = undefined
        this.assetIcon = undefined
        this.targetedEnemy = undefined
        this.upgrades = undefined
        this.visualUpgrades = undefined
        this.position = undefined
        this.tile = undefined

        if (this.zappedGraphics.playing) {
            this.zappedGraphics.stop()
        }
    }
}