import { Text, TextStyle } from "pixi.js"
import { AssetLoader } from "../core/AssetLoader"
import { EventDispatcher } from "../utils/EventDispatcher"
import { UIHelper } from "./UIHelper"
import { InfoPanel } from "./InfoPanel"
import * as PIXI from "pixi.js";
import { GameState } from "src/core/GameState"
import TowerData from "src/ts/types/TowerData"
import { SettingsManager } from "../managers/SettingsManager"
import { AudioManager } from "../managers/AudioManager"

const assetLoader = new AssetLoader()
const eventDispatcher = new EventDispatcher()
const settingsManager = new SettingsManager()
const audioManager = new AudioManager()

export class HUD {
    container: PIXI.Container
    gamestate: GameState // change later
    moneyText: PIXI.Text | undefined
    livesText: PIXI.Text | undefined
    waveNumText: PIXI.Text | undefined
    nextWaveButton: PIXI.Container | undefined
    exitButton: PIXI.Container | undefined
    infoPanel: PIXI.Container | undefined
    currentTowerSelectedIcon: undefined
    towerSelectionButtons: { [key: string]: PIXI.Container<PIXI.DisplayObject> } | undefined

    tier2ResearchUI: PIXI.Container | undefined
    tier3ResearchUI: PIXI.Container | undefined
    tier4ResearchUI: PIXI.Container | undefined

    bgColor1: number = 0x110700
    bgColor2: number = 0x332200
    bgColor3: number = 0x221A00

    selectedOutlineContainer: PIXI.Container | undefined

    constructor(gamestate: GameState) {
        this.container = new PIXI.Container()
        this.gamestate = gamestate
        this.moneyText = undefined
        this.livesText = undefined
        this.waveNumText = undefined
        this.nextWaveButton = undefined

        this.infoPanel = undefined
        //current icon
        this.currentTowerSelectedIcon = undefined

        this.towerSelectionButtons = undefined

        if (gamestate.difficulty === "Chill") {
            this.bgColor1 = 0x001108
            this.bgColor2 = 0x003328
            this.bgColor3 = 0x00221A
        }
        if (gamestate.difficulty === "Normal") {
            this.bgColor1 = 0x110700
            this.bgColor2 = 0x332200
            this.bgColor3 = 0x221A00
        }
        if (gamestate.difficulty === "Killer's Thrill") {
            this.bgColor1 = 0x110002
            this.bgColor2 = 0x60000C
            this.bgColor3 = 0x350007
        }
        if (gamestate.difficulty === "1Pill2Nil") {
            this.bgColor1 = 0x000022
            this.bgColor2 = 0x0000FF
            this.bgColor3 = 0x000099
        }
    }

