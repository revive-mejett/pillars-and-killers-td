import * as PIXI from "pixi.js";

type TowerStats = {
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

// assetIcon: towerIcons.ultimatePillar,
// asset: towerIcons.ultimatePillarTop,
// info: {
//     title: "Ultimate Pillar",
//     description: "The next generation using power currently being experimented..."
// },
// range: 700,
// damage: 1024,
// fireRate: 5,
// cost: 5800

export default TowerStats