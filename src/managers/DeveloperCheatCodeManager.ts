import { GameplayScene } from "../scenes/GameplayScene"
import { GameDataManager } from "./GameDataManager"

const STEAL_TROPHIES_COMMAND = "/steal-trophies-algotime"
const GIVE_CASH_COMMAND = "/give-cash-algotime"
const SET_WAVE_COMMAND_PREFIX = "/set-wave-algotime/"

const gameDataManager = new GameDataManager()

export class DeveloperCheatCodeManager {
    static instance: DeveloperCheatCodeManager

    private commandBuffer = ""
    private isCapturingCommand = false
    private activeGameplayScene?: GameplayScene

    private readonly handleKeyDown = (e: KeyboardEvent) => this.onKeyDown(e)

    constructor() {
        if (DeveloperCheatCodeManager.instance) {
            return DeveloperCheatCodeManager.instance
        }
        DeveloperCheatCodeManager.instance = this
    }

    init() {
        window.addEventListener("keydown", this.handleKeyDown)
    }

    setActiveGameplayScene(scene: GameplayScene | undefined) {
        this.activeGameplayScene = scene
    }

    destroy() {
        window.removeEventListener("keydown", this.handleKeyDown)
        this.clearCommandBuffer()
        this.activeGameplayScene = undefined
    }

    private onKeyDown(e: KeyboardEvent) {
        if (this.isTypingInFormField(e)) {
            return
        }

        if (e.key === "Escape") {
            if (this.isCapturingCommand) {
                e.preventDefault()
                this.clearCommandBuffer()
            }
            return
        }

        if (e.key === "Enter") {
            if (!this.isCapturingCommand) {
                return
            }
            e.preventDefault()
            this.executeCommand(this.commandBuffer.trim())
            this.clearCommandBuffer()
            return
        }

        if (e.key === "Backspace") {
            if (!this.isCapturingCommand) {
                return
            }
            e.preventDefault()
            this.commandBuffer = this.commandBuffer.slice(0, -1)
            if (this.commandBuffer.length === 0) {
                this.isCapturingCommand = false
            }
            return
        }

        if (e.key === "/" && !this.isCapturingCommand && !e.ctrlKey && !e.metaKey && !e.altKey) {
            this.isCapturingCommand = true
            this.commandBuffer = "/"
            e.preventDefault()
            return
        }

        if (!this.isCapturingCommand) {
            return
        }

        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            this.commandBuffer += e.key
            e.preventDefault()
        }
    }

    private isTypingInFormField(e: KeyboardEvent) {
        const target = e.target
        if (!(target instanceof HTMLElement)) {
            return false
        }
        const tag = target.tagName
        return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable
    }

    private clearCommandBuffer() {
        this.commandBuffer = ""
        this.isCapturingCommand = false
    }

    private executeCommand(command: string) {
        if (command === STEAL_TROPHIES_COMMAND) {
            gameDataManager.awardAllMedals()
            return
        }

        if (command === GIVE_CASH_COMMAND) {
            this.activeGameplayScene?.applyDeveloperCash()
            return
        }

        if (command.startsWith(SET_WAVE_COMMAND_PREFIX)) {
            const waveNumberText = command.slice(SET_WAVE_COMMAND_PREFIX.length)
            if (!/^\d+$/.test(waveNumberText)) {
                return
            }

            const waveNumber = parseInt(waveNumberText, 10)
            if (waveNumber < 1 || waveNumber > 9999) {
                return
            }

            this.activeGameplayScene?.applyDeveloperSetWave(waveNumber)
        }
    }
}
