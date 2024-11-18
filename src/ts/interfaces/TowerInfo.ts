import * as PIXI from "pixi.js";

interface TowerInfo {
    asset: PIXI.SpriteSource
    assetIcon: PIXI.SpriteSource,
    info?: {
        title: string,
        description: string
    }
}

interface IcePillarInfo extends TowerInfo {
    asset: PIXI.SpriteSource
    assetIcon: PIXI.SpriteSource,
    info?: {
        title: string,
        description: string
    }
}



export { TowerInfo, IcePillarInfo }