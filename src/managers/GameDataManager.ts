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

    wipeSaveData(fileNumber: 1 | 2 | 3 | 4 | 5 | 6) {
        localStorage.removeItem(fileNumber.toString())
    }

    updateSavedFiles() {
        this.file1Data = this.loadFromLocalStorage(1)
        this.file2Data = this.loadFromLocalStorage(2)
        this.file3Data = this.loadFromLocalStorage(3)
        this.file4Data = this.loadFromLocalStorage(4)
        this.file5Data = this.loadFromLocalStorage(5)
        this.file6Data = this.loadFromLocalStorage(6)
    }
}