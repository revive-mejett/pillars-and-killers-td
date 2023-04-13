


const Application = PIXI.Application
const mapSize = 1100
const dimensions = 40
const tileSize = mapSize / dimensions

const app = new Application({width: mapSize, height: mapSize})

document.body.appendChild(app.view)


let chocolateHeliMeme = PIXI.Sprite.from('./assets/textures/chocolate_helicopter.jpg')
let sprite = new PIXI.Sprite()
import Hi from "./src/TdMap.js"



chocolateHeliMeme.height = tileSize
chocolateHeliMeme.width = tileSize
chocolateHeliMeme.zIndex = 3
let graphics = new PIXI.Graphics()
graphics.lineStyle(2, 0xAAAAAA)
for (let i = 0; i < dimensions; i++) {
    for (let j = 0; j < dimensions; j++) {
        graphics.drawRect(i * tileSize, j * tileSize, tileSize, tileSize)
        if (i === 0 && j === 0) {
            console.log(chocolateHeliMeme.position)
            console.log(chocolateHeliMeme.position.scope)
            console.log(chocolateHeliMeme.pivot)
            console.log(Hi)
        }
        chocolateHeliMeme.anchor.set(0)
    }
}
app.stage.addChild(graphics)
app.stage.addChild(chocolateHeliMeme)
let t = 0;
app.ticker.add(() => {
    chocolateHeliMeme.x += 0.1
})

