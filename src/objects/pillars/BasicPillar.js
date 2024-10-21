import { Tower } from "./Tower.js";


export class BasicPillar extends Tower {


    /**
     *
     */
    constructor(x, y, width, height, range, damage, fireRate, cost, asset) {
        super(x, y, width, height, range, damage, fireRate, cost, asset);
    }

    fire() {
        console.log("basic pillar is attacking")
    }
}