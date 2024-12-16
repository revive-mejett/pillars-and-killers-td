
type TowerData = {
    towerType: string,
    x: number,
    y: number,
    level: number,
}


type GameSaveData = {
    map: string,
    money: number,
    towers: TowerData[]
}

export default GameSaveData