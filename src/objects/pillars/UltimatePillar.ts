import TowerStats from "src/ts/types/TowerStats";
import { Tower } from "./Tower";


export class UltimatePillar extends Tower {
    towerName: string;


    /**
     *
     */
    constructor(x : number, y : number, width : number, height : number, towerstats : TowerStats) {
        super(x, y, width, height, towerstats);
        this.towerName = "Ultimate Pillar"
    }

    fire() {
        console.log("ult pillar is attacking")
    }
}