import { Assets, Text, TextStyle } from "pixi.js"

export class HUD {


    constructor() {
        this.container = new PIXI.Container()
        this.container.width = 1000 * 0.25
        this.container.height = 1000
        this.container.x = 1000
        this.container.y = 0
    }

    async setup(container) {
        container.addChild(this.container)

        const bgColor = new PIXI.Graphics()
        bgColor.beginFill(0x000011)
        bgColor.drawRect(0,0,1000 * 0.25,1000)
        bgColor.endFill()
        container.zIndex = 99999
        this.container.zIndex = 99999
        bgColor.zIndex = 99999
        this.container.addChild(bgColor)

        const iconBundle = await Assets.loadBundle("icons")


        //add money ui
        const moneyContainer = new PIXI.Container()
        moneyContainer.x = 0
        moneyContainer.y = 0
        moneyContainer.width = 200
        moneyContainer.height = 100
        this.container.addChild(moneyContainer)

        const moneyContainerbg = new PIXI.Graphics()
        moneyContainer.addChild(moneyContainerbg)
        moneyContainerbg.beginFill(0x003300)
        moneyContainerbg.drawRect(0,0, this.container.width, 100)
        moneyContainerbg.endFill()
        

        const moneySprite = PIXI.Sprite.from(iconBundle.money)
        moneySprite.height = 100
        moneySprite.width = 100
        moneySprite.x = 0
        moneySprite.y = 0
        moneyContainer.addChild(moneySprite)


        const moneyText = new Text("1337", new TextStyle({fontFamily: "Times New Roman", fontSize: 40, fill: 0xFFFF00, align: 'center'}))
        moneyText.x = 0 + moneySprite.width
        moneyText.y = (moneyContainer.height - moneyText.height) / 2;
        moneyContainer.addChild(moneyText)

        //add lives ui
        const livesContainer = new PIXI.Container()
        livesContainer.x = 0
        livesContainer.y = 100
        livesContainer.width = 200
        livesContainer.height = 100
        this.container.addChild(livesContainer)

        const livesContainerbg = new PIXI.Graphics()
        livesContainer.addChild(livesContainerbg)
        livesContainerbg.beginFill(0x330000)
        livesContainerbg.drawRect(0,0, this.container.width, 100)
        livesContainerbg.endFill()


        const livesSprite = PIXI.Sprite.from(iconBundle.lives)
        livesSprite.height = 100
        livesSprite.width = 100
        livesSprite.x = 0
        livesSprite.y = 0
        livesContainer.addChild(livesSprite)

        const livesText = new Text("300", new TextStyle({fontFamily: "Times New Roman", fontSize: 40, fill: 0xFF00, align: 'center'}))
        livesText.x = 0 + livesSprite.width
        livesText.y = (livesContainer.height - livesText.height) / 2;
        livesContainer.addChild(livesText)

        //wave number ui
        const waveNumContainer = new PIXI.Container()
        waveNumContainer.x = 0
        waveNumContainer.y = 200
        waveNumContainer.width = 100
        waveNumContainer.height = 50
        this.container.addChild(waveNumContainer)

        const waveNumContainerbg = new PIXI.Graphics()
        waveNumContainer.addChild(waveNumContainerbg)
        waveNumContainerbg.beginFill(0x003333)
        waveNumContainerbg.drawRect(0,0, this.container.width, 50)
        waveNumContainerbg.endFill()

        const waveNumText = new Text("Wave 1", new TextStyle({fontFamily: "Times New Roman", fontSize: 40, fill: 0xFFFFFF, align: 'center'}))
        waveNumText.x = (waveNumContainer.width - waveNumText.width) / 2;
        waveNumText.y = (waveNumContainer.height - waveNumText.height) / 2;
        waveNumContainer.addChild(waveNumText)


        //buttons
        const nextWaveButtonContainer = new PIXI.Container()
        nextWaveButtonContainer.eventMode = "static"
        nextWaveButtonContainer.x = 0
        nextWaveButtonContainer.y = 1000 - 100
        nextWaveButtonContainer.width = 1000 * 0.25
        nextWaveButtonContainer.height = 50
        this.container.addChild(nextWaveButtonContainer)

        const nextWaveButtonContainerbg = new PIXI.Graphics()
        nextWaveButtonContainer.addChild(nextWaveButtonContainerbg)
        nextWaveButtonContainerbg.beginFill(0x003300)
        nextWaveButtonContainerbg.drawRect(0,0, this.container.width, 50)
        nextWaveButtonContainerbg.endFill()

        const nextWaveButtonText = new Text("Next Wave", new TextStyle({fontFamily: "Times New Roman", fontSize: 40, fill: 0xFFFFFF, align: 'center'}))
        nextWaveButtonText.x = (nextWaveButtonContainer.width - nextWaveButtonText.width) / 2;
        nextWaveButtonText.y = (nextWaveButtonContainer.height - nextWaveButtonText.height) / 2;
        nextWaveButtonContainer.addChild(nextWaveButtonText)

        nextWaveButtonContainer.on('pointerdown', () => console.log("next wave button clicked - not yet implemented"))

        const exitButtonContainer = new PIXI.Container()
        exitButtonContainer.eventMode = "static"
        exitButtonContainer.x = 0
        exitButtonContainer.y = 1000 - 50
        exitButtonContainer.width = 1000 * 0.25
        exitButtonContainer.height = 50
        this.container.addChild(exitButtonContainer)

        const exitButtonContainerbg = new PIXI.Graphics()
        exitButtonContainer.addChild(exitButtonContainerbg)
        exitButtonContainerbg.beginFill(0x330000)
        exitButtonContainerbg.drawRect(0,0, this.container.width, 50)
        exitButtonContainerbg.endFill()

        const exitButtonText = new Text("Exit", new TextStyle({fontFamily: "Times New Roman", fontSize: 40, fill: 0xFFFFFF, align: 'center'}))
        exitButtonText.x = (exitButtonContainer.width - exitButtonText.width) / 2;
        exitButtonText.y = (exitButtonContainer.height - exitButtonText.height) / 2;
        exitButtonContainer.addChild(exitButtonText)

        exitButtonContainer.on('pointerdown', () => console.log("exit button clicked - not yet implemented"))


        //tower selection menu
        const towerSpriteBundle = await Assets.loadBundle("towerSprites")

        const towerSelectMenu = new PIXI.Container()
        towerSelectMenu.x = 0
        towerSelectMenu.y = 400
        towerSelectMenu.width = 1000 * 0.25
        this.container.addChild(towerSelectMenu)

        const basicPillarButton = new PIXI.Container()
        basicPillarButton.eventMode = "static"
        basicPillarButton.width = 80
        basicPillarButton.height = 80
        basicPillarButton.x = 0
        basicPillarButton.y = 0
        towerSelectMenu.addChild(basicPillarButton)
        

        const basicPillarIconbg = new PIXI.Graphics()
        basicPillarIconbg.beginFill(0x111111)
        basicPillarIconbg.drawRect(0,0, 80, 80)
        basicPillarIconbg.endFill()
        basicPillarButton.addChild(basicPillarIconbg)
        
        const basicPillarIcon = PIXI.Sprite.from(towerSpriteBundle.basicPillarIcon)
        basicPillarIcon.width = 80
        basicPillarIcon.height = 80

        basicPillarButton.addChild(basicPillarIcon)
        



    }
}