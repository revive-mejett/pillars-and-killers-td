import { Entity } from "../Entity";
import * as PIXI from "pixi.js";
export class Projectile extends Entity {
    /**
     *
     */
    constructor(x, y, width, height, targetEnemy, damage, colour) {
        super(x, y, width, height);
        this.damage = damage;
        this.targetEnemy = targetEnemy;
        this.hasHit = false;
        this.updateTicker = new PIXI.Ticker();
        this.autoStart = false;
        this.colour = colour || "0xffffff";
        if (new.target === Projectile) {
            throw new Error("Projectile is an abstract class. Cannot instantiate a Projectile instance");
        }
    }
    setEnemy(enemy) {
        this.targetEnemy = enemy;
    }
    fire(deltaTime) {
        throw new Error("abstract method " + deltaTime);
    }
    render(parentContainer) {
        if (this.graphics) {
            parentContainer.addChild(this.graphics);
        }
    }
    cleanUpResources() {
        var _a, _b;
        this.updateTicker.stop();
        this.updateTicker.destroy();
        if ((_a = this.graphics) === null || _a === void 0 ? void 0 : _a.parent) {
            this.graphics.parent.removeChild(this.graphics);
        }
        (_b = this.graphics) === null || _b === void 0 ? void 0 : _b.clear();
        this.graphics = undefined;
        this.targetEnemy = undefined;
        this.updateTicker = undefined;
    }
}
//# sourceMappingURL=Projectile.js.map