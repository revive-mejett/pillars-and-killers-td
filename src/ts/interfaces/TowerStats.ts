interface TowerStats {
    range : number,
    damage: number,
    fireRate: number,
    cost: number,
}

interface IcePillarStats extends TowerStats {
    speedMultiplier : number
}


export { TowerStats, IcePillarStats }