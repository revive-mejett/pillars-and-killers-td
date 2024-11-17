import Position from "src/ts/types/Position";
import { Vector } from "../../utils/Vector";
import { Enemy } from "../Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";

export class Fireball extends Projectile {
    speed: number;

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, colour : string) {
        super(x, y, width, height, targetEnemy, damage, colour);
        this.speed = 5

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(this.colour)
        this.graphics.drawRect(0, 0, this.width, this.height)
        this.graphics.endFill()
    }

    fire(deltaTime : number, enemies :Enemy[]) {


        const onTick = () => {
            if (!this.targetEnemy || !this.targetEnemy.isAlive) {
                this.cleanUpResources()
                return
            }



            const bulletCenterPosition = this.getCenterPosition()
            const enemyCenterPosition = this.targetEnemy.getCenterPosition()
            const bulletEnemyVector = new Vector(enemyCenterPosition.x - bulletCenterPosition.x, enemyCenterPosition.y - bulletCenterPosition.y)
            //move the bullet towards enemy in a tickwise fashion
            this.x += bulletEnemyVector.normalize().x * deltaTime * this.speed
            this.y += bulletEnemyVector.normalize().y * deltaTime * this.speed
            this.updateSpritePosition()


            if (bulletEnemyVector.magnitude() < 5) {
                this.onImpact(enemies, this.getCenterPosition(), 50)
                this.targetEnemy.takeDamage(this.damage)
                this.hasHit = true
                this.cleanUpResources()
            }
        }

        this.updateTicker?.add(onTick)
        this.updateTicker?.start()
    }

    updateSpritePosition() {
        if (!this.graphics) {
            return
        }
        this.graphics.x = this.x
        this.graphics.y = this.y
    }

    onImpact(enemies : Enemy[], impactPosition : Position, impactRadius : number) {

        enemies.forEach((enemy) => {
            const enemyPosition = enemy.getCenterPosition()
            const distanceToImpact = new Vector(enemyPosition.x - impactPosition.x, enemyPosition.y - impactPosition.y).magnitude()

            if (distanceToImpact <= impactRadius) {
                enemy.takeDamage(Math.floor(this.damage * ((impactRadius - distanceToImpact/2) / impactRadius)))
            }
        })
    }

}