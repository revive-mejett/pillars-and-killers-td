import { AssetLoader } from "../core/AssetLoader.js";
import { AdvancedPillar } from "../objects/pillars/AdvancedPillar.js";
import { BasicPillar } from "../objects/pillars/BasicPillar.js";
import { IcePillar } from "../objects/pillars/IcePillar.js";
import { UltimatePillar } from "../objects/pillars/UltimatePillar.js";


const assetLoader = new AssetLoader()



export class TowerFactory {

    static createTower(x, y, width, height, towerType) {

        const towerIcons = assetLoader.towers
        const towerTypeStatMap = new Map([
            [
                "basic",
                {
                    asset: towerIcons.basicPillarTop,
                    info: {
                        title: "Basic Pillar",
                        description: "Cheap pillar good against weak killers. Decent hand pick for the early rounds."
                    },
                    range: 250,
                    damage: 10,
                    fireRate: 1,
                    cost: 1
                }
            ],
            [
                "ice",
                {
                    asset: towerIcons.frozenPillarTop,
                    info: {
                        title: "Ice Pillar",
                        description: "Fires chily ice bolts that slows down killers."
                    },
                    range: 220,
                    damage: 10,
                    fireRate: 1,
                    cost: 1,
                    speedMultiplier: 0.8
                }
            ],
            [
                "advanced",
                {
                    asset: towerIcons.advancedPillarTop,
                    info: {
                        title: "Advanced Pillar",
                        description: "This pillar is made with advanced material and can deal great damage to the strongest killers."
                    },
                    range: 300,
                    damage: 10,
                    fireRate: 1,
                    cost: 1
                }
            ],
            [
                "ultimate",
                {
                    asset: towerIcons.ultimatePillarTop,
                    info: {
                        title: "Ultimate Pillar",
                        description: "The next generation using power currently being experimented..."
                    },
                    range: 450,
                    damage: 220,
                    fireRate: 5,
                    cost: 5800
                }
            ]
        ])


        const towerStats = towerTypeStatMap.get(towerType)
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
}