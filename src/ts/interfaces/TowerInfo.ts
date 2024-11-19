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

interface BasicPillarInfo extends TowerInfo {
    bulletSize: number
}


interface IcePillarInfo extends TowerInfo {
    beamWidth: number
}

interface UltimatePillarInfo extends TowerInfo {
    beamWidth: number,
    beamColour: number
}




export { TowerInfo, BasicPillarInfo, IcePillarInfo, UltimatePillarInfo }