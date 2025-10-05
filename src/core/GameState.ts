import { UIManager } from "src/managers/UIManager"
import { EventDispatcher } from "../utils/EventDispatcher"
import { GameDataManager } from "../managers/GameDataManager"
import { Difficulty, GameSaveData } from "../ts/types/GameSaveData"
import { productionWaves } from "../utils/WaveData"
import { calculateWaveValue } from "../utils/Calc"
import { killerThrillWaves } from "../utils/KillerThrillWaveData"

const eventDispatcher = new EventDispatcher()
const gameDataManager = new GameDataManager()
const developerTest = false
const developerOffSet = 0
const developerMoneyOffSet = 9999999


export class GameState {
    lives: number = 100
    money: number = 400
    uiManager?: UIManager
    startWave: number = 0 + developerOffSet
    mapName: string = "Walk in the Park"
    saveFileIndex: 1 | 2 | 3 | 4 | 5 | 6 = 1
    researchLevel: 1 | 2 | 3 | 4 = 1
    readonly tier2ResearchCost: number = 2000
    readonly tier3ResearchCost: number = 25000
    readonly tier4ResearchCost: number = 400000
    difficulty: Difficulty = "Normal"

    readonly sellValuePercentage : number = 60
    readonly killBountyMultiplier : number = 1

    constructor(fileNumber : 1 | 2 | 3 | 4 | 5 | 6,  savedData?: GameSaveData, mapTitle?: string, difficulty?: Difficulty) {

        if (savedData) {
            //load game
            this.lives = savedData.lives
            this.money = savedData.money
            this.startWave = savedData.checkpointWave + developerOffSet
            this.researchLevel = savedData.researchLevel
            this.mapName = savedData.map
            this.difficulty = savedData.difficulty || "Normal"
            this.saveFileIndex = savedData.saveFileIndex

            //handing saved data actions depending on difficulty
            if (this.difficulty === "Killer's Thrill" || this.difficulty === "1Pill2Nil") {
                gameDataManager.wipeSaveData(this.saveFileIndex)
            }
        } else {
            //new game
            this.saveFileIndex = fileNumber
            this.mapName = mapTitle || "Walk in the Park"
            this.difficulty = difficulty || "Normal"

            //initialize starting money/lives
            if (this.difficulty === "Chill") {
                this.money = 500
                this.lives = 200
            }
            if (this.difficulty === "Normal") {
                this.money = 400
                this.lives = 100
            }
            if (this.difficulty === "Killer's Thrill") {
                this.money = 250
                this.lives = 75
            }
            if (this.difficulty === "1Pill2Nil") {
                this.money = 200
                this.lives = 1
            }
        }

        if (this.difficulty === "Chill") {
            this.sellValuePercentage = 75
            this.killBountyMultiplier = 1.30
        }
        if (this.difficulty === "Normal") {
            this.sellValuePercentage = 70
            this.killBountyMultiplier = 1
        }
        if (this.difficulty === "Killer's Thrill") {
            this.sellValuePercentage = 65
            this.killBountyMultiplier = 0.55
        }
        if (this.difficulty === "1Pill2Nil") {
            this.sellValuePercentage = 60
            this.killBountyMultiplier = 0.50
        }

        //adding all wave values till the current wave: 20 for dev purposes (using production waves only)
        if (developerTest) {
            console.log("deve test")
            this.money += developerMoneyOffSet
            for (let i = 0; i < this.startWave || 0; i++) {
                if (killerThrillWaves[i] && productionWaves[i]) {
                    // this.money += calculateWaveValue(productionWaves[i])
                    this.money += calculateWaveValue(killerThrillWaves[i]) * this.killBountyMultiplier
                } else {
                    this.money += 20000
                }
            }
        }




        this.uiManager = undefined

        eventDispatcher.on("enemyReachEnd", this.loseLives.bind(this))
        eventDispatcher.on("purchaseSuccessful1", this.debitMoney.bind(this))
        eventDispatcher.on("moneyEarned", this.gainMoney.bind(this))



    }

    loseLives(damage : number) {

        if (developerTest) {
            return
        }
        this.lives -= damage
        if (this.lives <= 0) {
            this.lives = 0
            //handing saved data actions depending on difficulty
            if (this.difficulty === "Killer's Thrill" || this.difficulty === "1Pill2Nil") {
                gameDataManager.wipeSaveData(this.saveFileIndex)
                console.log("delete save")
            }
            eventDispatcher.fireEvent("defeat")
        }
        this.uiManager?.updateLives()
    }

    debitMoney(money : number) {
        this.money -= money
        this.uiManager?.updateMoney()
    }

    gainMoney(data: {source: "bounty" | "towerSell", money: number}) {
        let modifiedGain = data.money
        if (data.source === "towerSell") {
            modifiedGain = Math.floor(data.money * this.sellValuePercentage/100)
        }
        if (data.source === "bounty") {
            modifiedGain = Math.ceil(data.money * this.killBountyMultiplier)
        }
        this.money += modifiedGain
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