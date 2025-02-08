import * as PIXI from "pixi.js";
import { Scene } from "./Scene"
import { UIHelper } from "../UI/UIHelper";
import { EventDispatcher } from "../utils/EventDispatcher"
import { SettingsManager } from "../managers/SettingsManager";
import { AssetLoader } from "../core/AssetLoader";

const assetLoader = new AssetLoader()
const eventDispatcher = new EventDispatcher()
const settingsManager = new SettingsManager()

const sliderWidth = 500
const handleWidth = 20

export class OffGameSettings extends Scene {

    sliderHandleSfx: PIXI.Graphics
    sfxVolumeText: PIXI.Container = new PIXI.Container()

    sliderHandleMusic: PIXI.Graphics
    musicVolumeText: PIXI.Container = new PIXI.Container()

    boundSfxSliderDrag = this.onSfxSliderDrag.bind(this)
    boundMusicSliderDrag = this.onMusicSliderDrag.bind(this)

    /**
     *
     */
    constructor(app: PIXI.Application) {
        super(app)
        this.container.sortableChildren = true
        this.sliderHandleSfx = new PIXI.Graphics()
        this.sliderHandleMusic = new PIXI.Graphics()
    }

    constructScene(): void {
        const txtTitle = UIHelper.createText(650, 50, "Settings", 50, "0xFFFFFF", true);
        this.container.addChild(txtTitle);

        if (!assetLoader.otherImages) {
            throw new Error("Asset images not properly loaded")
        }
        const background = PIXI.Sprite.from(assetLoader.otherImages.mainTitleBackground)
        background.x = 0
        background.y = 0
        background.zIndex = -1
        background.alpha = 0.1

        this.container.addChild(background)


        const btnBackToMain = UIHelper.createButton(0, 25, 200, 50, "Back to Main Menu", 20, 0xFFFFFF);
        this.container.addChild(btnBackToMain);
        btnBackToMain.on("pointerdown", () => {
            eventDispatcher.fireEvent("btnBackToMainMenuClick");
        });

        this.createSfxSlider();
        this.createMusicSlider();


    }

    private createSfxSlider() {
        const sliderContainer = new PIXI.Container();
        this.container.addChild(sliderContainer);
        sliderContainer.x = 0;
        sliderContainer.y = 400;

        const slider = new PIXI.Graphics();
        slider.beginFill(0x001111);
        slider.drawRect(10, 10, 500, 10);
        slider.endFill();
        sliderContainer.addChild(slider);

        const handle = new PIXI.Graphics();
        handle.eventMode = "static";

        handle.lineStyle(3, 0x00FFFF);
        handle.beginFill(0x003333);
        handle.drawRect(0, 0, 20, 20);
        handle.endFill();
        sliderContainer.addChild(handle);
        handle.x = settingsManager.sfxVolumeMultiplier * sliderWidth;
        handle.y = 10 / 2;

        const heading = UIHelper.createText(10, -50, "SFX Volume", 40, "0x00FFFF", false);
        sliderContainer.addChild(heading);
        const volumeText = UIHelper.createText(slider.width + 100, handle.height / 2, settingsManager.sfxVolumeMultiplier.toFixed(1), 40, "0x00FFFF", true);
        sliderContainer.addChild(volumeText);
        this.sfxVolumeText = volumeText;
        this.sliderHandleSfx = handle

        handle.on("pointerdown", () => this.onSfxDragStart());
        handle.on("pointerup", () => this.onSfxDragEnd());
        handle.on("pointerupoutside", () => this.onSfxDragEnd());
    }

    private createMusicSlider() {
        const sliderContainer = new PIXI.Container();
        this.container.addChild(sliderContainer);
        sliderContainer.x = 0;
        sliderContainer.y = 700;

        const slider = new PIXI.Graphics();
        slider.beginFill(0x001111);
        slider.drawRect(10, 10, 500, 10);
        slider.endFill();
        sliderContainer.addChild(slider);

        const handle = new PIXI.Graphics();
        handle.eventMode = "static";

        handle.lineStyle(3, 0x00FFFF);
        handle.beginFill(0x003333);
        handle.drawRect(0, 0, 20, 20);
        handle.endFill();
        sliderContainer.addChild(handle);
        handle.x = settingsManager.musicVolumeMultiplier * sliderWidth;
        handle.y = 10 / 2;

        const heading = UIHelper.createText(10, -50, "Music Volume", 40, "0x00FFFF", false);
        sliderContainer.addChild(heading);
        const volumeText = UIHelper.createText(slider.width + 100, handle.height / 2, settingsManager.musicVolumeMultiplier.toFixed(1), 40, "0x00FFFF", true);
        sliderContainer.addChild(volumeText);
        this.musicVolumeText = volumeText;
        this.sliderHandleMusic = handle

        handle.on("pointerdown", () => this.onMusicDragStart());
        handle.on("pointerup", () => this.onMusicDragEnd());
        handle.on("pointerupoutside", () => this.onMusicDragEnd());
    }




    onSfxDragStart() {
        this.app.stage.eventMode = "static"
        this.app.stage.addEventListener("pointermove", this.boundSfxSliderDrag)
    }

    onSfxDragEnd() {
        this.app.stage.eventMode = "auto";
        this.app.stage.removeEventListener("pointermove", this.boundSfxSliderDrag)
    }

    onMusicDragStart() {
        this.app.stage.eventMode = "static"
        this.app.stage.addEventListener("pointermove", this.boundMusicSliderDrag)
    }

    onMusicDragEnd() {
        this.app.stage.eventMode = "auto";
        this.app.stage.removeEventListener("pointermove", this.boundMusicSliderDrag)
    }

    onSfxSliderDrag(e: PIXI.FederatedPointerEvent) {
        const local = this.container.toLocal(e.global)
        const leftPos = 10
        const rightPos = sliderWidth - handleWidth
        this.sliderHandleSfx.x = Math.max(leftPos, Math.min(local.x - handleWidth / 2, rightPos))

        const normalizedRight = rightPos - 10
        const normalizedHandlePos = this.sliderHandleSfx.x - 10

        let newVolume = normalizedHandlePos / normalizedRight
        newVolume = Math.floor(newVolume * 10) / 10
        settingsManager.sfxVolumeMultiplier = newVolume
        const textObj = this.sfxVolumeText.children[0] as PIXI.Text
        textObj.text = newVolume.toFixed(1)
    }

    onMusicSliderDrag(e: PIXI.FederatedPointerEvent) {
        const local = this.container.toLocal(e.global)
        const leftPos = 10
        const rightPos = sliderWidth - handleWidth
        this.sliderHandleMusic.x = Math.max(leftPos, Math.min(local.x - handleWidth / 2, rightPos))

        const normalizedRight = rightPos - 10
        const normalizedHandlePos = this.sliderHandleMusic.x - 10

        let newVolume = normalizedHandlePos / normalizedRight
        newVolume = Math.floor(newVolume * 10) / 10
        settingsManager.musicVolumeMultiplier = newVolume
        const textObj = this.musicVolumeText.children[0] as PIXI.Text
        textObj.text = newVolume.toFixed(1)
    }

}