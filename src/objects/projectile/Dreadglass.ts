import { Vector } from "../../utils/Vector";
import { Enemy } from "../killers/Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../../utils/EventDispatcher";
import { GlowFilter } from "pixi-filters";

const eventDispatcher = new EventDispatcher()


export class Dreadglass extends Projectile {
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

        const factor = 0.3 * width
        let points = [0, 10, 8, 10, 12, 2, 10, 18]
        points = points.map(value => value * factor - this.width * factor)

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(this.colour)
        this.graphics.drawPolygon(points)
        this.graphics.endFill()

        this.graphics.filters = [
            new GlowFilter({innerStrength : 0.1, outerStrength: 3, color: 0x7700FF}) as unknown as PIXI.Filter
        ]
    }

    fire(deltaTime : number) {

        eventDispatcher.fireEvent("towerAttackSoundPlay", {path: "assets/sounds/sfx/glass_break.mp3", maxSources: 4, towerName: "Dreadglass Pillar", volume: 0.2, speed: this.soundPitch})

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
        
        if (this.targetEnemy.enemyType === "Boss") {

            //TON 618's armour cannot fall below 10000
            if (this.targetEnemy.enemyClassName === "TON 618" && this.targetEnemy.armour <= 10000) {
                this.targetEnemy.armour = 10000
                return
            }

            //bosses only suffer a 5% armour reduction (TON 618 suffers a 1% armour reduction)
            if (this.targetEnemy.enemyClassName === "TON 618") {
                this.targetEnemy.armour -= Math.ceil(this.armourReduction * 0.01);
            } else {
                this.targetEnemy.armour -= Math.ceil(this.armourReduction * 0.05);
            }

        } else {
            this.targetEnemy.armour -= this.armourReduction;
        }


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

        this.graphics.rotation += 2 * 0.05
    }


}