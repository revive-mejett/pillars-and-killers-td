import * as PIXI from "pixi.js";
import { Scene } from "src/scenes/Scene";

export class SceneManager {
    sceneContainer: PIXI.Container<PIXI.DisplayObject>;

    /**
     *
     */
    constructor(sceneContainer : PIXI.Container) {
        this.sceneContainer = sceneContainer
    }


    transitionScene(newScene : Scene) {
        //remove old scene stuff
        this.sceneContainer?.removeChildren()

        //add new scene
        this.sceneContainer.addChild(newScene.container)
    }
}