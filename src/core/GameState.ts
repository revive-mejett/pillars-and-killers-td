import { UIManager } from "src/managers/UIManager"
import { EventDispatcher } from "../utils/EventDispatcher"
import { Difficulty, GameSaveData } from "../ts/types/GameSaveData"
import { productionWaves } from "../utils/WaveData"
import { calculateWaveValue } from "../utils/Calc"

const eventDispatcher = new EventDispatcher()
const developerTest = false
const developerOffSet = 0


export class GameState {
    lives: number = 100
    money: number = 400
    uiManager?: UIManager
    startWave: number = 0
    mapName: string = "Walk in the Park"
    saveFileIndex: 1 | 2 | 3 | 4 | 5 | 6 = 1
    researchLevel: 1 | 2 | 3 | 4 = 1
    readonly tier2ResearchCost: number = 2000
    readonly tier3ResearchCost: number = 25000
    readonly tier4ResearchCost: number = 400000
    difficulty: Difficulty = "Normal"

    constructor(fileNumber : 1 | 2 | 3 | 4 | 5 | 6,  savedData?: GameSaveData, mapTitle?: string, difficulty?: Difficulty) {

        if (savedData) {
            this.lives = savedData.lives
            this.money = savedData.money
            this.startWave = savedData.checkpointWave + developerOffSet
            this.researchLevel = savedData.researchLevel
            this.mapName = savedData.map
            this.saveFileIndex = savedData.saveFileIndex
        } else {
            this.saveFileIndex = fileNumber
            this.mapName = mapTitle || "Walk in the Park"
            this.difficulty = difficulty || "Normal"
        }

        //adding all wave values till the current wave: 20 for dev purposes (using production waves only)
        if (developerTest) {
            for (let i = 0; i < this.startWave || 0; i++) {
                if (productionWaves[i]) {
                    this.money += calculateWaveValue(productionWaves[i])
                } else {
                    this.money += 20000
                }
            }
        }


        this.uiManager = undefined

        eventDispatcher.on("enemyReachEnd", this.loseLives.bind(this))
        eventDispatcher.on("purchaseSuccessful1", this.debitMoney.bind(this))
        eventDispatcher.on("moneyEarned", this.gainMoney.bind(this))

        console.log(this.difficulty)
    }

    loseLives(damage : number) {

        this.lives -= damage
        if (this.lives <= 0) {
            this.lives = 0
            eventDispatcher.fireEvent("defeat")
        }
        this.uiManager?.updateLives()
    }

    debitMoney(money : number) {
        this.money -= money
        this.uiManager?.updateMoney()
    }

    gainMoney(money : number) {
        this.money += money
        this.uiManager?.updateMoney()
    }

    linkUiManager(uiManager : UIManager) {
        this.uiManager = uiManager
    }

    cleanUpResources() {
        eventDispatcher.clearListenersOfEvent("enemyReachEnd")
        eventDispatcher.clearListenersOfEvent("purchaseSuccessful1")
        eventDispatcher.clearListenersOfEvent("moneyEarned")
    }

}