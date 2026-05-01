import * as PIXI from "pixi.js"
import { Scene } from "./Scene"

/** Matches Game scene panel size so the loading UI aligns with the playfield frame. */
const PANEL_W = 1550
const PANEL_H = 1000

export class LoadingScene extends Scene {
    private barFill!: PIXI.Graphics
    private readonly barWidth = 560
    private readonly barHeight = 22
    private pctLabel!: PIXI.Text
    private statusLabel!: PIXI.Text

    constructor(app: PIXI.Application) {
        super(app)
    }

    constructScene(): void {
        this.container.x = Math.max(0, (this.app.screen.width - PANEL_W) / 2)

        const backdrop = new PIXI.Graphics()
        backdrop.beginFill(0x000000)
        backdrop.drawRoundedRect(0, 0, PANEL_W, PANEL_H, 4)
        backdrop.endFill()
        this.container.addChild(backdrop)

        const title = new PIXI.Text("Pillars V.S. Killers", new PIXI.TextStyle({
            fontFamily: "Times New Roman",
            fontSize: 52,
            fill: 0x00FFFF,
            fontWeight: "bold",
            dropShadow: true,
            dropShadowColor: 0x000000,
            dropShadowDistance: 2,
            dropShadowBlur: 3
        }))
        title.x = PANEL_W / 2 - title.width / 2
        title.y = 300
        this.container.addChild(title)

        const subtitle = new PIXI.Text("Loading...", new PIXI.TextStyle({
            fontFamily: "Times New Roman",
            fontSize: 28,
            fill: 0x886644
        }))
        subtitle.x = PANEL_W / 2 - subtitle.width / 2
        subtitle.y = 378
        this.container.addChild(subtitle)

        this.statusLabel = new PIXI.Text("Preparing assets…", new PIXI.TextStyle({
            fontFamily: "Times New Roman",
            fontSize: 22,
            fill: 0xaaaaaa
        }))
        this.statusLabel.x = PANEL_W / 2 - this.statusLabel.width / 2
        this.statusLabel.y = 430
        this.container.addChild(this.statusLabel)

        const bx = PANEL_W / 2 - this.barWidth / 2
        const by = 488
        const barBg = new PIXI.Graphics()
        barBg.lineStyle(2, 0x553366)
        barBg.beginFill(0x0F0033)
        barBg.drawRect(0, 0, this.barWidth, this.barHeight)
        barBg.endFill()
        barBg.x = bx
        barBg.y = by
        this.container.addChild(barBg)

        this.barFill = new PIXI.Graphics()
        this.barFill.x = bx + 2
        this.barFill.y = by + 2
        this.container.addChild(this.barFill)

        this.pctLabel = new PIXI.Text("0%", new PIXI.TextStyle({
            fontFamily: "Times New Roman",
            fontSize: 20,
            fill: 0xFFFF00
        }))
        this.pctLabel.x = PANEL_W / 2 - this.pctLabel.width / 2
        this.pctLabel.y = by + this.barHeight + 16
        this.container.addChild(this.pctLabel)

        this.setProgress(0)
    }

    setProgress(fraction: number, status?: string): void {
        const t = Math.max(0, Math.min(1, fraction))
        if (status !== undefined) {
            this.statusLabel.text = status
            this.statusLabel.x = PANEL_W / 2 - this.statusLabel.width / 2
        }
        const innerW = this.barWidth - 4
        const fillW = Math.max(0, innerW * t)
        this.barFill.clear()
        this.barFill.beginFill(0xcc4466)
        this.barFill.drawRoundedRect(0, 0, fillW, this.barHeight - 4, 4)
        this.barFill.endFill()

        const pct = Math.round(t * 100)
        this.pctLabel.text = `${pct}%`
        this.pctLabel.x = PANEL_W / 2 - this.pctLabel.width / 2
    }
}
