import { AdvancedPillar } from "../objects/pillars/AdvancedPillar";
import { BasicPillar } from "../objects/pillars/BasicPillar";
import { IcePillar } from "../objects/pillars/IcePillar";
import { UltimatePillar } from "../objects/pillars/UltimatePillar";
import { EmberPillar } from "../objects/pillars/EmberPillar";
import TowerData from "src/ts/types/TowerData";
import { IcePillarStats } from "src/ts/interfaces/TowerStats";
import { IcePillarInfo } from "src/ts/interfaces/TowerInfo";
import { getTowerData } from "../utils/TowerStatsData";





export class TowerFactory {


    static createTower(x : number, y : number, width : number, height : number, towerType : string) {


        const towerData = getTowerData(towerType)

        switch (towerType) {
        case "basic":
            return new BasicPillar(x, y, width, height, towerData)
        case "ice":
            return new IcePillar(x, y, width, height, towerData as TowerData<IcePillarStats, IcePillarInfo>)
        case "ember":
            return new EmberPillar(x, y, width, height, towerData)
        case "advanced":
            return new AdvancedPillar(x, y, width, height, towerData)
        case "ultimate":
            return new UltimatePillar(x, y, width, height, towerData)
        default:
            return new BasicPillar(x, y, width, height, towerData)
        }
    }
}