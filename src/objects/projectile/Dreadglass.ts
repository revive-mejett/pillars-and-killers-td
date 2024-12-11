import { Vector } from "../../utils/Vector";
import { Enemy } from "../killers/Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";



export class Bullet extends Projectile {
    speed: number
    soundPitch: number
    armourReduction: number

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, bulletSpeed: number, colour : number, armourReduction: number, soundPitch: number) {
        super(x, y, width, height, targetEnemy, damage, colour);
        this.speed = bulletSpeed
        this.soundPitch = soundPitch
        this.armourReduction = armourReduction

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(this.colour)
        this.graphics.drawRect(0, 0, this.width, this.height)
        this.graphics.endFill()
    }

    fire(deltaTime : number) {

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
                this.targetEnemy.takeDamage(this.damage)

                this.reduceTargetArmour();

                this.hasHit = true
                if (this.graphics) {
                    this.graphics.visible = false
                }
                this.cleanUpResources()
            }
        }

        this.updateTicker?.add(onTick)
        this.updateTicker?.start()
    }

    private reduceTargetArmour() {
        if (!this.targetEnemy) {
            return
        }
        this.targetEnemy.armour -= this.armourReduction;

        if (this.targetEnemy.armour <= 0) {
            this.targetEnemy.armour = 0;
        }
    }

    updateSpritePosition() {
        if (!this.graphics) {
            return
        }
        if (!this.graphics.visible) {
            this.graphics.visible = true
        }
        this.graphics.x = this.x
        this.graphics.y = this.y
    }


}