export class SceneManager {
    /**
     *
     */
    constructor(sceneContainer) {
        this.sceneContainer = sceneContainer;
    }
    transitionScene(newScene) {
        var _a;
        //remove old scene stuff
        (_a = this.sceneContainer) === null || _a === void 0 ? void 0 : _a.removeChildren();
        //add new scene
        this.sceneContainer.addChild(newScene.container);
    }
}
//# sourceMappingURL=SceneManager.js.map