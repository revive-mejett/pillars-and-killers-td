import { Enemy } from "src/objects/killers/Enemy";


abstract class TargetingStrategy {
    // eslint-disable-next-line no-unused-vars
    abstract compareEnemies(enemy1: Enemy | undefined, enemy2: Enemy | undefined) : Enemy | undefined

    protected validateEnemies(enemy1: Enemy | undefined, enemy2: Enemy | undefined) : boolean | undefined {
        return (enemy1 && enemy1.isAlive && enemy2 && enemy2.isAlive)
    }
}

export class FirstTargetingStrategy extends TargetingStrategy {
    compareEnemies(enemy1: Enemy | undefined, enemy2: Enemy | undefined): Enemy | undefined {
        if (!this.validateEnemies(enemy1, enemy2)) {
            return undefined
        }
        //enemies are still existing and alive
        if (enemy1!.distanceTravelled > enemy2!.distanceTravelled) {
            return enemy1
        } else {
            return enemy2
        }
    }
}