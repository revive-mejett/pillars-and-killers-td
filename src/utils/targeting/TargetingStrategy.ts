import { Enemy } from "src/objects/killers/Enemy";
import { Tower } from "src/objects/pillars/Tower";

abstract class TargetingStrategy {
    // eslint-disable-next-line no-unused-vars
    abstract compareEnemies(enemy1: Enemy, enemy2: Enemy) : Enemy | undefined

    validateEnemies(enemy1: Enemy, enemy2: Enemy) : boolean {
        return enemy1 && enemy1.isAlive && enemy2 && enemy2.isAlive
    }
}

export class FirstTargetingStrategy extends TargetingStrategy {
    compareEnemies(enemy1: Enemy, enemy2: Enemy): Enemy | undefined {
        if (!this.validateEnemies(enemy1, enemy2)) {
            return undefined
        }
        if (enemy1.distanceTravelled > enemy2.distanceTravelled) {
            return enemy1
        } else {
            return enemy2
        }
    }
}