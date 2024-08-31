


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

let elapsedMS = 0
function onTick() {
    elapsedMS += appTicker.deltaMS
    if (elapsedMS >= 1000) {
        console.log("spawned");
        elapsedMS = 0
        
        walkPath(app, myMap)
    }
}

appTicker.add(onTick)
appTicker.start()


