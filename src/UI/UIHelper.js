import { Text, TextStyle } from "pixi.js"

export class UIHelper {


    static createButton(x, y, width, height, text, fontSize, bgColour) {
        const buttonContainer = new PIXI.Container()
        buttonContainer.eventMode = "static"
        buttonContainer.x = x
        buttonContainer.y = y

        const buttonBackground = new PIXI.Graphics()
        buttonContainer.addChild(buttonBackground)
        buttonBackground.beginFill(0x003333)
        buttonBackground.drawRect(0,0, width, height)
        buttonBackground.endFill()

        const buttonText = new Text(text, new TextStyle({fontFamily: "Times New Roman", fontSize: fontSize || 40, fill: bgColour || 0xFFFFFF, align: "center"}))
        buttonText.x = (buttonContainer.width - buttonText.width) / 2;
        buttonText.y = (buttonContainer.height - buttonText.height) / 2;
        buttonContainer.addChild(buttonText)
        return buttonContainer
    }

    static createText(x, y, text, fontSize, textColour) {
        const textContainer = new PIXI.Container()
        textContainer.eventMode = "static"
        textContainer.x = x
        textContainer.y = y

        const textObject = new Text(text, new TextStyle({fontFamily: "Times New Roman", fontSize: fontSize, fill: textColour || 0xFFFFFF, align: "center"}))
        textContainer.addChild(textObject)
        textObject.x = (textContainer.width - textObject.width) / 2;
        textObject.y = (textContainer.height - textObject.height) / 2;

        return textContainer
    }

    //helper function to create a tower button
    static createTowerIcon(spriteAsset, xPosition, yPosition, hexBackground) {
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

    static createInfoPanelOutline(hexColour) {
        const infoPanelOutline = new PIXI.Graphics()
        infoPanelOutline.lineStyle(3, hexColour)
        infoPanelOutline.drawRect(0, 0, 1000 * 0.25, 300)
        return infoPanelOutline
    }

}