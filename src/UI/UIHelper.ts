import { Text, TextStyle } from "pixi.js"
import * as PIXI from "pixi.js";
import { AssetLoader } from "../core/AssetLoader";
import { MapData } from "src/utils/MapData";
import { AudioManager } from "../managers/AudioManager";
const assetLoader = new AssetLoader()


const audioManager = new AudioManager()

export class UIHelper {


    static createButton(x: number, y: number, width: number, height: number, text: string, fontSize?: number, textColour?: number, bgColour?: number): PIXI.Container {
        const defaultColour = 0x0A0055
        
        const buttonContainer = new PIXI.Container()
        buttonContainer.eventMode = "static"
        buttonContainer.x = x
        buttonContainer.y = y

        const buttonBackground = new PIXI.Graphics()
        buttonContainer.addChild(buttonBackground)
        buttonBackground.beginFill(bgColour || defaultColour)
        buttonBackground.drawRect(0, 0, width, height)
        buttonBackground.endFill()

        const buttonText = new Text(text, new TextStyle({ fontFamily: "Times New Roman", fontSize: fontSize || 40, fill: textColour || 0xFFFFFF, align: "center" }))
        buttonText.x = (buttonContainer.width - buttonText.width) / 2;
        buttonText.y = (buttonContainer.height - buttonText.height) / 2;
        buttonContainer.addChild(buttonText)

        buttonContainer.on("mouseenter", () => {
            audioManager.playSound("assets/sounds/sfx/btn_press.mp3", 0.4)
            buttonBackground.clear()
            buttonBackground.lineStyle(1, 0x00FFFF)
            buttonBackground.beginFill(bgColour || defaultColour)
            buttonBackground.drawRect(0, 0, width, height)
            buttonBackground.endFill()
        })
        buttonContainer.on("mouseleave", () => {
            buttonBackground.clear()
            buttonBackground.beginFill(bgColour || defaultColour)
            buttonBackground.drawRect(0, 0, width, height)
            buttonBackground.endFill()
        })
        buttonContainer.on("pointerdown", () => {
            audioManager.playSound("assets/sounds/sfx/btn_click.mp3", 0.4)
        })

        return buttonContainer
    }

    static createText(x: number, y: number, text: string, fontSize: number, textColour: string, centered?: boolean, wordwrapWidth?: number): PIXI.Container {
        const textContainer = new PIXI.Container()
        textContainer.eventMode = "static"
        textContainer.x = x
        textContainer.y = y

        const textObject = new Text(text, new TextStyle({ fontFamily: "Times New Roman", fontSize: fontSize, fill: textColour || 0xFFFFFF, align: "center", wordWrap: true, wordWrapWidth: wordwrapWidth }))
        if (centered) {
            textObject.x = (textContainer.width - textObject.width) / 2;
            textObject.y = (textContainer.height - textObject.height) / 2;
        }
        textContainer.addChild(textObject)

        return textContainer
    }

    static updateText(textObject: PIXI.Text, newtText: string) {
        textObject.text = newtText
        textObject.x = (textObject.parent.width - textObject.width) / 2;
        textObject.y = (textObject.parent.height - textObject.height) / 2;
    }

    //helper function to create an icon
    static createIcon(spriteAsset: PIXI.SpriteSource, xPosition: number, yPosition: number, hexBackground: number, width?: number, height?: number): PIXI.Container {
        const iconContainer = new PIXI.Container()
        iconContainer.eventMode = "static"
        iconContainer.x = xPosition
        iconContainer.y = yPosition

        const iconBackground = new PIXI.Graphics()
        iconBackground.beginFill(hexBackground)
        iconBackground.drawRect(0, 0, width || 80, height || 80)
        iconBackground.endFill()
        iconContainer.addChild(iconBackground)

        const icon = PIXI.Sprite.from(spriteAsset)
        icon.width = width || 80
        icon.height = height || 80
        iconContainer.addChild(icon)

        return iconContainer
    }