    setup(container: PIXI.Container) {
        container.addChild(this.container)
        this.container.x = 1100
        this.container.y = 0

        const bgColor = new PIXI.Graphics()
        bgColor.beginFill(this.bgColor1)
        bgColor.drawRect(0, 0, 1000 * 0.25, 1000)
        bgColor.endFill()
        container.zIndex = 99999
        this.container.zIndex = 99999
        bgColor.zIndex = 99999
        this.container.addChild(bgColor)

        const iconBundle = assetLoader.icons

        if (!iconBundle) {
            throw new Error("Icons asset may have not loaded properly Akshan")
        }


        //add money ui
        const moneyContainer = new PIXI.Container()
        moneyContainer.x = 0
        moneyContainer.y = 0
        this.container.addChild(moneyContainer)

        const moneyContainerbg = new PIXI.Graphics()
        moneyContainer.addChild(moneyContainerbg)
        moneyContainerbg.beginFill(this.bgColor2)
        moneyContainerbg.drawRect(0, 0, this.container.width, 100)
        moneyContainerbg.endFill()


        const moneySprite = PIXI.Sprite.from(iconBundle.money)
        moneySprite.height = 100
        moneySprite.width = 100
        moneySprite.x = 0
        moneySprite.y = 0
        moneyContainer.addChild(moneySprite)


        const moneyText = new Text("", new TextStyle({ fontFamily: "Times New Roman", fontSize: 40, fill: 0xFFFF00, align: "center" }))
        moneyText.x = 0 + moneySprite.width
        moneyText.y = (moneyContainer.height - moneyText.height) / 2;
        moneyContainer.addChild(moneyText)
        this.moneyText = moneyText

        //add lives ui
        const livesContainer = new PIXI.Container()
        livesContainer.x = 0
        livesContainer.y = 100
        this.container.addChild(livesContainer)

        const livesContainerbg = new PIXI.Graphics()
        livesContainer.addChild(livesContainerbg)
        livesContainerbg.beginFill(this.bgColor3)
        livesContainerbg.drawRect(0, 0, this.container.width, 100)
        livesContainerbg.endFill()


        const livesSprite = PIXI.Sprite.from(iconBundle["lives"])
        livesSprite.height = 100
        livesSprite.width = 100
        livesSprite.x = 0
        livesSprite.y = 0
        livesContainer.addChild(livesSprite)

        const livesText = new Text(this.gamestate.lives, new TextStyle({ fontFamily: "Times New Roman", fontSize: 40, fill: 0xFF00, align: "center" }))
        livesText.x = 0 + livesSprite.width
        livesText.y = (livesContainer.height - livesText.height) / 2;
        livesContainer.addChild(livesText)
        this.livesText = livesText

        //wave number ui
        const waveNumContainer = new PIXI.Container()
        waveNumContainer.x = 0
        waveNumContainer.y = 200
        this.container.addChild(waveNumContainer)

        const waveNumContainerbg = new PIXI.Graphics()
        waveNumContainer.addChild(waveNumContainerbg)
        waveNumContainerbg.beginFill(0x0A0055)
        waveNumContainerbg.drawRect(0, 0, this.container.width, 50)
        waveNumContainerbg.endFill()

        const waveNumText = new Text("Next Wave to begin!", new TextStyle({ fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFFFF, align: "center" }))
        waveNumText.x = (waveNumContainer.width - waveNumText.width) / 2;
        waveNumText.y = (waveNumContainer.height - waveNumText.height) / 2;
        waveNumContainer.addChild(waveNumText)
        this.waveNumText = waveNumText


        //buttons
        const btnNextWave = UIHelper.createButton(0, 1000 - 100, this.container.width, 48, "Next Wave", 40, 0x00FFFF, 0x000077)
        this.container.addChild(btnNextWave)

        const btnExit = UIHelper.createButton(0 + this.container.width / 2, 1000 - 30, this.container.width / 2, 25, "Exit", 25, 0xFFFFFF, 0x330000)
        this.container.addChild(btnExit)
        const confirmExit = UIHelper.createButton(0 + this.container.width / 2, 1000 - 30, this.container.width / 2, 25, "Confirm?", 25, 0xFF7777, 0x770000)
        this.container.addChild(confirmExit)
        confirmExit.visible = false

        btnNextWave.on("pointerdown", () => eventDispatcher.fireEvent("nextWaveBtnClick"))
        this.nextWaveButton = btnNextWave
        this.exitButton = btnExit

        btnExit.on("pointerdown", () => {
            confirmExit.visible = true
            btnExit.visible = false
            confirmExit.on("pointerdown", () => eventDispatcher.fireEvent("mainMenuReturn"))
            setTimeout(() => {
                confirmExit.off("pointerdown", () => {
                    confirmExit.visible = true
                    btnExit.visible = false
                });
                confirmExit.visible = false
                btnExit.visible = true
            }, 2000);
        });

        const musicSfxIconWidth = 30
        const btnMusicIcon = UIHelper.createIcon(iconBundle.musicActive, 0, 1000 - musicSfxIconWidth, 0x003300, musicSfxIconWidth, musicSfxIconWidth)
        const btnMusicMutedIcon = UIHelper.createIcon(iconBundle.musicMuted, 0, 1000 - musicSfxIconWidth, 0x330000, musicSfxIconWidth, musicSfxIconWidth)
        const btnSfxIcon = UIHelper.createIcon(iconBundle.sfxActive, musicSfxIconWidth, 1000 - musicSfxIconWidth, 0x003300, musicSfxIconWidth, musicSfxIconWidth)
        const btnSfxMutedIcon = UIHelper.createIcon(iconBundle.sfxMuted, musicSfxIconWidth, 1000 - musicSfxIconWidth, 0x330000, musicSfxIconWidth, musicSfxIconWidth)
        this.updateMusicSfxIconVisibility(btnMusicIcon, btnMusicMutedIcon, btnSfxIcon, btnSfxMutedIcon)

        this.container.addChild(btnMusicIcon)
        this.container.addChild(btnMusicMutedIcon)
        this.container.addChild(btnSfxIcon)
        this.container.addChild(btnSfxMutedIcon)
        btnMusicIcon.on("pointerdown", () => {
            //mutes the music
            audioManager.stopbackgroundMusic()
            settingsManager.useMusic = false
            this.updateMusicSfxIconVisibility(btnMusicIcon, btnMusicMutedIcon, btnSfxIcon, btnSfxMutedIcon)
        });
        btnMusicMutedIcon.on("pointerdown", () => {
            //plays the music
            settingsManager.useMusic = true
            audioManager.playbackgroundMusic(true)
            this.updateMusicSfxIconVisibility(btnMusicIcon, btnMusicMutedIcon, btnSfxIcon, btnSfxMutedIcon)
        });
        btnSfxIcon.on("pointerdown", () => {
            //mutes all sfx (sound effects)
            settingsManager.useAudio = false
            this.updateMusicSfxIconVisibility(btnMusicIcon, btnMusicMutedIcon, btnSfxIcon, btnSfxMutedIcon)
        });
        btnSfxMutedIcon.on("pointerdown", () => {
            //plays all sfx (sound effects)
            settingsManager.useAudio = true
            this.updateMusicSfxIconVisibility(btnMusicIcon, btnMusicMutedIcon, btnSfxIcon, btnSfxMutedIcon)
        });



        this.setUpTowerSelections()

    }


