import Waypoint from "src/ts/types/WaypointType";
import { Tile } from "./Tile"
import * as PIXI from "pixi.js";
import { TowerData } from "src/ts/types/GameSaveData";
import { TowerFactory } from "../managers/TowerFactory";
import { GameplayScene } from "../scenes/GameplayScene";
import { MapData } from "src/utils/MapData";
import { AssetLoader } from "../core/AssetLoader";

const assetLoader = new AssetLoader()

class TdMap {
    mapWidth: number
    mapHeight: number
    dimensions: number
    tileSize: number
    tiles: Tile[][]
    waypoints : Waypoint[] | undefined
    blocked?: {x: number, y: number}[] = []

    grassColour: number | undefined
    grassOutlineColour: number | undefined
    pathOpacity: number | undefined = 1
    grassOpacity: number | undefined = 1

    mapBackgroundImageKey: string | undefined
    constructor(mapData: MapData, mapWidth : number, mapHeight : number, dimensions : number) {
        this.mapWidth = mapWidth
        this.mapHeight = mapHeight
        this.dimensions = dimensions
        this.tileSize = mapWidth / dimensions
        this.tiles = []
        this.waypoints = mapData.waypoints
        this.blocked = mapData.blocked || undefined

        this.grassColour = mapData.mapInfo.grassColour
        this.grassOutlineColour = mapData.mapInfo.grassSecondaryColour
        this.mapBackgroundImageKey = mapData.mapInfo.bgColourMapKey
        if (mapData.mapInfo.pathOpacity) {
            this.pathOpacity = mapData.mapInfo.pathOpacity !== 0 ? mapData.mapInfo.pathOpacity : 0.001
        }
        if (mapData.mapInfo.grassOpacity) {
            this.grassOpacity = mapData.mapInfo.grassOpacity !== 0 ? mapData.mapInfo.grassOpacity : 0.001
        }
    }

    private putBackground(container : PIXI.Container, mapKey : string) {
        const mapBackgroundBundle = assetLoader.mapBackgroundImages
        if (!mapBackgroundBundle) {
            throw new Error("Map bundle not properly loaded")
        }
        const backgroundImg = mapBackgroundBundle[mapKey]

        if (!backgroundImg) {
            throw new Error("Map image does not exist!")
        }

        const backgroundSprite = PIXI.Sprite.from(backgroundImg)
        backgroundSprite.height = this.mapHeight
        backgroundSprite.width = this.mapWidth
        backgroundSprite.x = 0
        backgroundSprite.y = 0

        container.addChild(backgroundSprite)
    }

    displayTiles(container : PIXI.Container, gameplayScene: GameplayScene, savedTowers?: TowerData[]) {

        if (this.mapBackgroundImageKey) {
            this.putBackground(container, this.mapBackgroundImageKey)
        }
        //init array with array of 0

        for (let i = 0; i < this.dimensions; i++) {
            this.tiles.push([])
            for (let j = 0; j < this.dimensions; j++) {

                const isBlocked = this.blocked?.find((coordinate) => coordinate.x === i && coordinate.y === j)

                const tile = new Tile(i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize, isBlocked ? "terrain" : "grass", container, this.grassColour, this.grassOutlineColour, this.grassOpacity)
                tile.paveGrass()
                this.tiles[i].push(tile)

                if (!savedTowers) {
                    continue
                }

                const savedTowerData = savedTowers.find(savedTower => savedTower.x === i * this.tileSize && savedTower.y === j * this.tileSize)

                //get its targeting priority
                const targetingIndex = savedTowerData?.currentTargetingIndex || 0

                if (savedTowerData) {
                    const tower = TowerFactory.createTower(tile.x, tile.y, tile.width, tile.height, savedTowerData.towerType)

                    //checks if data has a nickname
                    if (savedTowerData.nick) {
                        tower.setNickname(savedTowerData.nick)
                    }
                    tower.presetLevel(savedTowerData.level)
                    tile.placeTowerOnTile(tower)
                    tower.setTileRef(tile)
                    tower.runTower(gameplayScene)
                    tower.currentTargetingIndex = targetingIndex
                    gameplayScene.addTowerToPresent(tower)
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

        const drawnTileCoords : {x : number, y: number}[] = []

        while (currWayPtNum < this.waypoints.length - 1) {

            if (!drawnTileCoords.find(coordinate => coordinate.x === x * this.tileSize && coordinate.y === y * this.tileSize)) {
                const pathTile = new PIXI.Graphics()
                pathTile.beginFill(0x070707)
                pathTile.drawRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
                pathTile.endFill()
                if (this.pathOpacity) {
                    pathTile.alpha = this.pathOpacity
                }
                this.tiles[x][y].setTileContainer(pathTile)
                this.tiles[x][y].changeTileType("path")
                drawnTileCoords.push({x : x * this.tileSize, y : y * this.tileSize})
            }


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

    //todo remove this function of no longer needed
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