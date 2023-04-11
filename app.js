const Application = PIXI.Application
const mapSize = 1100
const dimensions = 40
const tileSize = mapSize / dimensions

const app = new Application({width: mapSize, height: mapSize})

document.body.appendChild(app.view)


let chocolateHeliMeme = PIXI.Sprite.from('./assets/textures/chocolate_helicopter.jpg')
let sprite = new PIXI.Sprite()




chocolateHeliMeme.height = 50
chocolateHeliMeme.width = 50
chocolateHeliMeme.zIndex = 3
let graphics = new PIXI.Graphics()
graphics.lineStyle(2, 0xAAAAAA)
for (let i = 0; i < dimensions; i++) {
    for (let j = 0; j < dimensions; j++) {
        graphics.drawRect(i * tileSize, j * tileSize, tileSize, tileSize)
    }
}
app.stage.addChild(graphics)
app.stage.addChild(chocolateHeliMeme)
let t = 0;
app.ticker.add(() => {
    chocolateHeliMeme.x += 0.1
})

