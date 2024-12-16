
export type TowerData = {
    towerType: string,
    x: number,
    y: number,
    level: number,
}


export type GameSaveData = {
    map: string,
    money: number,
    lives: number,
    researchLevel: 1 | 2 | 3 | 4,
    saveFileIndex: 1 | 2 | 3 | 4 | 5 | 6
    towers: TowerData[]
}
