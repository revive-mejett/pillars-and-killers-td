import TowerStats from "src/ts/types/TowerStats.js";
import { Tower } from "./Tower.js";


export class BasicPillar extends Tower {


    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, towerstats : TowerStats) {
        super(x, y, width, height, towerstats);
        this.towerName = "Basic Pillar"
    }

    fire() {
        console.log("basic pillar is attacking")
    }
}