import GameSaveData from "src/ts/types/GameSaveData"

export class GameDataManager {

    file1Data: GameSaveData | null = this.loadFromLocalStorage(1)
    file2Data: GameSaveData | null = this.loadFromLocalStorage(2)
    file3Data: GameSaveData | null = this.loadFromLocalStorage(3)
    file4Data: GameSaveData | null = this.loadFromLocalStorage(4)
    file5Data: GameSaveData | null = this.loadFromLocalStorage(5)
    file6Data: GameSaveData | null = this.loadFromLocalStorage(6)
    static instance: GameDataManager


    constructor() {
        //singleton
        if (GameDataManager.instance) {
            return GameDataManager.instance
        }
        GameDataManager.instance = this
    }

    saveData(fileNumber: 1 | 2 | 3 | 4 | 5 | 6, saveData : GameSaveData) {
        localStorage.setItem(fileNumber.toString(), JSON.stringify(saveData))
    }

    loadFromLocalStorage(fileNumber : number) : GameSaveData | null {
        if (localStorage.getItem(fileNumber.toString())) {
            this.file1Data = JSON.parse(localStorage.getItem(fileNumber.toString())!) as GameSaveData
            return this.file1Data
        }
        return null
    }
}