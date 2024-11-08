export class Scene {


    /**
     *
     */
    constructor(app) {
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


