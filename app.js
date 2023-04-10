const Application = PIXI.Application

const app = new Application()

document.body.appendChild(app.view)


let chocolateHeliMeme = PIXI.Sprite.from('./assets/textures/chocolate_helicopter.jpg')
let sprite = new PIXI.Sprite()

app.stage.addChild(chocolateHeliMeme)

chocolateHeliMeme.height = 50
chocolateHeliMeme.width = 50
let graphics = new PIXI.Graphics()
graphics.beginFill(0xFF0000)
graphics.drawRect(200, 100, 100, 400)
graphics.endFill()
app.stage.addChild(graphics)
app.ticker.add(() => {
    chocolateHeliMeme.x += 0.1
})

