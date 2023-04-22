


const Application = PIXI.Application
const mapSize = 1100
const dimensions = 25
const tileSize = mapSize / dimensions

const app = new Application({width: mapSize, height: mapSize})
document.body.appendChild(app.view)


let chocolateHeliMeme = PIXI.Sprite.from('./assets/textures/chocolate_helicopter.jpg')
// let sprite = new PIXI.Sprite()
import { TdMap, displayPath, displayTiles } from "./src/TdMap.js"

let myMap = new TdMap(mapSize, mapSize, dimensions)

chocolateHeliMeme.height = tileSize
chocolateHeliMeme.width = tileSize
chocolateHeliMeme.zIndex = 3

displayTiles(app, myMap)
displayPath(app, myMap)
// app.ticker.add(() => {
//     chocolateHeliMeme.x += 0.1
// })

