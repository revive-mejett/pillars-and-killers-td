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
        this.buildPage("Pillars - Your Defense 1/2",
            [
                "To stop them, you must build \"Pillars\" that attack killers. They cost money, depending on their strength.",
                "Each pillar has its own purpose, where each may be used to beat all the killers. Some pillars have special attacks. For example, the Ice Pillar is capable of slowing killers down. Another pillar, called the Sniper Pillar which is orange in colour, is truly capable of shooting from a large distance!",
                "Pillars can also be upgraded or sold. Upgrading them may improve their damage, range, attack speed, or even their special properties such as slow. Selling pillars return 60% of its total cost, including all bought upgrades."
            ],
            "tutorial2");
        this.buildPage("Pillars - Your Defense 2/2",
            [
                "You start with a few pillars to begin with. However as the waves go by, you will need to rely on stronger ones.",
                "Due to their strength, they need to be researched, which costs money. Eventually, you will need to research pillars to advance your defence.",
                "The Basic Pillar is cheap but weak. As mentioned before, the Sniper Pillar has a huge range, while dealing great damage. The Lightning Pillar, which is among the most advanced pillars, is very powerful (and VERY expensive!)"
            ],
            "tutorial3", 0.8);
        this.buildPage("The Killers 1/2",
            [
                "Killers come in waves. You can tell when a new wave starts by looking at the \"Timeline\" on the left. Killing them rewards their bounty, allowing you to build/upgrade pillars and strengthen your defense.",
                "In this game, you will encounter a wide range of killers, varying in strength. You can click on a killer on the path to see its stats.",
                "Some move fast, others move slowly. Some enemies can even have armour, which can resist up to a certain amount of damage. Killing armoured killers requires pillars that can deal high damage at once.",
                "If a killer reaches the end of the path, you will lose lives depending on their damage. Losing all lives will cause defeat."
            ],
            "tutorial4", 1.2);
        this.buildPage("The Killers 2/2",
            [
                "As your defence advances, so do the killers too!",
                "You will encounter stronger killers the further you go in the later waves. The killers you meet later on will have more health, more damage (in other words, the number of lives you will lose upon reaching the end) and the most frightening, their armour/damage resistance.",
                "Remember to upgrade your pillars, and research if you can!"
            ],
            "tutorial5", 1.2);
        this.buildPage("Checkpoints",
            [
                "Every 20th wave, you will reach a checkpoint upon beating it. Checkpoints allow you to reload your progress from the end of the last wave.",
                "It happens automatically, and it will be saved on the slot you chose when you start/load."
            ],
            "tutorial6", 1.2);
        this.buildPage("Good Luck!",
            [
                "In order to win, you will need to beat 100 waves filled with fierce killers. Don't get killed by the killers!",
                "There are many maps to choose from, from easy to nearly impossible. Can you beat all maps? This tutorial covers the main fundamentals of the game. You will have to know the rest the hard way.",
                "Good luck out there. The city is counting on you!"
            ],
            "tutorial7", 1);
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
        const paneWidth = 700;
        const paneHeight = 800;
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
        pageRightPane.x = 700;
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