import TowerStats from "src/ts/types/TowerStats";
import { Tower } from "./Tower";


export class EmberPillar extends Tower {
    towerName: string;


    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, towerstats : TowerStats) {
        super(x, y, width, height, towerstats);
        this.towerName = "Ember Akshan"
    }

    fire() {
        console.log("Ember pillar is attacking")
    }
}