    private updateMusicSfxIconVisibility(btnMusicIcon: PIXI.Container<PIXI.DisplayObject>, btnMusicMutedIcon: PIXI.Container<PIXI.DisplayObject>, btnSfxIcon: PIXI.Container<PIXI.DisplayObject>, btnSfxMutedIcon: PIXI.Container<PIXI.DisplayObject>) {
        btnMusicIcon.visible = settingsManager.useMusic
        btnMusicMutedIcon.visible = !settingsManager.useMusic
        btnSfxIcon.visible = settingsManager.useAudio
        btnSfxMutedIcon.visible = !settingsManager.useAudio
    }

    //tower selection menu
    setUpTowerSelections() {

        this.towerSelectionButtons = {}
        const towerSpriteBundle = assetLoader.towers
        const towerSelectMenu = new PIXI.Container()
        towerSelectMenu.x = 0
        towerSelectMenu.y = 255
        this.container.addChild(towerSelectMenu)

        this.selectedOutlineContainer = new PIXI.Container()
        towerSelectMenu.addChild(this.selectedOutlineContainer)
        const selectedOutline = new PIXI.Graphics()
        selectedOutline.beginFill(0x000000, 0)
        selectedOutline.lineStyle(2, 0x00FFFF)
        selectedOutline.drawRect(0, 0, 80, 80)
        selectedOutline.endFill()
        this.selectedOutlineContainer.addChild(selectedOutline)
        this.selectedOutlineContainer.visible = false

        if (!towerSpriteBundle) {
            throw new Error("Asset tower sprite bundle not loaded properly")
        }

        const basicPillarButton = UIHelper.createIcon(towerSpriteBundle.basicPillarIcon, 0, 0, 0x111111)
        towerSelectMenu.addChild(basicPillarButton)
        const icePillarButton = UIHelper.createIcon(towerSpriteBundle.icePillar, 85, 0, 0x001122)
        towerSelectMenu.addChild(icePillarButton)
        const emberPillarButton = UIHelper.createIcon(towerSpriteBundle.emberPillar, 170, 0, 0x0D110A)
        towerSelectMenu.addChild(emberPillarButton)
        const poisonIvyPillarButton = UIHelper.createIcon(towerSpriteBundle.poisonIvyPillar, 0, 85, 0x112200)
        towerSelectMenu.addChild(poisonIvyPillarButton)
        const advancedPillarButton = UIHelper.createIcon(towerSpriteBundle.advancedPillar, 85, 85, 0x221100)
        towerSelectMenu.addChild(advancedPillarButton)
        const cyroBlastPillarButton = UIHelper.createIcon(towerSpriteBundle.cyroBlastPillar, 170, 85, 0x273333)
        towerSelectMenu.addChild(cyroBlastPillarButton)
        const missilePillarButton = UIHelper.createIcon(towerSpriteBundle.missilePillar, 0, 170, 0x222200)
        towerSelectMenu.addChild(missilePillarButton)
        const lightningPillarButton = UIHelper.createIcon(towerSpriteBundle.lightningPillar, 85, 170, 0x002222)
        towerSelectMenu.addChild(lightningPillarButton)
        const dreadglassPillarButton = UIHelper.createIcon(towerSpriteBundle.dreadglassPillar, 170, 170, 0x220000)
        towerSelectMenu.addChild(dreadglassPillarButton)
        const ultimatePillarButton = UIHelper.createIcon(towerSpriteBundle.ultimatePillar, 170, 255, 0x110011)
        towerSelectMenu.addChild(ultimatePillarButton)

        this.towerSelectionButtons.basic = basicPillarButton
        this.towerSelectionButtons.ice = icePillarButton
        this.towerSelectionButtons.ember = emberPillarButton
        this.towerSelectionButtons.advanced = advancedPillarButton
        this.towerSelectionButtons.cyro = cyroBlastPillarButton
        this.towerSelectionButtons.poisonIvy = poisonIvyPillarButton
        this.towerSelectionButtons.missile = missilePillarButton
        this.towerSelectionButtons.lightning = lightningPillarButton
        this.towerSelectionButtons.dreadglass = dreadglassPillarButton
        this.towerSelectionButtons.ultimate = ultimatePillarButton


        this.tier2ResearchUI = new PIXI.Container()
        towerSelectMenu.addChild(this.tier2ResearchUI)
        this.tier2ResearchUI.y = 85
        const btnResearchTier2 = UIHelper.createButton(0, 0, 250, 30, `Research Pillars: $${this.gamestate.tier2ResearchCost}`, 20, 0xFFFF00)
        this.tier2ResearchUI.addChild(btnResearchTier2)
        btnResearchTier2.on("pointerdown", () => {
            eventDispatcher.fireEvent("researchTier2Action")
        })

        this.tier3ResearchUI = new PIXI.Container()
        towerSelectMenu.addChild(this.tier3ResearchUI)
        this.tier3ResearchUI.y = 170
        const btnResearchTier3 = UIHelper.createButton(0, 0, 250, 30, `Research Pillars: $${this.gamestate.tier3ResearchCost}`, 20, 0xFFFF00)
        this.tier3ResearchUI.addChild(btnResearchTier3)
        btnResearchTier3.on("pointerdown", () => {
            eventDispatcher.fireEvent("researchTier3Action")
        })

        this.tier4ResearchUI = new PIXI.Container()
        towerSelectMenu.addChild(this.tier4ResearchUI)
        this.tier4ResearchUI.y = 255
        const btnResearchTier4 = UIHelper.createButton(0, 0, 250, 30, `Research Pillars: $${this.gamestate.tier4ResearchCost}`, 20, 0xFFFF00)
        this.tier4ResearchUI.addChild(btnResearchTier4)
        btnResearchTier4.on("pointerdown", () => {
            eventDispatcher.fireEvent("researchTier4Action")
        })

        this.updateTowerSelectionVisibility()
    }

