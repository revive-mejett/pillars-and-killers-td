import * as PIXI from "pixi.js";
import { Scene } from "./Scene"
import { UIHelper } from "../UI/UIHelper";
import { EventDispatcher } from "../utils/EventDispatcher"
import { AssetLoader } from "../core/AssetLoader";


const eventDispatcher = new EventDispatcher()
const assetLoader = new AssetLoader()


export class Tutorial extends Scene {


    private currentPage: number = 0
    private pages: PIXI.Container[] = []

    private btnPrev: PIXI.Container = UIHelper.createButton(0, 25, 200, 50, "Previous", 20, 0xFFFFFF);
    private btnNext: PIXI.Container = UIHelper.createButton(0, 25, 200, 50, "Next", 20, 0xFFFFFF);
    /**
     *
     */
    constructor(app : PIXI.Application) {
        super(app)
        this.container.sortableChildren = true
    }

    constructScene(): void {
        const txtTitle = UIHelper.createText(500, 25, "Tutorial", 50, "0xFFFFFF", true);
        this.container.addChild(txtTitle);
        this.btnPrev.x = 0
        this.btnPrev.y = 900

        this.btnNext.x = 1200
        this.btnNext.y = 900


        this.buildPage("Killers on the loose!", "These are your enemies called \"Killers\". They are after you and your \"City\"! Your objective is to stop them from reaching the end of the path.", "tutorial1");
        this.buildPage("Pillars - Your Defense",
            [
                "To stop them, you must build \"Pillars\" that attack killers. They cost money, depending on their strength",
                "Each pillar has its own purpose, where each may be used to beat all the killers. Some pillars have special attacks. For example, the Ice Pillar is capable of slowing killers down. Another pillar, called the Sniper Pillar which is orange in colour, is truly capable of shooting from a large distance!",
            ],
            "tutorial2");
        this.buildPage("Pillars - Your Defense (part 2)", "You start with a few pillars to begin with. However as the waves go by, you will need to rely on stronger ones.", "tutorial3", 1.5)
        this.updatePageVisibility()



        const btnBackToMain = UIHelper.createButton(0, 25, 200, 50, "Back to Main Menu", 20, 0xFFFFFF);
        this.container.addChild(btnBackToMain);
        btnBackToMain.on("pointerdown", () => {
            eventDispatcher.fireEvent("btnBackToMainMenuClick");
        });


        this.container.addChild(this.btnPrev);
        this.btnPrev.on("pointerdown", () => {
            this.currentPage--
            this.updatePageVisibility()
        });

        this.container.addChild(this.btnNext);
        this.btnNext.on("pointerdown", () => {
            this.currentPage++
            this.updatePageVisibility()
        });

    }

    private updatePageVisibility() {
        this.pages.forEach(page => page.visible = false)
        this.pages[this.currentPage].visible = true
        this.btnNext.visible = this.currentPage < this.pages.length - 1
        this.btnPrev.visible = this.currentPage > 0
    }

    private buildPage(heading: string, helpText: string | string[], screenshotAsset?: string, screenshotScale?: number) {


        const page = new PIXI.Container();
        this.container.addChild(page);
        this.pages.push(page)

        const pageLeftPane = new PIXI.Container();
        page.addChild(pageLeftPane);
        const paneWidth = 800;
        const paneHeight = 700;
        pageLeftPane.x = 0;
        pageLeftPane.y = 150;

        const bgColour = new PIXI.Graphics();
        bgColour.drawRect(0, 0, paneWidth, paneHeight);
        bgColour.endFill();
        pageLeftPane.addChild(bgColour);

        const txtHeading = UIHelper.createText(0, 0, heading, 50, "0X00FFFF", false);
        pageLeftPane.addChild(txtHeading);

        if (typeof helpText === "string") {
            const txtDescription = UIHelper.createText(0, 100, helpText as string, 30, "0XFFFFFF", false, paneWidth);
            pageLeftPane.addChild(txtDescription);
        }
        if (Array.isArray(helpText)) {
            let yPad = 0
            helpText.forEach(text => {
                const txtDescription = UIHelper.createText(0, 100 + yPad, text, 30, "0XFFFFFF", false, paneWidth);
                pageLeftPane.addChild(txtDescription);
                yPad += txtDescription.height + 50
            })

        }


        const pageRightPane = new PIXI.Container();
        page.addChild(pageRightPane);
        const paneWidthRight = 800;
        const paneHeightRight = 700;
        pageRightPane.x = 800;
        pageRightPane.y = 150;

        const bgColourRight = new PIXI.Graphics();
        bgColour.drawRect(0, 0, paneWidthRight, paneHeightRight);
        bgColour.endFill();
        pageLeftPane.addChild(bgColourRight);

        if (screenshotAsset) {

            if (!assetLoader.otherImages || !assetLoader.otherImages[screenshotAsset]) {
                throw new Error("Tutorial screenshot failed to load!");
            }

            const screenshotSprite = PIXI.Sprite.from(assetLoader.otherImages[screenshotAsset]);

            if (screenshotScale) {
                screenshotSprite.scale.set(screenshotScale);
            }
            pageRightPane.addChild(screenshotSprite);

        }

    }
}