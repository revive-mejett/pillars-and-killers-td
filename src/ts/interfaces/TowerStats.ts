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


export { TowerStats, IcePillarStats, EmberPillarStats }