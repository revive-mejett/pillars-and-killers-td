import { Text, TextStyle } from "pixi.js"

export class UIHelper {


    static createButton(x, y, width, height, text) {
        const buttonContainer = new PIXI.Container()
        buttonContainer.eventMode = "static"
        buttonContainer.x = x
        buttonContainer.y = y

        const buttonBackground = new PIXI.Graphics()
        buttonContainer.addChild(buttonBackground)
        buttonBackground.beginFill(0x003333)
        buttonBackground.drawRect(0,0, width, height)
        buttonBackground.endFill()

        const buttonText = new Text(text, new TextStyle({fontFamily: "Times New Roman", fontSize: 40, fill: 0xFFFFFF, align: "center"}))
        buttonText.x = (buttonContainer.width - buttonText.width) / 2;
        buttonText.y = (buttonContainer.height - buttonText.height) / 2;
        buttonContainer.addChild(buttonText)
        return buttonContainer
    }

    static createText(x, y, text, textColour) {
        const textContainer = new PIXI.Container()
        textContainer.eventMode = "static"
        textContainer.x = x
        textContainer.y = y

        const textObject = new Text(text, new TextStyle({fontFamily: "Times New Roman", fontSize: 40, fill: textColour || 0xFFFFFF, align: "center"}))
        textObject.x = (textContainer.width - textObject.width) / 2;
        textObject.y = (textContainer.height - textObject.height) / 2;
        textContainer.addChild(textObject)
        return textContainer
    }

}