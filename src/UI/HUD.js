import { Assets, Text, TextStyle } from "pixi.js"

export class HUD {
    constructor() {
        this.container = new PIXI.Container()
        this.container.width = 200
        this.container.height = 200
        this.container.x = 1100
        this.container.y = 0
    }


    async setup(container) {
        container.addChild(this.container)
        const bgColor = new PIXI.Graphics()
        bgColor.beginFill(0x002222)
        bgColor.drawRect(0,0,1100*0.2,1100)
        bgColor.endFill()
        container.zIndex = 99999
        this.container.zIndex = 99999
        bgColor.zIndex = 99999
        this.container.addChild(bgColor)

        let iconBundle = await Assets.loadBundle("icons")
        console.log(iconBundle)

        const moneySprite = PIXI.Sprite.from(iconBundle.money)
        moneySprite.height = 100
        moneySprite.width = 100
        moneySprite.x = 0
        moneySprite.y = 100
        this.container.addChild(moneySprite)


        const moneyText = new Text("300", new TextStyle({fontFamily: "Times New Roman", fontSize: 40, fill: 0xFFFF00}))
        moneyText.x = 100
        moneyText.y = 0
        this.container.addChild(moneyText)



        const livesSprite = PIXI.Sprite.from(iconBundle.lives)
        livesSprite.height = 100
        livesSprite.width = 100
        livesSprite.x = 0
        livesSprite.y = 100
        this.container.addChild(livesSprite)

        const livesText = new Text("300", new TextStyle({fontFamily: "Times New Roman", fontSize: 40, fill: 0xFF00, align: 'center'}))
        livesText.x = 100
        livesText.y = 100
        this.container.addChild(livesText)

        // const livesIcon = new PIXI.Spr

    }
}