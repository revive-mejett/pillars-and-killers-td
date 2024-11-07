export class SceneManager {

    /**
     *
     */
    constructor(sceneContainer) {
        this.sceneContainer = sceneContainer
    }


    transitionScene(newScene) {
        //remove old scene stuff
        console.log("remove old scene")
        this.sceneContainer?.removeChildren()
        console.log("try add new scene")
        this.sceneContainer.addChild(newScene.container)
    }
}