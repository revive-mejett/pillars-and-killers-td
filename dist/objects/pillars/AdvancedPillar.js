import { Tower } from "./Tower";
export class AdvancedPillar extends Tower {
    /**
     *
     */
    constructor(x, y, width, height, towerstats) {
        super(x, y, width, height, towerstats);
        this.towerName = "Advanced Pillar";
    }
    fire() {
        console.log("Advanced pillar is attacking");
    }
}
//# sourceMappingURL=AdvancedPillar.js.map