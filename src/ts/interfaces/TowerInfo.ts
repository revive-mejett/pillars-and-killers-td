import * as PIXI from "pixi.js";

interface TowerInfo {
    asset: PIXI.SpriteSource
    assetIcon: PIXI.SpriteSource,
    info?: {
        title: string,
        description: string
    }
    tileColour: number,
}

interface IcePillarInfo extends TowerInfo {
    beamWidth: number
}



export { TowerInfo, IcePillarInfo }