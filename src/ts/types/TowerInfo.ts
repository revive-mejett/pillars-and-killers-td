import * as PIXI from "pixi.js";

type TowerInfo = {
    range : number,
    damage: number,
    fireRate: number,
    cost: number,
    asset: PIXI.SpriteSource
    assetIcon: PIXI.SpriteSource,
    info?: {
        title: string,
        description: string
    }
}

export default TowerInfo