import { Tower } from "./Tower.js";


export class IcePillar extends Tower {


    /**
     *
     */
    constructor(x, y, width, height, towerstats) {
        super(x, y, width, height, towerstats);
        console.log(towerstats);
    }

    fire() {
        console.log("ice pillar is attacking")
    }
}