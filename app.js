
const Application = PIXI.Application

const app = new Application()

document.body.appendChild(app.view)


let chocolateHeliMeme = PIXI.Sprite.from('./assets/textures/chocolate_helicopter.jpg')

app.stage.addChild(chocolateHeliMeme)
console.log(chocolateHeliMeme)