    //helper function to create an animated Sprite
    static createAnimatedIcon(spritesheet: PIXI.Spritesheet, xPosition: number, yPosition: number, hexBackground: number, width?: number, height?: number, animationSpeed: number = 0.25, noBackground: boolean = false): PIXI.Container {
        const iconContainer = new PIXI.Container()
        iconContainer.eventMode = "static"
        iconContainer.x = xPosition
        iconContainer.y = yPosition

        if (!noBackground) {
            const iconBackground = new PIXI.Graphics()
            iconBackground.beginFill(hexBackground)
            iconBackground.drawRect(0, 0, width || 80, height || 80)
            iconBackground.endFill()
            iconContainer.addChild(iconBackground)
        }


        const animatedIcon = new PIXI.AnimatedSprite(spritesheet.animations.enemy)
        animatedIcon.width = width || 80
        animatedIcon.height = height || 80
        animatedIcon.animationSpeed = animationSpeed
        animatedIcon.play()
        iconContainer.addChild(animatedIcon)

        return iconContainer
    }

    static createInfoPanelOutline(hexColour: number): PIXI.Graphics {
        const infoPanelOutline = new PIXI.Graphics()
        infoPanelOutline.beginFill(0x000000)
        infoPanelOutline.lineStyle(3, hexColour)
        infoPanelOutline.drawRect(0, 0, 1000 * 0.25, 300)
        infoPanelOutline.endFill()
        return infoPanelOutline
    }

    static createOutline(x: number, y: number, width: number, height: number, outlineWitdh: number, hexColour: number): PIXI.Graphics {
        const infoPanelOutline = new PIXI.Graphics()
        infoPanelOutline.lineStyle(outlineWitdh, hexColour)
        infoPanelOutline.drawRect(x, y, width, height)
        return infoPanelOutline
    }

    static createMapCard(mapData: MapData, cardSize: number, dimensions: number) {
        const mapCard = new PIXI.Container()
        const waypoints = mapData.waypoints
        const mapKey = mapData.mapInfo.bgColourMapKey

        if (mapKey) {
            const mapBackgroundBundle = assetLoader.mapBackgroundImages
            if (!mapBackgroundBundle) {
                throw new Error("Map bundle not properly loaded")
            }
            const backgroundImg = mapBackgroundBundle[mapKey]

            if (!backgroundImg) {
                throw new Error("Map image does not exist!")
            }

            const background = PIXI.Sprite.from(backgroundImg)
            background.height = cardSize
            background.width = cardSize
            background.x = 0
            background.y = 0
            mapCard.addChild(background)
        } else {
            const grassBackground = new PIXI.Graphics()
            grassBackground.beginFill(mapData.mapInfo.grassSecondaryColour || 0x005500)
            grassBackground.drawRect(0, 0, cardSize, cardSize)
            grassBackground.endFill()
            mapCard.addChild(grassBackground)
        }


        const miniTileSize = cardSize / dimensions

        let currWayPtNum = 0
        let x = waypoints[currWayPtNum].x
        let y = waypoints[currWayPtNum].y

        while (currWayPtNum < waypoints.length - 1) {
            const bgColour = 0x070707


            const pathTile = new PIXI.Graphics()
            pathTile.beginFill(bgColour)
            pathTile.drawRect(x * miniTileSize, y * miniTileSize, miniTileSize, miniTileSize)
            pathTile.endFill()

            if (waypoints[currWayPtNum + 1].x > x) {
                x++
            }
            if (waypoints[currWayPtNum + 1].x < x) {
                x--
            }

            if (waypoints[currWayPtNum + 1].y > y) {
                y++
            }
            if (waypoints[currWayPtNum + 1].y < y) {
                y--
            }
            if (waypoints[currWayPtNum + 1].x === x && waypoints[currWayPtNum + 1].y === y) {
                currWayPtNum++;
            }

            mapCard.addChild(pathTile)

        }

        //mark start and end tiles
        const startTile = new PIXI.Graphics()
        startTile.beginFill(0x999900)
        startTile.drawRect(waypoints[0].x * miniTileSize, waypoints[0].y * miniTileSize, miniTileSize, miniTileSize)
        startTile.endFill()
        mapCard.addChild(startTile)

        const endTile = new PIXI.Graphics()
        endTile.beginFill(0x220000)
        endTile.drawRect(x * miniTileSize, y * miniTileSize, miniTileSize, miniTileSize)
        endTile.endFill()
        mapCard.addChild(endTile)

        return mapCard
    }

}