import { Difficulty, GameSaveData, MedalsSaveData } from "src/ts/types/GameSaveData"

export class GameDataManager {

    file1Data: GameSaveData | null = this.loadFromLocalStorage(1)
    file2Data: GameSaveData | null = this.loadFromLocalStorage(2)
    file3Data: GameSaveData | null = this.loadFromLocalStorage(3)
    file4Data: GameSaveData | null = this.loadFromLocalStorage(4)
    file5Data: GameSaveData | null = this.loadFromLocalStorage(5)
    file6Data: GameSaveData | null = this.loadFromLocalStorage(6)

    medalData: MedalsSaveData | null = this.loadMedalsFromLocalStorage()

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

    awardMedal(mapName: string, difficulty: Difficulty) {

        //if the user has not won before (no medals at all), set it first to an empty object
        if (!this.medalData) {
            this.medalData = {}
        }

        //if the user hasnt beaten the map before, create a new object entry with the key = to the map name
        if (!this.medalData[mapName]) {
            this.medalData[mapName] = {
                "Chill": false,
                "Normal": false,
                "Killer's Thrill": false,
                "1Pill2Nil": false
            }
        }

        //set the value to true (that means that the player has a medal for that difficulty)
        this.medalData[mapName][difficulty] = true
        localStorage.setItem("medals", JSON.stringify(this.medalData))
    }

    private loadFromLocalStorage(fileNumber : number) : GameSaveData | null {
        if (localStorage.getItem(fileNumber.toString())) {
            return JSON.parse(localStorage.getItem(fileNumber.toString())!) as GameSaveData
        }
        return null
    }

    private loadMedalsFromLocalStorage() : MedalsSaveData | null {
        if (localStorage.getItem("medals")) {
            return JSON.parse(localStorage.getItem("medals")!) as MedalsSaveData
        }
        return null
    }

    checkIfASavedFileExists() {
        return this.file1Data || this.file2Data || this.file3Data || this.file4Data || this.file5Data || this.file6Data
    }

    wipeAllData() {
        localStorage.removeItem("1")
        localStorage.removeItem("2")
        localStorage.removeItem("3")
        localStorage.removeItem("4")
        localStorage.removeItem("5")
        localStorage.removeItem("6")
    }

    wipeAllMedalData() {
        localStorage.removeItem("medals")
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