export class SceneManager {

    /**
     *
     */
    constructor(sceneContainer) {
        this.sceneContainer = sceneContainer
    }


    transitionScene(newScene) {
        //remove old scene stuff
        this.sceneContainer?.removeChildren()

        //add new scene
        this.sceneContainer.addChild(newScene.container)
    }
}