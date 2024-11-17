import * as PIXI from "pixi.js";

interface TowerInfo {
    asset: PIXI.SpriteSource
    assetIcon: PIXI.SpriteSource,
    info?: {
        title: string,
        description: string
    }
}

export default TowerInfo