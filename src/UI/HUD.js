import { Text, TextStyle } from "pixi.js"

export class HUD {
    constructor() {
        this.container = new PIXI.Container()
        this.container.width = 200
        this.container.height = 200
        this.container.x = 1100
        this.container.y = 0
    }

    setup(container) {
        container.addChild(this.container)
        const bgColor = new PIXI.Graphics()
        bgColor.beginFill(0x002222)
        bgColor.drawRect(0,0,1100*0.2,1100)
        bgColor.endFill()
        container.zIndex = 99999
        this.container.zIndex = 99999
        bgColor.zIndex = 99999
        this.container.addChild(bgColor)

        const moneyText = new Text("300", new TextStyle({fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFF00}))

        this.container.addChild(moneyText)

    }
}