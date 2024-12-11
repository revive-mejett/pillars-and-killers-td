interface TowerStats {
    range : number,
    damage: number,
    fireRate: number,
    cost: number,
}

interface IcePillarStats extends TowerStats {
    speedMultiplier : number
}

interface EmberPillarStats extends TowerStats {
    impactRadius : number
}

interface PoisonIvyPillarStats extends TowerStats {
    extraDamage: number
}

interface DreadglassPillarStats extends TowerStats {
    armourReduction: number
}


export { TowerStats, IcePillarStats, EmberPillarStats, PoisonIvyPillarStats, DreadglassPillarStats }