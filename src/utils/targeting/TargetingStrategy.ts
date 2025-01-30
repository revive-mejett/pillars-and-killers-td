import { Enemy } from "src/objects/killers/Enemy";


export abstract class ITargetingStrategy {
    // eslint-disable-next-line no-unused-vars
    abstract compareEnemies(enemy1: Enemy | undefined, enemy2: Enemy | undefined) : Enemy | undefined

    protected validateEnemies(enemy1: Enemy | undefined, enemy2: Enemy | undefined) : boolean | undefined {
        return (enemy1 && enemy1.isAlive && enemy2 && enemy2.isAlive)
    }
}

export class FirstTargetingStrategy extends ITargetingStrategy {
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

export class LastTargetingStrategy extends ITargetingStrategy {
    compareEnemies(enemy1: Enemy | undefined, enemy2: Enemy | undefined): Enemy | undefined {
        if (!this.validateEnemies(enemy1, enemy2)) {
            return undefined
        }
        //enemies are still existing and alive
        if (enemy1!.distanceTravelled < enemy2!.distanceTravelled) {
            return enemy1
        } else {
            return enemy2
        }
    }
}

export class StrongTargetingStrategy extends ITargetingStrategy {
    compareEnemies(enemy1: Enemy | undefined, enemy2: Enemy | undefined): Enemy | undefined {
        if (!this.validateEnemies(enemy1, enemy2)) {
            return undefined
        }
        //enemies are still existing and alive
        if (enemy1!.health > enemy2!.health) {
            return enemy1
        } else {
            return enemy2
        }
    }
}

export class WeakTargetingStrategy extends ITargetingStrategy {
    compareEnemies(enemy1: Enemy | undefined, enemy2: Enemy | undefined): Enemy | undefined {
        if (!this.validateEnemies(enemy1, enemy2)) {
            return undefined
        }
        //enemies are still existing and alive
        if (enemy1!.health < enemy2!.health) {
            return enemy1
        } else {
            return enemy2
        }
    }
}

export class FastTargetingStrategy extends ITargetingStrategy {
    compareEnemies(enemy1: Enemy | undefined, enemy2: Enemy | undefined): Enemy | undefined {
        if (!this.validateEnemies(enemy1, enemy2)) {
            return undefined
        }
        //enemies are still existing and alive
        if (enemy1!.speed > enemy2!.speed) {
            return enemy1
        } else {
            return enemy2
        }
    }
}