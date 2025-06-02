import { AssetLoader } from "../core/AssetLoader"
import { UIHelper } from "../UI/UIHelper"
import { EventDispatcher } from "../utils/EventDispatcher"

import { Scene } from "./Scene"
import * as PIXI from "pixi.js";

const assetLoader = new AssetLoader()
const eventDispatcher = new EventDispatcher()


const version = "1.3.0"
const patchNotesTextContent = `
    * June 2, 2025 - 1.3.0\n
    - New Map: Null Camp! Harder than most maps.
    \n
    * March 9, 2025 - 1.2.0\n
    - Killer's Thrill and 1Pill2Nil released!
    - Added an outline when a pillar is selected to avoid accidentally placing pillars
    - Added Pillar Nicknames - Nicknames shown in selected pillars!
    \n
    * February 17, 2025 - 1.1.0\n
    - New Map! Heartbeat Onslaught\n
    \n
    * February 9, 2025 - 1.0.0\n
    - Pillars V.S. Killers released - enjoy building pillars!\n
`


export class MainMenu extends Scene {
    /**
     *
     */
    constructor(app : PIXI.Application) {
        super(app)
        this.container.sortableChildren = true
    }

    constructScene() {
        if (!assetLoader.otherImages) {
            throw new Error("Asset images not properly loaded")
        }

        const background = PIXI.Sprite.from(assetLoader.otherImages.mainTitleBackground)
        background.x = 0
        background.y = 0
        background.zIndex = 1

        this.container.addChild(background)
        const btnShift = 50


        const btnNewGame = UIHelper.createButton(0 + btnShift,750,400,100, "Start")
        this.container.addChild(btnNewGame)
        btnNewGame.zIndex = 1

        btnNewGame.on("pointerdown", () => eventDispatcher.fireEvent("newGameClick"))

        const btnSettings = UIHelper.createButton(0 + btnShift,900,300,50, "Settings")
        btnSettings.zIndex = 1
        this.container.addChild(btnSettings)
        btnSettings.on("pointerdown", () => eventDispatcher.fireEvent("settingsClick"))

        const btnTutorial = UIHelper.createButton(325 + btnShift,900,300,50, "Tutorial")
        btnTutorial.zIndex = 1
        this.container.addChild(btnTutorial)
        btnTutorial.on("pointerdown", () => eventDispatcher.fireEvent("tutorialClick"))

        const btnPillarKillerIndex = UIHelper.createButton(650 + btnShift,900,300,50, "Killers Info")
        btnPillarKillerIndex.zIndex = 1
        this.container.addChild(btnPillarKillerIndex)
        btnPillarKillerIndex.on("pointerdown", () => eventDispatcher.fireEvent("pillerKillerIndexClick"))

        const btnCredits = UIHelper.createButton(975 + btnShift,900,300,50, "Credits")
        btnCredits.zIndex = 1
        this.container.addChild(btnCredits)
        btnCredits.on("pointerdown", () => eventDispatcher.fireEvent("creditsClick"))


        //Version text
        const txtVersion = UIHelper.createText(0, 980, "V" + version, 20, "0X777777")
        txtVersion.zIndex = 2
        this.container.addChild(txtVersion)


        //patch notes pane
        const patchNotesContainer = new PIXI.Container()
        const patchNotesPaneWidth = 500
        const patchNotesPaneHeight = 700

        patchNotesContainer.x = 700
        patchNotesContainer.y = 20
        patchNotesContainer.zIndex = 2
        patchNotesContainer.visible = false
        const bgPatchNotesContainer = new PIXI.Graphics()
        bgPatchNotesContainer.beginFill(0x111111)
        bgPatchNotesContainer.drawRect(0, 0, patchNotesPaneWidth, patchNotesPaneHeight)
        bgPatchNotesContainer.endFill()
        patchNotesContainer.addChild(bgPatchNotesContainer)

        const txtPatchNotes = UIHelper.createText(0, 0, patchNotesTextContent, 20, "0XFFFF00", false, patchNotesPaneWidth)
        txtPatchNotes.zIndex = 2

        patchNotesContainer.addChild(txtPatchNotes)
        this.container.addChild(patchNotesContainer)
        const btnPatchNotes = UIHelper.createButton(1200, 20, 200, 40, `${version} notes`, 30, 0xFFFF00)
        btnPatchNotes.zIndex = 2
        this.container.addChild(btnPatchNotes)

        btnPatchNotes.on("pointerdown", () => patchNotesContainer.visible = !patchNotesContainer.visible)


    }
}