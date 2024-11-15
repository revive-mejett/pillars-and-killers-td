import { Tower } from "./Tower";
export class UltimatePillar extends Tower {
    /**
     *
     */
    constructor(x, y, width, height, towerstats) {
        super(x, y, width, height, towerstats);
        this.towerName = "Ultimate Pillar";
    }
    fire() {
        console.log("ult pillar is attacking");
    }
}
//# sourceMappingURL=UltimatePillar.js.map