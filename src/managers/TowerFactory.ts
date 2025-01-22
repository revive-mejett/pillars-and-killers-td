import { AdvancedPillar } from "../objects/pillars/AdvancedPillar";
import { BasicPillar } from "../objects/pillars/BasicPillar";
import { IcePillar } from "../objects/pillars/IcePillar";
import { UltimatePillar } from "../objects/pillars/UltimatePillar";
import { EmberPillar } from "../objects/pillars/EmberPillar";
import { LightningPillar } from "../objects/pillars/LightningPillar";
import TowerData from "src/ts/types/TowerData";
import { CyroPillarStats, DreadglassPillarStats, EmberPillarStats, IcePillarStats, PoisonIvyPillarStats, TowerStats } from "src/ts/interfaces/TowerStats";
import { AdvancedPillarInfo, BasicPillarInfo, CyroPillarInfo, DreadglassPillarInfo, EmberPillarInfo, IcePillarInfo, PoisonIvyPillarInfo, UltimatePillarInfo } from "src/ts/interfaces/TowerInfo";
import { getTowerData } from "../utils/TowerStatsData";
import { PoisonIvyPillar } from "../objects/pillars/PoisonIvyPillar";
import { MissilePillar } from "../objects/pillars/MissilePillar";
import { DreadglassPillar } from "../objects/pillars/DreadglassPillar";
import { CyroBlastPillar } from "../objects/pillars/CyroBlastPillar";






export class TowerFactory {


    static createTower(x : number, y : number, width : number, height : number, towerType : string) {


        const towerData = getTowerData(towerType)

        switch (towerType) {
        case "basic":
            return new BasicPillar(x, y, width, height, towerData as TowerData<TowerStats, BasicPillarInfo>)
        case "ice":
            return new IcePillar(x, y, width, height, towerData as TowerData<IcePillarStats, IcePillarInfo>)
        case "ember":
            return new EmberPillar(x, y, width, height, towerData as TowerData<EmberPillarStats, EmberPillarInfo>)
        case "advanced":
            return new AdvancedPillar(x, y, width, height, towerData as TowerData<TowerStats, AdvancedPillarInfo>)
        case "poisonIvy":
            return new PoisonIvyPillar(x, y, width, height, towerData as TowerData<PoisonIvyPillarStats, PoisonIvyPillarInfo>)
        case "cyro":
            return new CyroBlastPillar(x, y, width, height, towerData as TowerData<CyroPillarStats, CyroPillarInfo>)
        case "missile":
            return new MissilePillar(x, y, width, height, towerData as TowerData<EmberPillarStats, EmberPillarInfo>)
        case "lightning":
            return new LightningPillar(x, y, width, height, towerData)
        case "dreadglass":
            return new DreadglassPillar(x, y, width, height, towerData as TowerData<DreadglassPillarStats, DreadglassPillarInfo>)
        case "ultimate":
            return new UltimatePillar(x, y, width, height, towerData as TowerData<TowerStats, UltimatePillarInfo>)
        default:
            return new BasicPillar(x, y, width, height, towerData as TowerData<TowerStats, BasicPillarInfo>)
        }
    }
}