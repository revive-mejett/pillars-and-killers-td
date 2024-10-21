import { Tower } from "./Tower.js";


export class BasicPillar extends Tower {


    /**
     *
     */
    constructor(x, y, width, height, towerstats) {
        super(x, y, width, height, towerstats);
        console.log(towerstats);
    }

    fire() {
        console.log("basic pillar is attacking")
    }
}