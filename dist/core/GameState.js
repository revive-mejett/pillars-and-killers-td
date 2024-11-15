import { EventDispatcher } from "../utils/EventDispatcher";
const eventDispatcher = new EventDispatcher();
export class GameState {
    constructor() {
        this.lives = 30;
        this.money = 500;
        this.uiManager = undefined;
        eventDispatcher.on("enemyReachEnd", this.loseLives.bind(this));
        eventDispatcher.on("purchaseSuccessful1", this.debitMoney.bind(this));
        eventDispatcher.on("moneyEarned", this.gainMoney.bind(this));
    }
    loseLives(damage) {
        var _a;
        // console.log("before ", this.lives, this.money)
        this.lives -= damage;
        // console.log("after ", this.lives, this.money)
        if (this.lives <= 0) {
            this.lives = 0;
            eventDispatcher.fireEvent("defeat");
        }
        (_a = this.uiManager) === null || _a === void 0 ? void 0 : _a.updateLives();
    }
    debitMoney(money) {
        var _a;
        this.money -= money;
        (_a = this.uiManager) === null || _a === void 0 ? void 0 : _a.updateMoney();
    }
    gainMoney(money) {
        var _a;
        this.money += money;
        (_a = this.uiManager) === null || _a === void 0 ? void 0 : _a.updateMoney();
    }
    linkUiManager(uiManager) {
        this.uiManager = uiManager;
    }
    cleanUpResources() {
        eventDispatcher.clearListenersOfEvent("enemyReachEnd");
        eventDispatcher.clearListenersOfEvent("purchaseSuccessful1");
        eventDispatcher.clearListenersOfEvent("moneyEarned");
    }
}
//# sourceMappingURL=GameState.js.map