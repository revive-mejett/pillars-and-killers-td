import { Entity } from "./Entity";

export class Tile extends Entity {

    /**
     * tileType can be either "startTile", "endTile", "pathTile", "grassTile", "towerTile"
     */
    constructor(x, y, width, height, tileType) {
        super(x, y, width, height);
    }

    

}