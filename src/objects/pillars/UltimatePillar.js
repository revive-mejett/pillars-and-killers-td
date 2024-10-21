import { Tower } from "./Tower.js";


export class UltimatePillar extends Tower {


    /**
     *
     */
    constructor(x, y, width, height, towerstats) {
        super(x, y, width, height, towerstats);
        console.log(towerstats);
    }

    fire() {
        console.log("ult pillar is attacking")
    }
}