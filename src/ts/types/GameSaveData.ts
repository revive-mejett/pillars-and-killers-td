
export type TowerData = {
    towerType: string,
    x: number,
    y: number,
    level: number,
    currentTargetingIndex: number
}

export type Difficulty = "Chill" | "Normal" | "Killer's Thrill" | "1Pill2Nil"


export type GameSaveData = {
    map: string,
    money: number,
    lives: number,
    researchLevel: 1 | 2 | 3 | 4,
    saveFileIndex: 1 | 2 | 3 | 4 | 5 | 6
    towers: TowerData[]
    checkpointWave: number,
    difficulty?: Difficulty
}

export type MedalsSaveData = {
    [key: string] : {
        "Chill" : boolean,
        "Normal" : boolean,
        "Killer's Thrill" : boolean,
        "1Pill2Nil" : boolean
    }
}