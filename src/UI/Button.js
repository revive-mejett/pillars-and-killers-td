export class Button {


    static createButton(x, y, width, height, text) {
        const buttonContainer = new PIXI.Container()
        buttonContainer.eventMode = "static"
        buttonContainer.x = x
        buttonContainer.y = y

        const buttonBackground = new PIXI.Graphics()
        buttonContainer.addChild(buttonBackground)
        buttonBackground.beginFill(0x330000)
        buttonBackground.drawRect(0,0, width, height)
        buttonBackground.endFill()

        const buttonText = new Text(text, new TextStyle({fontFamily: "Times New Roman", fontSize: 40, fill: 0xFFFFFF, align: "center"}))
        buttonText.x = (buttonContainer.width - buttonText.width) / 2;
        buttonText.y = (buttonContainer.height - buttonText.height) / 2;
        buttonContainer.addChild(buttonText)
        return buttonContainer
    }

}