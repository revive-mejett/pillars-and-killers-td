


const Application = PIXI.Application
const mapSize = 1100
const dimensions = 25

const app = new Application({width: mapSize, height: mapSize})
document.body.appendChild(app.view)

import { TdMap, displayPath, displayTiles, walkPath } from "./src/TdMap.js"
let myMap = new TdMap(mapSize, mapSize, dimensions)



displayTiles(app, myMap)
displayPath(app, myMap)

const appTicker = new PIXI.Ticker();
appTicker.autoStart = false

appTicker.add((deltaTime) => {
    walkPath(app, myMap)
})

let count = 0
let waveInterval

function spawnEnemy() {
    walkPath(app, myMap)
    count++
    if (count >+ 10) {
        clearInterval(waveInterval)
    }
}

waveInterval = setInterval(spawnEnemy, 700)


