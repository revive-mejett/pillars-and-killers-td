import * as PIXI from "pixi.js";

export class Scene {
    app: PIXI.Application<PIXI.ICanvas>;
    container: PIXI.Container<PIXI.DisplayObject>;


    /**
     *
     */
    constructor(app : PIXI.Application) {
        this.app = app
        this.container = new PIXI.Container()

        if (new.target === Scene) {
            throw new Error("Scene is an abstract class. Cannot instantiate a Scene instance")
        }
    }

    constructScene() {

    }

    pause() {
        this.container.visible = false
    }

    resume() {
        this.container.visible = true
    }
}

