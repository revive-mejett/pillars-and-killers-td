import Waypoint from "src/ts/types/WaypointType";
import { Tile } from "./Tile"
import * as PIXI from "pixi.js";
import { TowerData } from "src/ts/types/GameSaveData";
import { TowerFactory } from "../managers/TowerFactory";
import { GameplayScene } from "../scenes/GameplayScene";
import { MapData } from "src/utils/MapData";


class TdMap {
    mapWidth: number
    mapHeight: number
    dimensions: number
    tileSize: number
    tiles: Tile[][]
    waypoints : Waypoint[] | undefined

    grassColour: number | undefined
    grassOutlineColour: number | undefined
    constructor(mapData: MapData, mapWidth : number, mapHeight : number, dimensions : number) {
        this.mapWidth = mapWidth
        this.mapHeight = mapHeight
        this.dimensions = dimensions
        this.tileSize = mapWidth / dimensions
        this.tiles = []
        this.waypoints = mapData.waypoints

        this.grassColour = mapData.mapInfo.grassColour
        this.grassOutlineColour = mapData.mapInfo.grassSecondaryColour
    }

    displayTiles(container : PIXI.Container, gameplayScene: GameplayScene, savedTowers?: TowerData[]) {

        //init array with array of 0

        for (let i = 0; i < this.dimensions; i++) {
            this.tiles.push([])
            for (let j = 0; j < this.dimensions; j++) {

                const tile = new Tile(i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize, "grass", container, this.grassColour, this.grassOutlineColour)
                tile.paveGrass()
                this.tiles[i].push(tile)

                if (!savedTowers) {
                    continue
                }

                const savedTowerData = savedTowers.find(savedTower => savedTower.x === i * this.tileSize && savedTower.y === j * this.tileSize)

                if (savedTowerData) {
                    const tower = TowerFactory.createTower(tile.x, tile.y, tile.width, tile.height, savedTowerData.towerType)
                    tower.presetLevel(savedTowerData.level)
                    tile.placeTowerOnTile(tower)
                    tower.setTileRef(tile)
                    tower.runTower(gameplayScene)
                }
            }
        }
    }

    displayPath() {
        if (!this.waypoints) {
            throw new Error("Map not correctly loaded")
        }
        let currWayPtNum = 0
        const waypoints = this.waypoints

        let x = waypoints[currWayPtNum].x
        let y = waypoints[currWayPtNum].y

        while (currWayPtNum < this.waypoints.length - 1) {
            const pathTile = new PIXI.Graphics()
            pathTile.beginFill(0x070707)
            pathTile.drawRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
            pathTile.endFill()

            this.tiles[x][y].setTileContainer(pathTile)
            this.tiles[x][y].changeTileType("path")

            if (this.waypoints[currWayPtNum + 1].x > x) {
                x++
            }
            if (this.waypoints[currWayPtNum + 1].x < x) {
                x--
            }

            if (this.waypoints[currWayPtNum + 1].y > y) {
                y++
            }
            if (this.waypoints[currWayPtNum + 1].y < y) {
                y--
            }
            if (this.waypoints[currWayPtNum + 1].x === x && this.waypoints[currWayPtNum + 1].y === y) {
                currWayPtNum++;
            }

        }

        //mark start and end tiles
        const startTile = new PIXI.Graphics()
        startTile.beginFill(0x999900)
        startTile.drawRect(waypoints[0].x * this.tileSize, waypoints[0].y * this.tileSize, this.tileSize, this.tileSize)
        startTile.endFill()
        this.tiles[waypoints[0].x][waypoints[0].y].setTileContainer(startTile)
        this.tiles[waypoints[0].x][waypoints[0].y].changeTileType("start")


        const endTile = new PIXI.Graphics()
        endTile.beginFill(0x220000)
        endTile.drawRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
        endTile.endFill()
        this.tiles[waypoints[waypoints.length - 1].x][waypoints[waypoints.length - 1].y].setTileContainer(endTile)
        this.tiles[waypoints[waypoints.length - 1].x][waypoints[waypoints.length - 1].y].changeTileType("end")
    }

    repaveGrass() {
        this.tiles.forEach(row => {
            row.forEach(tile => {
                if (tile.tileType === "grass" && !tile.hasTower) {
                    tile.paveGrass()
                }
            })
        })
    }
}



export { TdMap }