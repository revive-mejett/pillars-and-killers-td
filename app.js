
import { walkPath2 } from "./src/objects/Enemy.js"

const Application = PIXI.Application
const mapSize = 1100
const dimensions = 25

const app = new Application({width: mapSize, height: mapSize})
document.body.appendChild(app.view)

import { TdMap, displayPath, displayTiles } from "./src/TdMap.js"
let myMap = new TdMap(mapSize, mapSize, dimensions)



displayTiles(app, myMap)
displayPath(app, myMap)

