import * as PIXI from "pixi.js";

export class CombatEffectsLayer {
    container: PIXI.Container<PIXI.DisplayObject>

    constructor() {
        this.container = new PIXI.Container()
        this.container.sortableChildren = true
        this.container.eventMode = "none"
    }

    attachAbove(parentContainer: PIXI.Container<PIXI.DisplayObject>, baseContainer: PIXI.Container<PIXI.DisplayObject>) {
        this.container.x = baseContainer.x
        this.container.y = baseContainer.y
        this.container.zIndex = (baseContainer.zIndex || 0) + 1
        parentContainer.addChild(this.container)
    }

    cleanUpResources() {
        this.container.removeChildren()
        if (this.container.parent) {
            this.container.parent.removeChild(this.container)
        }
        this.container.destroy()
    }
}
