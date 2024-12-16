import { GameSaveData } from "src/ts/types/GameSaveData"

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

    private loadFromLocalStorage(fileNumber : number) : GameSaveData | null {
        if (localStorage.getItem(fileNumber.toString())) {
            return JSON.parse(localStorage.getItem(fileNumber.toString())!) as GameSaveData
        }
        return null
    }

    checkIfASavedFileExists() {
        return this.file1Data || this.file2Data || this.file3Data || this.file4Data || this.file5Data || this.file6Data
    }

    wipeAllData() {
        localStorage.clear()
    }
}