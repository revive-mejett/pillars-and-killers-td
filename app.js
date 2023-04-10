const Application = PIXI.Application

const app = new Application({width: 1000, height: 1000})

document.body.appendChild(app.view)


let chocolateHeliMeme = PIXI.Sprite.from('./assets/textures/chocolate_helicopter.jpg')
let sprite = new PIXI.Sprite()

app.stage.addChild(chocolateHeliMeme)


chocolateHeliMeme.height = 50
chocolateHeliMeme.width = 50
let graphics = new PIXI.Graphics()
graphics.lineStyle(2, 0xAAAAAA)
graphics.drawRect(200, 100, 100, 400)
graphics.drawRect(200, 100, 100, 400)
graphics.endFill()
app.stage.addChild(graphics)
let t = 0;
app.ticker.add(() => {
    chocolateHeliMeme.x += 0.1
})

