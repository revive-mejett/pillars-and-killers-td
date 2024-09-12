export class Game {
    constructor() {
        this.mapSize = 1100
        this.dimensions = 25
        this.app = new PIXI.Application({width: mapSize, height: mapSize})

        // add to DOM
        document.body.appendChild(app.view)
    }
}