    updateSelectedOutline(towerType: string | undefined) {

        //if tower is deselected, make it invisible
        if (!this.selectedOutlineContainer) {
            return
        }
        if (towerType === undefined) {
            this.selectedOutlineContainer.visible = false
            this.selectedOutlineContainer.x = 0
            this.selectedOutlineContainer.y = 0
            return
        }

        //make the outline visible and move its position to the location of the button of the the corresponding selected tower type
        this.selectedOutlineContainer.visible = true

        switch (towerType) {
        case "basic":
            this.selectedOutlineContainer.x = 0
            this.selectedOutlineContainer.y = 0
            break;
        case "ice":
            this.selectedOutlineContainer.x = 85
            this.selectedOutlineContainer.y = 0
            break;
        case "ember":
            this.selectedOutlineContainer.x = 170
            this.selectedOutlineContainer.y = 0
            break;
        case "poisonIvy":
            this.selectedOutlineContainer.x = 0
            this.selectedOutlineContainer.y = 85
            break;
        case "advanced":
            this.selectedOutlineContainer.x = 85
            this.selectedOutlineContainer.y = 85
            break;
        case "cyro":
            this.selectedOutlineContainer.x = 170
            this.selectedOutlineContainer.y = 85
            break;
        case "missile":
            this.selectedOutlineContainer.x = 0
            this.selectedOutlineContainer.y = 170
            break;
        case "lightning":
            this.selectedOutlineContainer.x = 85
            this.selectedOutlineContainer.y = 170
            break;
        case "dreadglass":
            this.selectedOutlineContainer.x = 170
            this.selectedOutlineContainer.y = 170
            break;
        case "ultimate":
            this.selectedOutlineContainer.x = 170
            this.selectedOutlineContainer.y = 255
            break;
        default:
            break;
        }
    }

