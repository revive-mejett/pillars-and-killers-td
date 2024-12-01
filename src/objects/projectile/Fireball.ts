import Position from "src/ts/types/Position";
import { Vector } from "../../utils/Vector";
import { Enemy } from "../killers/Enemy";
import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
import { EventDispatcher } from "../../utils/EventDispatcher";

const eventDispatcher = new EventDispatcher()

export class Fireball extends Projectile {
    speed: number;
    impactRadius: number;
    soundPitch: number;

    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, targetEnemy : Enemy, damage : number, colour : number, soundPitch: number, impactRadius: number) {
        super(x, y, width, height, targetEnemy, damage, colour);
        this.speed = 5

        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(this.colour)
        this.graphics.drawRect(0, 0, this.width, this.height)
        this.graphics.endFill()

        this.impactRadius = impactRadius
        this.soundPitch = soundPitch
    }

    fire(deltaTime : number, enemies :Enemy[]) {

        eventDispatcher.fireEvent("towerAttackSoundPlay", {path: "assets/sounds/sfx/torch_whoosh.mp3", maxSources: 6, towerName: "Ember Pillar", volume: 1, speed: this.soundPitch})

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
                this.onImpact(enemies, this.getCenterPosition())
                this.hasHit = true
                this.cleanUpResources()
            }
        }

        this.updateTicker?.add(onTick)
        this.updateTicker?.start()
    }


    onImpact(enemies : Enemy[], impactPosition : Position) {

        enemies.forEach((enemy) => {
            const enemyPosition = enemy.getCenterPosition()
            const distanceToImpact = new Vector(enemyPosition.x - impactPosition.x, enemyPosition.y - impactPosition.y).magnitude()

            if (distanceToImpact <= this.impactRadius) {
                enemy.takeDamage(Math.ceil(this.damage * ((this.impactRadius - distanceToImpact/2) / this.impactRadius)))
            }
        })
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