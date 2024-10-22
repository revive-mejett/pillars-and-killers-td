import { Tower } from "./Tower.js";


export class AdvancedPillar extends Tower {


    /**
     *
     */
    constructor(x, y, width, height, towerstats) {
        super(x, y, width, height, towerstats);
    }

    fire() {
        console.log("Advanced pillar is attacking")
    }
}