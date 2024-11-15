
import TowerStats from "src/ts/types/TowerStats";
import { Tower } from "./Tower";


export class BasicPillar extends Tower {
    towerName: string;


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