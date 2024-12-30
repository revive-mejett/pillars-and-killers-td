import * as PIXI from "pixi.js";
import { Scene } from "./Scene"
import { UIHelper } from "../UI/UIHelper";
import { EventDispatcher } from "../utils/EventDispatcher"
import { SettingsManager } from "../managers/SettingsManager";
// import { AssetLoader } from "../core/AssetLoader";


const eventDispatcher = new EventDispatcher()
const settingsManager = new SettingsManager()

const sliderWidth = 500
const handleWidth = 20

export class OffGameSettings extends Scene {

    sliderHandleSfx : PIXI.Graphics
    sfxVolumeText: PIXI.Container = new PIXI.Container()
    /**
     *
     */
    constructor(app : PIXI.Application) {
        super(app)
        this.container.sortableChildren = true
        this.sliderHandleSfx = new PIXI.Graphics()
    }

    constructScene(): void {
        const txtTitle = UIHelper.createText(650, 50, "Settings", 50, "0xFFFFFF", true);
        this.container.addChild(txtTitle);


        const btnBackToMain = UIHelper.createButton(0, 25, 200, 50, "Back to Main Menu", 20, 0xFFFFFF);
        this.container.addChild(btnBackToMain);
        btnBackToMain.on("pointerdown", () => {
            eventDispatcher.fireEvent("btnBackToMainMenuClick");
        });

        const sfxSettingContainer = new PIXI.Container()
        this.container.addChild(sfxSettingContainer)
        sfxSettingContainer.x = 0
        sfxSettingContainer.y = 400

        const sliderSfx = new PIXI.Graphics()
        sliderSfx.beginFill(0x001111)
        sliderSfx.drawRect(10,10,500,10)
        sliderSfx.endFill()
        sfxSettingContainer.addChild(sliderSfx)

        const sliderHandleSfx = new PIXI.Graphics()
        sliderHandleSfx.eventMode = "static";

        sliderHandleSfx.lineStyle(3, 0x00FFFF)
        sliderHandleSfx.beginFill(0x003333)
        sliderHandleSfx.drawRect(0,0,20,20)
        sliderHandleSfx.endFill()
        sfxSettingContainer.addChild(sliderHandleSfx)
        sliderHandleSfx.x = settingsManager.sfxVolumeMultiplier * sliderWidth
        sliderHandleSfx.y = 10 / 2
        this.sliderHandleSfx = sliderHandleSfx
        console.log(settingsManager.musicVolumeMultiplier)

        const sfxVolumeHeading = UIHelper.createText(10, -50, "SFX Volume", 40, "0x00FFFF", false)
        sfxSettingContainer.addChild(sfxVolumeHeading)
        const sfxVolumeText = UIHelper.createText(sliderSfx.width + 100, sliderHandleSfx.height/2, settingsManager.sfxVolumeMultiplier.toFixed(1), 40, "0x00FFFF", true)
        sfxSettingContainer.addChild(sfxVolumeText)
        this.sfxVolumeText = sfxVolumeText

        sliderHandleSfx.on("pointerdown", () => this.onDragStart())
        sliderHandleSfx.on("pointerup", () => this.onDragEnd())
        sliderHandleSfx.on("pointerupoutside", () => this.onDragEnd())

        
    }

    onDragStart() {
        console.log("handle on drag")
        this.app.stage.eventMode = "static"
        this.app.stage.addEventListener("pointermove", this.onDrag.bind(this))
    }

    onDragEnd() {
        console.log("handle let go hand")
        this.app.stage.eventMode = "auto";
        this.app.stage.removeEventListener("pointermove", this.onDrag.bind(this))
    }

    onDrag(e: PIXI.FederatedPointerEvent) {
        const global = e.global

        const local = this.container.toLocal(global)


        const leftPos = 10
        const rightPos = sliderWidth - handleWidth

        this.sliderHandleSfx.x = Math.max(leftPos, Math.min(local.x - handleWidth/2, rightPos))


        const normalizedRight = rightPos - 10
        const normalizedHandlePos = this.sliderHandleSfx.x - 10

        let newVolume = normalizedHandlePos/normalizedRight
        newVolume = Math.floor(newVolume*10)/10
        settingsManager.sfxVolumeMultiplier = newVolume
        const textObj = this.sfxVolumeText.children[0] as PIXI.Text
        textObj.text = newVolume.toFixed(1)

    }
}