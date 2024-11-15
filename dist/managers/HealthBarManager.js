import { HealthBar } from "../UI/HealthBar";
import { EventDispatcher } from "../utils/EventDispatcher";
const eventDispatcher = new EventDispatcher();
export class HealthBarManager {
    /**
     *
     */
    constructor() {
        this.healthBars = [];
        eventDispatcher.on("enemySpawn", this.assignHealthBar.bind(this));
    }
    assignHealthBar(enemy) {
        const healthBar = new HealthBar(enemy.position.x, enemy.position.y, enemy.sprite.width, enemy.sprite.height, enemy);
        this.healthBars.push(healthBar);
    }
    updateAllHealthBars(parentContainer) {
        const healthBarsToDelete = this.healthBars.filter(healthBar => !healthBar.enemy.isAlive);
        healthBarsToDelete.forEach(healthBar => healthBar.deleteBar());
        this.healthBars = this.healthBars.filter(healthBar => healthBar.enemy.isAlive);
        this.healthBars.forEach(healthBar => {
            healthBar === null || healthBar === void 0 ? void 0 : healthBar.renderBar(parentContainer);
        });
    }
}
//# sourceMappingURL=HealthBarManager.js.map