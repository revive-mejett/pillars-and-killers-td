import { AssetLoader } from "../core/AssetLoader.js";
import { BasicPillar } from "../objects/pillars/BasicPillar.js";


const assetLoader = new AssetLoader()



export class TowerFactory {

    static createTower(x, y, width, height, towerType) {

        const towerIcons = assetLoader.towers
        const towerTypeStatMap = new Map([
            [
                "basic",
                {
                    asset: towerIcons.basicPillarTop,
                    range: 250,
                    damage: 10,
                    fireRate: 1,
                    cost: 1
                }
            ],
            [
                "ice",
                {
                    asset: towerIcons.frozenPillarTop,
                    range: 220,
                    damage: 10,
                    fireRate: 1,
                    cost: 1,
                    speedMultiplier: 0.8
                }
            ],
            [
                "advanced",
                {
                    asset: towerIcons.advancedPillarTop,
                    range: 300,
                    damage: 10,
                    fireRate: 1,
                    cost: 1
                }
            ],
            [
                "ultimate",
                {
                    asset: towerIcons.ultimatePillarTop,
                    range: 450,
                    damage: 220,
                    fireRate: 5,
                    cost: 5800
                }
            ]
        ])


        const towerStats = towerTypeStatMap.get(towerType)
        switch (towerType) {
        case "basic":
            return new BasicPillar(x, y, width, height, towerStats)
            //break;
        // case "ice":
        //     return new Froz(x, y, width, height, towerStats)
        //     //break;
        // default:
        //     return new Tower(x, y, width, height, towerStats)
        //     //break;
        }
    }
}