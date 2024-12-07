
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
                    tileColour: 0x6600FF,
                    bulletSize: 5
                }
                ]
            }
        ],
        [
            "ice",
            {
                towerStats: {
                    range: 120,
                    damage: 7,
                    fireRate: 1,
                    cost: 50,
                    speedMultiplier: 0.8
                },
                towerInfo: {
                    assetIcon: towerIcons.icePillar,
                    asset: towerIcons.icePillarTop,
                    info: {
                        title: "Ice Pillar",
                        description: "Fires chily ice bolts that slows down killers."
                    },
                    tileColour: 0x222222,
                    beamWidth: 3
                },
                upgrades: [
                    {
                        range: 130,
                        damage: 9,
                        fireRate: 1,
                        cost: 50,
                        speedMultiplier: 0.7
                    },
                    {
                        range: 140,
                        damage: 13,
                        fireRate: 1,
                        cost: 120,
                        speedMultiplier: 0.55
                    },
                    {
                        range: 150,
                        damage: 16,
                        fireRate: 1,
                        cost: 260,
                        speedMultiplier: 0.4
                    },
                    {
                        range: 155,
                        damage: 20,
                        fireRate: 1,
                        cost: 200,
                        speedMultiplier: 0.2
                    }
                ],
                visualUpgrades: [
                    {
                        assetIcon: towerIcons.icePillar,
                        asset: towerIcons.icePillarTop,
                        tileColour: 0x004400,
                        beamWidth: 3
                    },
                    {
                        assetIcon: towerIcons.icePillar,
                        asset: towerIcons.icePillarTop,
                        tileColour: 0x000066,
                        beamWidth: 4
                    },
                    {
                        assetIcon: towerIcons.icePillar,
                        asset: towerIcons.icePillarTop,
                        tileColour: 0x990000,
                        beamWidth: 5
                    },
                    {
                        assetIcon: towerIcons.icePillar,
                        asset: towerIcons.icePillarTop,
                        tileColour: 0x6600FF,
                        beamWidth: 6
                    }
                ]
            }
        ],
        [
            "ember",
            {
                towerStats: {
                    range: 85,
                    damage: 8,
                    fireRate: 0.8,
                    cost: 100,
                    impactRadius: 60
                },
                towerInfo: {
                    assetIcon: towerIcons.emberPillar,
                    asset: towerIcons.emberPillarTop,
                    info: {
                        title: "Ember Pillar",
                        description: "Puffs out ember fireballs that damages nearby enemies upon impact"
                    },
                    tileColour: 0x222222,
                    flameColour: 0xEE0000,
                    fireballWidth: 6,
                    soundPitch: 0.4
                },
                upgrades: [
                    {
                        range: 85,
                        damage: 14,
                        fireRate: 0.8,
                        cost: 150,
                        impactRadius: 70
                    },
                    {
                        range: 95,
                        damage: 21,
                        fireRate: 1,
                        cost: 300,
                        impactRadius: 80
                    },
                    {
                        range: 105,
                        damage: 28,
                        fireRate: 1.2,
                        cost: 600,
                        impactRadius: 90
                    },
                    {
                        range: 115,
                        damage: 35,
                        fireRate: 1.4,
                        cost: 1300,
                        impactRadius: 100
                    }
                ],
                visualUpgrades: [
                    {
                        assetIcon: towerIcons.emberPillar,
                        asset: towerIcons.emberPillarTop,
                        tileColour: 0x004400,
                        flameColour: 0xEE4400,
                        fireballWidth: 7,
                        soundPitch: 0.5
                    },
                    {
                        assetIcon: towerIcons.emberPillar,
                        asset: towerIcons.emberPillarTop,
                        tileColour: 0x000066,
                        flameColour: 0xEE7700,
                        fireballWidth: 8,
                        soundPitch: 0.6
                    },
                    {
                        assetIcon: towerIcons.emberPillar,
                        asset: towerIcons.emberPillarTop,
                        tileColour: 0x990000,
                        flameColour: 0xEE8C00,
                        fireballWidth: 10,
                        soundPitch: 0.75
                    },
                    {
                        assetIcon: towerIcons.emberPillar,
                        asset: towerIcons.emberPillarTop,
                        tileColour: 0x6600FF,
                        flameColour: 0xFFC700,
                        fireballWidth: 12,
                        soundPitch: 0.9
                    }
                ]
            }
        ],
        [
            "advanced",
            {
                towerStats: {
                    range: 300,
                    damage: 275,
                    fireRate: 2,
                    cost: 850,
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
            "poisonIvy",
            {
                towerStats: {
                    range: 120,
                    damage: 20,
                    fireRate: 1,
                    cost: 800,
                    extraDamage: 10
                },
                towerInfo: {
                    assetIcon: towerIcons.poisonIvyPillar,
                    asset: towerIcons.poisonIvyTopLv1,
                    info: {
                        title: "Poison Ivy Pillar",
                        description: "Its stinging leaves make killers irritated, making them vulnerable to other attacks."
                    },
                    tileColour: 0x222222,
                    leafColour: 0XC7FFC7,
                    soundPitch: 2
                },
                upgrades: [{
                    range: 140,
                    damage: 30,
                    fireRate: 1,
                    cost: 1500,
                    extraDamage: 20
                },
                {
                    range: 160,
                    damage: 40,
                    fireRate: 1,
                    cost: 2100,
                    extraDamage: 45
                },
                {
                    range: 170,
                    damage: 70,
                    fireRate: 1,
                    cost: 3500,
                    extraDamage: 75
                },
                {
                    range: 180,
                    damage: 90,
                    fireRate: 1,
                    cost: 6000,
                    extraDamage: 120
                }],
                visualUpgrades: [{
                    assetIcon: towerIcons.poisonIvyPillar,
                    asset: towerIcons.poisonIvyTopLv2,
                    tileColour: 0x004400,
                    leafColour: 0XA6FFA6,
                    soundPitch: 1.25
                },
                {
                    assetIcon: towerIcons.poisonIvyPillar,
                    asset: towerIcons.poisonIvyTopLv3,
                    tileColour: 0x000066,
                    leafColour: 0X77FF77,
                    soundPitch: 1
                },
                {
                    assetIcon: towerIcons.poisonIvyPillar,
                    asset: towerIcons.poisonIvyTopLv4,
                    tileColour: 0x990000,
                    leafColour: 0X44FF44,
                    soundPitch: 0.8
                },
                {
                    assetIcon: towerIcons.poisonIvyPillar,
                    asset: towerIcons.poisonIvyTopLv5,
                    tileColour: 0x6600FF,
                    leafColour: 0X00FF00,
                    soundPitch: 0.6
                }
                ]
            }
        ],
        [
            "lightning",
            {
                towerStats: {
                    range: 140,
                    damage: 130,
                    fireRate: 2,
                    cost: 1000
                },
                towerInfo: {
                    assetIcon: towerIcons.lightningPillar,
                    asset: towerIcons.lightningPillarTopLv1,
                    info: {
                        title: "Lightning Pillar",
                        description: "Relentless pillar that zaps \"lightning\" bolts at killers that dare to enter its range"
                    },
                    tileColour: 0x222222
                },
                upgrades: [
                    {
                        range: 145,
                        damage: 370,
                        fireRate: 3,
                        cost: 4200
                    },
                    {
                        range: 150,
                        damage: 650,
                        fireRate: 5,
                        cost: 7700
                    },
                    {
                        range: 155,
                        damage: 1225,
                        fireRate: 7,
                        cost: 10500
                    },
                    {
                        range: 160,
                        damage: 1775,
                        fireRate: 12,
                        cost: 24000
                    },
                ],
                visualUpgrades: [
                    {
                        assetIcon: towerIcons.lightning_pillar,
                        asset: towerIcons.lightningPillarTopLv2,
                        tileColour: 0x004400
                    },
                    {
                        assetIcon: towerIcons.lightning_pillar,
                        asset: towerIcons.lightningPillarTopLv3,
                        tileColour: 0x000066
                    },
                    {
                        assetIcon: towerIcons.lightning_pillar,
                        asset: towerIcons.lightningPillarTopLv4,
                        tileColour: 0x990000
                    },
                    {
                        assetIcon: towerIcons.lightning_pillar,
                        asset: towerIcons.lightningPillarTopLv5,
                        tileColour: 0x6600FF
                    }
                ]
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
                    tileColour: 0x6600FF,
                    beamColour: 0xFF00FF,
                    beamWidth: 4
                }]
            }
        ]
    ])
    return towerTypeStatMap.get(towerType) as TowerData<S, I>
}

export { getTowerData }