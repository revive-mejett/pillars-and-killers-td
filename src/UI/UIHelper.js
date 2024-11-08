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

    static updateText(textObject, newtText) {
        textObject.text = newtText
        textObject.x = (textObject.parent.width - textObject.width) / 2;
        textObject.y = (textObject.parent.height - textObject.height) / 2;
    }

    //helper function to create an icon
    static createIcon(spriteAsset, xPosition, yPosition, hexBackground, width, height) {
        const iconContainer = new PIXI.Container()
        iconContainer.eventMode = "static"
        iconContainer.x = xPosition
        iconContainer.y = yPosition

        const iconBackground = new PIXI.Graphics()
        iconBackground.beginFill(hexBackground)
        iconBackground.drawRect(0,0, width || 80, height || 80)
        iconBackground.endFill()
        iconContainer.addChild(iconBackground)

        const icon = PIXI.Sprite.from(spriteAsset)
        icon.width = width || 80
        icon.height = height || 80
        iconContainer.addChild(icon)

        return iconContainer
    }

    static createInfoPanelOutline(hexColour) {
        const infoPanelOutline = new PIXI.Graphics()
        infoPanelOutline.lineStyle(3, hexColour)
        infoPanelOutline.drawRect(0, 0, 1000 * 0.25, 300)
        return infoPanelOutline
    }

}