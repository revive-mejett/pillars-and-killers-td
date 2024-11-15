import TowerStats from "src/ts/types/TowerStats";
import { Tower } from "./Tower";


export class AdvancedPillar extends Tower {
    towerName: string;


    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, towerstats : TowerStats) {
        super(x, y, width, height, towerstats);
        this.towerName = "Advanced Pillar"
    }

    fire() {
        console.log("Advanced pillar is attacking")
    }
}