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

interface AdvancedPillarInfo extends TowerInfo {
    bulletSize: number
}


interface IcePillarInfo extends TowerInfo {
    beamWidth: number
}

interface EmberPillarInfo extends TowerInfo {
    impactRadius: number;
    flameColour: number
    soundPitch: number,
    fireballWidth: number
}

interface PoisonIvyPillarInfo extends TowerInfo {
    soundPitch: number,
    leafColour: number
}

interface DreadglassPillarInfo extends TowerInfo {
    bulletColour: number,
    bulletSize: number,
    soundPitch: number,
}

interface UltimatePillarInfo extends TowerInfo {
    beamWidth: number,
    beamColour: number
}




export { TowerInfo, BasicPillarInfo, IcePillarInfo, UltimatePillarInfo, EmberPillarInfo, PoisonIvyPillarInfo, AdvancedPillarInfo, DreadglassPillarInfo }