    updateTowerSelectionVisibility() {
        if (!this.towerSelectionButtons || !this.tier2ResearchUI || !this.tier3ResearchUI || !this.tier4ResearchUI) {
            return
        }
        this.towerSelectionButtons.basic.visible = true
        this.towerSelectionButtons.ice.visible = true
        this.towerSelectionButtons.ember.visible = true

        this.towerSelectionButtons.advanced.visible = this.gamestate.researchLevel >= 2
        this.towerSelectionButtons.poisonIvy.visible = this.gamestate.researchLevel >= 2
        this.towerSelectionButtons.cyro.visible = this.gamestate.researchLevel >= 2

        this.towerSelectionButtons.missile.visible = this.gamestate.researchLevel >= 3
        this.towerSelectionButtons.lightning.visible = this.gamestate.researchLevel >= 3
        this.towerSelectionButtons.dreadglass.visible = this.gamestate.researchLevel >= 3

        this.towerSelectionButtons.ultimate.visible = this.gamestate.researchLevel >= 4

        //research UI
        this.tier2ResearchUI.visible = this.gamestate.researchLevel === 1
        this.tier3ResearchUI.visible = this.gamestate.researchLevel === 2
        this.tier4ResearchUI.visible = this.gamestate.researchLevel === 3
    }

    updateTowerDescriptionUI(towerData: TowerData) {

        this.clearInfoPanel()

        const towerInfoPanel = InfoPanel.createTowerGeneralInfoPanel(towerData)
        this.infoPanel?.addChild(towerInfoPanel)
    }

    clearInfoPanel() {
        if (this.infoPanel && this.infoPanel.parent) {
            this.container.removeChild(this.infoPanel)
        }
        this.infoPanel?.removeChildren()
        this.infoPanel?.destroy(true)

        this.infoPanel = new PIXI.Container()
        this.container.addChild(this.infoPanel)
        this.infoPanel.x = 1
        this.infoPanel.y = 600
    }
}


