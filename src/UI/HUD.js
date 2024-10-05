import { Assets, Text, TextStyle } from "pixi.js"

export class HUD {


    constructor() {
        this.container = new PIXI.Container()
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

        const livesText = new Text("258", new TextStyle({fontFamily: "Times New Roman", fontSize: 40, fill: 0xFF00, align: 'center'}))
        livesText.x = 0 + livesSprite.width
        livesText.y = (livesContainer.height - livesText.height) / 2;
        livesContainer.addChild(livesText)

        //wave number ui
        const waveNumContainer = new PIXI.Container()
        waveNumContainer.x = 0
        waveNumContainer.y = 200
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


        const towerSpriteBundle = await Assets.loadBundle("towerSprites")

        // tower description pane
        const towerInfoPanel = new PIXI.Container()
        towerInfoPanel.x = 1
        towerInfoPanel.y = 600

        this.container.addChild(towerInfoPanel)

        const infoPanelOutline = new PIXI.Graphics()
        infoPanelOutline.lineStyle(3, 0x000077)
        infoPanelOutline.drawRect(0,0, 1000 * 0.25, 300)
        towerInfoPanel.addChild(infoPanelOutline)

        const padding = 5
        
        const currentTowerIcon = createTowerIcon(towerSpriteBundle.basicPillarIcon, padding, padding, 0x000000, false)
        towerInfoPanel.addChild(currentTowerIcon)
        const towerNameText = new Text("basic pillar", new TextStyle({fontFamily: "Times New Roman", fontSize: 30, fill: 0xFFFFFF, align: 'center'}))
        towerNameText.x = 90 + padding;
        towerNameText.y = 0 + padding;
        towerInfoPanel.addChild(towerNameText)
        const towerPriceText = new Text("$220", new TextStyle({fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFF00, align: 'center', wordWrap: true, wordWrapWidth: 1000 * 0.25}))
        towerPriceText.x = 90 + padding;
        towerPriceText.y = 40 + padding;
        towerInfoPanel.addChild(towerPriceText)
        const towerDescriptionText = new Text("Cheap pillar for weak killers. Decent hand pick for the early rounds", new TextStyle({fontFamily: "Times New Roman", fontSize: 20, fill: 0xFFFFFF, align: 'center', wordWrap: true, wordWrapWidth: 1000 * 0.25}))
        towerDescriptionText.x = padding;
        towerDescriptionText.y = 100;
        towerInfoPanel.addChild(towerDescriptionText)

        ///
        
        

        //tower selection menu
        const towerSelectMenu = new PIXI.Container()
        towerSelectMenu.x = 0
        towerSelectMenu.y = 400
        console.log(towerSelectMenu)
        this.container.addChild(towerSelectMenu)
        

        
        const basicPillarButton = createTowerIcon(towerSpriteBundle.basicPillarIcon, 0, 0, 0x111111, true)
        towerSelectMenu.addChild(basicPillarButton)
        const frozenPillarButton = createTowerIcon(towerSpriteBundle.frozenPillar, 80, 0, 0x001122, true)
        towerSelectMenu.addChild(frozenPillarButton)
        const advancedPillarButton = createTowerIcon(towerSpriteBundle.advancedPillar, 160, 0, 0x221100, true)
        towerSelectMenu.addChild(advancedPillarButton)
        const ultimatePillarButton = createTowerIcon(towerSpriteBundle.ultimatePillar, 0, 80, 0x110011, true)
        towerSelectMenu.addChild(ultimatePillarButton)
        
    }

    
}


//helper function to create a tower button
function createTowerIcon(spriteAsset, xPosition, yPosition, hexBackground, isButton) {
    const towerButton = new PIXI.Container()
    towerButton.eventMode = "static"
    towerButton.width = 80
    towerButton.height = 80
    towerButton.x = xPosition
    towerButton.y = yPosition
    

    const iconBackground = new PIXI.Graphics()
    iconBackground.beginFill(hexBackground)
    iconBackground.drawRect(0,0, 80, 80)
    iconBackground.endFill()
    towerButton.addChild(iconBackground)
    
    const towerIcon = PIXI.Sprite.from(spriteAsset)
    towerIcon.width = 80
    towerIcon.height = 80
    towerButton.addChild(towerIcon)

    return towerButton
}

