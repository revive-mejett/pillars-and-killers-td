
import { AssetLoader } from "../core/AssetLoader";
import { AdvancedPillar } from "../objects/pillars/AdvancedPillar";
import { BasicPillar } from "../objects/pillars/BasicPillar";
import { IcePillar } from "../objects/pillars/IcePillar";
import { UltimatePillar } from "../objects/pillars/UltimatePillar";
import { EmberPillar } from "../objects/pillars/EmberPillar";
import TowerData from "src/ts/types/TowerData";
import { IcePillarStats, TowerStats } from "src/ts/interfaces/TowerStats";
import { IcePillarInfo, TowerInfo } from "src/ts/interfaces/TowerInfo";



const assetLoader = new AssetLoader()


export class TowerFactory {


    static createTower(x : number, y : number, width : number, height : number, towerType : string) {


        const towerData = this.getTowerData(towerType)
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

    static getTowerData<S extends TowerStats, I extends TowerInfo>(towerType : string) : TowerData<S, I> {
        const towerIcons = assetLoader.towers
        if (!towerIcons) {
            throw new Error("Assets failed to load")
        }
        const towerTypeStatMap : Map<string, TowerData<TowerStats, TowerInfo>>  = new Map([
            [
                "basic",
                {
                    towerStats: {
                        range: 150,
                        damage : 10,
                        fireRate : 1,
                        cost: 50
                    },
                    towerInfo : {
                        assetIcon: towerIcons.basicPillarIcon,
                        asset: towerIcons.basicPillarTop,
                        info: {
                            title: "Basic Pillar",
                            description: "Cheap pillar good against weak killers. Decent hand pick for the early rounds."
                        }
                    },
                    upgrades: [],
                    visualUpgrades: []
                }
            ],
            [
                "ice",
                {
                    towerStats : {
                        range: 220,
                        damage : 10,
                        fireRate : 1,
                        cost: 75,
                        speedMultiplier: 0.8
                    },
                    towerInfo : {
                        assetIcon: towerIcons.icePillar,
                        asset: towerIcons.icePillarTop,
                        info: {
                            title: "Ice Pillar",
                            description: "Fires chily ice bolts that slows down killers."
                        }
                    },
                    upgrades: [],
                    visualUpgrades: []
                }
            ],
            [
                "ember",
                {
                    towerStats: {
                        range: 85,
                        damage : 8,
                        fireRate : 0.8,
                        cost: 150
                    },
                    towerInfo : {
                        assetIcon: towerIcons.emberPillar,
                        asset: towerIcons.emberPillarTop,
                        info: {
                            title: "Ember Pillar",
                            description: "Puffs out ember fireballs that damages nearby enemies upon impact"
                        }
                    },
                    upgrades: [],
                    visualUpgrades: []
                }
            ],
            [
                "advanced",
                {
                    towerStats: {
                        range: 300,
                        damage : 275,
                        fireRate : 2,
                        cost: 850
                    },
                    towerInfo : {
                        assetIcon: towerIcons.advancedPillar,
                        asset: towerIcons.advancedPillarTop,
                        info: {
                            title: "Advanced Pillar",
                            description: "This pillar is made with advanced material and can deal great damage to the strongest killers."
                        }
                    },
                    upgrades: [],
                    visualUpgrades: []
                }
            ],
            [
                "ultimate",
                {
                    towerStats: {
                        range: 700,
                        damage : 8225,
                        fireRate : 0.4,
                        cost: 5800
                    },
                    towerInfo : {
                        assetIcon: towerIcons.ultimatePillar,
                        asset: towerIcons.ultimatePillarTop,
                        info: {
                            title: "Ultimate Pillar",
                            description: "The next generation using power currently being experimented..."
                        }
                    },
                    upgrades: [],
                    visualUpgrades: []
                }
            ]
        ])

        return towerTypeStatMap.get(towerType) as TowerData<S, I>
    }
}