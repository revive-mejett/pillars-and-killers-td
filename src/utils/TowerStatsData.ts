
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
                    range: 135,
                    damage: 15,
                    fireRate: 1,
                    cost: 50
                },
                {
                    range: 155,
                    damage: 25,
                    fireRate: 1,
                    cost: 100
                },
                {
                    range: 175,
                    damage: 35,
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
                    asset: towerIcons.icePillarTopLv1,
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
                        cost: 160,
                        speedMultiplier: 0.4
                    },
                    {
                        range: 155,
                        damage: 20,
                        fireRate: 1,
                        cost: 225,
                        speedMultiplier: 0.2
                    }
                ],
                visualUpgrades: [
                    {
                        assetIcon: towerIcons.icePillar,
                        asset: towerIcons.icePillarTopLv2,
                        tileColour: 0x001100,
                        beamWidth: 3
                    },
                    {
                        assetIcon: towerIcons.icePillar,
                        asset: towerIcons.icePillarTopLv3,
                        tileColour: 0x000066,
                        beamWidth: 4
                    },
                    {
                        assetIcon: towerIcons.icePillar,
                        asset: towerIcons.icePillarTopLv4,
                        tileColour: 0x990000,
                        beamWidth: 5
                    },
                    {
                        assetIcon: towerIcons.icePillar,
                        asset: towerIcons.icePillarTopLv5,
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
                    asset: towerIcons.emberPillarTopLv1,
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
                        damage: 30,
                        fireRate: 1.2,
                        cost: 600,
                        impactRadius: 90
                    },
                    {
                        range: 115,
                        damage: 40,
                        fireRate: 1.4,
                        cost: 1300,
                        impactRadius: 100
                    }
                ],
                visualUpgrades: [
                    {
                        assetIcon: towerIcons.emberPillar,
                        asset: towerIcons.emberPillarTopLv2,
                        tileColour: 0x004400,
                        flameColour: 0xEE4400,
                        fireballWidth: 7,
                        soundPitch: 0.5
                    },
                    {
                        assetIcon: towerIcons.emberPillar,
                        asset: towerIcons.emberPillarTopLv3,
                        tileColour: 0x000066,
                        flameColour: 0xEE7700,
                        fireballWidth: 8,
                        soundPitch: 0.6
                    },
                    {
                        assetIcon: towerIcons.emberPillar,
                        asset: towerIcons.emberPillarTopLv4,
                        tileColour: 0x990000,
                        flameColour: 0xEE8C00,
                        fireballWidth: 10,
                        soundPitch: 0.75
                    },
                    {
                        assetIcon: towerIcons.emberPillar,
                        asset: towerIcons.emberPillarTopLv5,
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
                    range: 190,
                    damage: 290,
                    fireRate: 0.4,
                    cost: 1200
                },
                towerInfo: {
                    assetIcon: towerIcons.advancedPillar,
                    asset: towerIcons.advancedPillarTopLv1,
                    info: {
                        title: "Sniper Pillar",
                        description: "This pillar may not have an actual gun, but it can pack a punch from a distance."
                    },
                    tileColour: 0x222222,
                    bulletSize: 4
                },
                upgrades: [
                    {
                        range: 210,
                        damage: 410,
                        fireRate: 0.5,
                        cost: 1700
                    },
                    {
                        range: 225,
                        damage: 565,
                        fireRate: 0.6,
                        cost: 3200
                    },
                    {
                        range: 250,
                        damage: 825,
                        fireRate: 0.7,
                        cost: 5000
                    },
                    {
                        range: 275,
                        damage: 1075,
                        fireRate: 0.8,
                        cost: 7000
                    }
                ],
                visualUpgrades: [{
                    assetIcon: towerIcons.advancedPillar,
                    asset: towerIcons.advancedPillarTopLv2,
                    tileColour: 0x004400,
                    bulletSize: 4
                },
                {
                    assetIcon: towerIcons.advancedPillar,
                    asset: towerIcons.advancedPillarTopLv3,
                    tileColour: 0x000066,
                    bulletSize: 4
                },
                {
                    assetIcon: towerIcons.advancedPillar,
                    asset: towerIcons.advancedPillarTopLv4,
                    tileColour: 0x990000,
                    bulletSize: 6
                },
                {
                    assetIcon: towerIcons.advancedPillar,
                    asset: towerIcons.advancedPillarTopLv5,
                    tileColour: 0x6600FF,
                    bulletSize: 6
                }
                ]
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
            "missile",
            {
                towerStats: {
                    range: 175,
                    damage: 1000,
                    fireRate: 0.3,
                    cost: 6000,
                    impactRadius: 60
                },
                towerInfo: {
                    assetIcon: towerIcons.missilePillar,
                    asset: towerIcons.missilePillarTopLv1,
                    info: {
                        title: "Missile Pillar",
                        description: "Puffs out heat seeking rockets that explodes and deals area damage. This pillar is your beat weapon against hordes of killers."
                    },
                    tileColour: 0x222222,
                    flameColour: 0xAAAAAA,
                    fireballWidth: 6,
                    soundPitch: 2.3
                },
                upgrades: [
                    {
                        range: 195,
                        damage: 2500,
                        fireRate: 0.3,
                        cost: 14000,
                        impactRadius: 70
                    },
                    {
                        range: 215,
                        damage: 5500,
                        fireRate: 0.4,
                        cost: 27000,
                        impactRadius: 80
                    },
                    {
                        range: 235,
                        damage: 9500,
                        fireRate: 0.5,
                        cost: 54000,
                        impactRadius: 90
                    },
                    {
                        range: 255,
                        damage: 15000,
                        fireRate: 0.5,
                        cost: 75000,
                        impactRadius: 100
                    }
                ],
                visualUpgrades: [
                    {
                        assetIcon: towerIcons.missilePillar,
                        asset: towerIcons.missilePillarTopLv2,
                        tileColour: 0x004400,
                        flameColour: 0x004400,
                        fireballWidth: 6,
                        soundPitch: 1.8
                    },
                    {
                        assetIcon: towerIcons.missilePillar,
                        asset: towerIcons.missilePillarTopLv3,
                        tileColour: 0x000066,
                        flameColour: 0x000066,
                        fireballWidth: 7,
                        soundPitch: 1.4
                    },
                    {
                        assetIcon: towerIcons.missilePillar,
                        asset: towerIcons.missilePillarTopLv4,
                        tileColour: 0x990000,
                        flameColour: 0x990000,
                        fireballWidth: 7,
                        soundPitch: 1.2
                    },
                    {
                        assetIcon: towerIcons.missilePillar,
                        asset: towerIcons.missilePillarTopLv5,
                        tileColour: 0x6600FF,
                        flameColour: 0x6600FF,
                        fireballWidth: 8,
                        soundPitch: 1
                    }
                ]
            }
        ],
        [
            "lightning",
            {
                towerStats: {
                    range: 140,
                    damage: 750,
                    fireRate: 2,
                    cost: 6000
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
                        damage: 1250,
                        fireRate: 3,
                        cost: 14000
                    },
                    {
                        range: 150,
                        damage: 1550,
                        fireRate: 5,
                        cost: 27000
                    },
                    {
                        range: 155,
                        damage: 2150,
                        fireRate: 7,
                        cost: 54000
                    },
                    {
                        range: 160,
                        damage: 2850,
                        fireRate: 8,
                        cost: 75000
                    }
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
            "dreadglass",
            {
                towerStats: {
                    range: 100,
                    damage: 200,
                    fireRate: 0.8,
                    cost: 3000,
                    armourReduction: 25
                },
                towerInfo: {
                    assetIcon: towerIcons.dreadglassPillar,
                    asset: towerIcons.dreadglassPillarTopLv1,
                    info: {
                        title: "Dreadglass Pillar",
                        description: "This pillar is made with dreadglass, a material known of causing a loss of hope. Sheds cursed dreadglass at killers, reducing their damage resistance."
                    },
                    tileColour: 0x222222,
                    bulletColour: 0xFF00C7,
                    bulletSize: 3,
                    soundPitch: 1.1
                },
                upgrades: [
                    {
                        range: 100,
                        damage: 400,
                        fireRate: 1,
                        cost: 7000,
                        armourReduction: 50
                    },
                    {
                        range: 125,
                        damage: 600,
                        fireRate: 1.2,
                        cost: 15000,
                        armourReduction: 140
                    },
                    {
                        range: 125,
                        damage: 800,
                        fireRate: 1.4,
                        cost: 28000,
                        armourReduction: 280
                    },
                    {
                        range: 150,
                        damage: 1000,
                        fireRate: 1.6,
                        cost: 45000,
                        armourReduction: 400
                    }
                ],
                visualUpgrades: [
                    {
                        assetIcon: towerIcons.dreadglassPillar,
                        asset: towerIcons.dreadglassPillarTopLv2,
                        tileColour: 0x004400,
                        bulletColour: 0xFF0099,
                        bulletSize: 4,
                        soundPitch: 1
                    },
                    {
                        assetIcon: towerIcons.dreadglassPillar,
                        asset: towerIcons.dreadglassPillarTopLv3,
                        tileColour: 0x000066,
                        bulletColour: 0xFF0077,
                        bulletSize: 5,
                        soundPitch: 0.9
                    },
                    {
                        assetIcon: towerIcons.dreadglassPillar,
                        asset: towerIcons.dreadglassPillarTopLv4,
                        tileColour: 0x990000,
                        bulletColour: 0xFF0011,
                        bulletSize: 6,
                        soundPitch: 0.8
                    },
                    {
                        assetIcon: towerIcons.dreadglassPillar,
                        asset: towerIcons.dreadglassPillarTopLv5,
                        tileColour: 0x6600FF,
                        bulletColour: 0x880033,
                        bulletSize: 7,
                        soundPitch: 0.7
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
                    cost: 280000
                },
                towerInfo: {
                    assetIcon: towerIcons.ultimatePillar,
                    asset: towerIcons.ultimatePillarTopLv1,
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
                        cost: 500000
                    }
                ],
                visualUpgrades: [{
                    assetIcon: towerIcons.ultimatePillar,
                    asset: towerIcons.ultimatePillarTopLv2,
                    tileColour: 0x6600FF,
                    beamColour: 0X00FFFF,
                    beamWidth: 4
                }]
            }
        ]
    ])
    return towerTypeStatMap.get(towerType) as TowerData<S, I>
}

const towerNameToKey = new Map([
    ["Basic Pillar", "basic"],
    ["Ice Pillar", "ice"],
    ["Ember Pillar", "ember"],
    ["Sniper Pillar", "advanced"],
    ["Poison Ivy Pillar", "poisonIvy"],
    ["Missile Pillar", "missile"],
    ["Lightning Pillar", "lightning"],
    ["Dreadglass Pillar", "dreadglass"],
    ["Ultimate Pillar", "ultimate"]
])

export { getTowerData, towerNameToKey }