import { Projectile } from "./Projectile";
import * as PIXI from "pixi.js";
export class Beam extends Projectile {
    /**
     *
     */
    constructor(x, y, width, height, targetEnemy, damage, colour) {
        super(x, y, width, height, targetEnemy, damage, colour);
        this.graphics = new PIXI.Graphics();
    }
    fire(deltaTime) {
        var _a, _b, _c;
        let elapsedTime = 0;
        (_a = this.targetEnemy) === null || _a === void 0 ? void 0 : _a.takeDamage(this.damage);
        this.slowEnemy(0.5, 200); //apply the slow
        const onTick = () => {
            elapsedTime += deltaTime;
            if (!this.targetEnemy || !this.targetEnemy.isAlive) {
                this.cleanUpResources();
                return;
            }
            if (elapsedTime >= 10) {
                this.cleanUpResources();
                return;
            }
            const beamOriginPosition = this.getCenterPosition();
            const enemyCenterPosition = this.targetEnemy.getCenterPosition();
            this.beamPosition(beamOriginPosition, enemyCenterPosition, 3 * (10 - elapsedTime) / 10);
        };
        (_b = this.updateTicker) === null || _b === void 0 ? void 0 : _b.add(onTick);
        (_c = this.updateTicker) === null || _c === void 0 ? void 0 : _c.start();
    }
    beamPosition(beamOriginPosition, enemyCenterPosition, beamSize) {
        if (this.graphics) {
            this.graphics.clear();
            this.graphics.lineStyle(beamSize, this.colour);
            this.graphics.moveTo(beamOriginPosition.x, beamOriginPosition.y);
            this.graphics.lineTo(enemyCenterPosition.x, enemyCenterPosition.y);
        }
    }
    slowEnemy(speedMultiplier, duration) {
        if (this.targetEnemy) {
            this.targetEnemy.slowDebuffStats.speedMultiplier = speedMultiplier;
            this.targetEnemy.slowDebuffStats.timeLeft = duration;
        }
    }
}
//# sourceMappingURL=Beam.js.map