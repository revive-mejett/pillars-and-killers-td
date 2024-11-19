
import { AssetLoader } from "../core/AssetLoader";
import TowerData from "src/ts/types/TowerData";
import { TowerStats } from "src/ts/interfaces/TowerStats";
import { TowerInfo } from "src/ts/interfaces/TowerInfo";



const assetLoader = new AssetLoader()


function getTowerData<S extends TowerStats, I extends TowerInfo>(towerType: string): TowerData<S, I> {
    const towerIcons = assetLoader.towers
    if (!towerIcons) {
        throw new Error("Assets failed to load")
    }

    const towerTypeStatMap: Map<string, TowerData<TowerStats, TowerInfo>> = new Map([
        [
            "basic",
            {
                towerStats: {
                    range: 100,
                    damage: 5,
                    fireRate: 1,
                    cost: 25
                },
                towerInfo: {
                    assetIcon: towerIcons.basicPillarIcon,
                    asset: towerIcons.basicPillarTop,
                    info: {
                        title: "Basic Pillar",
                        description: "Cheap pillar good against weak killers. Decent hand pick for the early rounds."
                    },
                    tileColour: 0x222222,
                    bulletSize: 2
                },
                upgrades: [{
                    range: 125,
                    damage: 10,
                    fireRate: 1,
                    cost: 25
                },
                {
                    range: 150,
                    damage: 15,
                    fireRate: 1,
                    cost: 50
                },
                {
                    range: 175,
                    damage: 20,
                    fireRate: 1,
                    cost: 100
                },
                {
                    range: 250,
                    damage: 25,
                    fireRate: 1,
                    cost: 200
                }],
                visualUpgrades: [{
                    assetIcon: towerIcons.basicPillarIcon,
                    asset: towerIcons.basicPillarTop,
                    tileColour: 0x004400,
                    bulletSize: 2
                },
                {
                    assetIcon: towerIcons.basicPillarIcon,
                    asset: towerIcons.basicPillarTop,
                    tileColour: 0x000066,
                    bulletSize: 3
                },
                {
                    assetIcon: towerIcons.basicPillarIcon,
                    asset: towerIcons.basicPillarTop,
                    tileColour: 0x990000,
                    bulletSize: 4
                },
                {
                    assetIcon: towerIcons.basicPillarIcon,
                    asset: towerIcons.basicPillarTop,
                    tileColour: 0xE7E7E7,
                    bulletSize: 5
                }
                ]
            }
        ],
        [
            "ice",
            {
                towerStats: {
                    range: 220,
                    damage: 10,
                    fireRate: 1,
                    cost: 75,
                    speedMultiplier: 0.8
                },
                towerInfo: {
                    assetIcon: towerIcons.icePillar,
                    asset: towerIcons.icePillarTop,
                    info: {
                        title: "Ice Pillar",
                        description: "Fires chily ice bolts that slows down killers."
                    },
                    tileColour: 0x222222
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
                    damage: 8,
                    fireRate: 0.8,
                    cost: 150
                },
                towerInfo: {
                    assetIcon: towerIcons.emberPillar,
                    asset: towerIcons.emberPillarTop,
                    info: {
                        title: "Ember Pillar",
                        description: "Puffs out ember fireballs that damages nearby enemies upon impact"
                    },
                    tileColour: 0x222222
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
                    damage: 275,
                    fireRate: 2,
                    cost: 850
                },
                towerInfo: {
                    assetIcon: towerIcons.advancedPillar,
                    asset: towerIcons.advancedPillarTop,
                    info: {
                        title: "Advanced Pillar",
                        description: "This pillar is made with advanced material and can deal great damage to the strongest killers."
                    },
                    tileColour: 0x222222
                },
                upgrades: [],
                visualUpgrades: []
            }
        ],
        [
            "ultimate",
            {
                towerStats: {
                    range: 300,
                    damage: 37000,
                    fireRate: 0.2,
                    cost: 30000
                },
                towerInfo: {
                    assetIcon: towerIcons.ultimatePillar,
                    asset: towerIcons.ultimatePillarTop,
                    info: {
                        title: "Ultimate Pillar",
                        description: "The next generation using power currently being experimented..."
                    },
                    tileColour: 0x004400,
                    beamColour: 0xFF7700,
                    beamWidth: 2
                },
                upgrades: [
                    {
                        range: 500,
                        damage: 60000,
                        fireRate: 0.4,
                        cost: 77500
                    }
                ],
                visualUpgrades: [{
                    assetIcon: towerIcons.ultimatePillar,
                    asset: towerIcons.ultimatePillarTop,
                    tileColour: 0xE7E7E7,
                    beamColour: 0xFF00FF,
                    beamWidth: 4
                }]
            }
        ]
    ])
    return towerTypeStatMap.get(towerType) as TowerData<S, I>
}

export { getTowerData }

