import TowerStats from "src/ts/types/TowerStats.js";
import { AssetLoader } from "../core/AssetLoader.js";
import { AdvancedPillar } from "../objects/pillars/AdvancedPillar";
import { BasicPillar } from "../objects/pillars/BasicPillar";
import { IcePillar } from "../objects/pillars/IcePillar";
import { UltimatePillar } from "../objects/pillars/UltimatePillar.js";


const assetLoader = new AssetLoader()



export class TowerFactory {


    static createTower(x : number, y : number, width : number, height : number, towerType : string) {


        const towerStats = this.getTowerStats(towerType)
        switch (towerType) {
        case "basic":
            return new BasicPillar(x, y, width, height, towerStats)
        case "ice":
            return new IcePillar(x, y, width, height, towerStats)
        case "advanced":
            return new AdvancedPillar(x, y, width, height, towerStats)
        case "ultimate":
            return new UltimatePillar(x, y, width, height, towerStats)
        default:
            return new BasicPillar(x, y, width, height, towerStats)
        }
    }

    static getTowerStats(towerType : string) : TowerStats {
        const towerIcons = assetLoader.towers
        const towerTypeStatMap = new Map([
            [
                "basic",
                {
                    assetIcon: towerIcons.basicPillarIcon,
                    asset: towerIcons.basicPillarTop,
                    info: {
                        title: "Basic Pillar",
                        description: "Cheap pillar good against weak killers. Decent hand pick for the early rounds."
                    },
                    range: 150,
                    damage: 10,
                    fireRate: 1,
                    cost: 50
                }
            ],
            [
                "ice",
                {
                    assetIcon: towerIcons.icePillar,
                    asset: towerIcons.icePillarTop,
                    info: {
                        title: "Ice Pillar",
                        description: "Fires chily ice bolts that slows down killers."
                    },
                    range: 220,
                    damage: 10,
                    fireRate: 1,
                    cost: 150,
                    speedMultiplier: 0.8
                }
            ],
            [
                "advanced",
                {
                    assetIcon: towerIcons.advancedPillar,
                    asset: towerIcons.advancedPillarTop,
                    info: {
                        title: "Advanced Pillar",
                        description: "This pillar is made with advanced material and can deal great damage to the strongest killers."
                    },
                    range: 300,
                    damage: 275,
                    fireRate: 2,
                    cost: 850
                }
            ],
            [
                "ultimate",
                {
                    assetIcon: towerIcons.ultimatePillar,
                    asset: towerIcons.ultimatePillarTop,
                    info: {
                        title: "Ultimate Pillar",
                        description: "The next generation using power currently being experimented..."
                    },
                    range: 700,
                    damage: 1024,
                    fireRate: 5,
                    cost: 5800
                }
            ]
        ])

        return towerTypeStatMap.get(towerType) as TowerStats
    }
}