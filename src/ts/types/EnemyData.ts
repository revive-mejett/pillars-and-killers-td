import EnemyType from "./EnemyType"

type EnemyClass = "Infant Circle" | "Little Sparrow" | "Earthling Flake" | "Quick Bonhomme" | "Stone Pricker" | "4p 2024" | "Mean Triangle" | "Brave Proxima Centauri"

type EnemyStats = {
    className: EnemyClass,
    type: EnemyType,
    health: number,
    speed: number,
    damage: number,
    killValue: number,
    rotationSpeed: number,
    isLooking: boolean,
    regen? : number,
    armour? : number,
    pulseRange? : number,
    pulseRate? : number,
    animationSpeed? : number
}

type EnemyData = {
    [key: string] : {
        atlasData : {
            frames : {
                [key: string] : {
                    frame: {"x" : number,"y" : number,"w" : number,"h" : number},
                    spriteSourceSize: {"x" : number,"y": number,"w": number,"h" : number},
                    sourceSize: {"w" : number,"h" : number}
                }
            },
            "animations" : {
                [key: string] : string[]
            },
            "meta": {
                image: string,
                format?: string,
                size: {"w": number,"h" : number},
                scale: string,
            }
        },
        stats : EnemyStats
    }
}

export { EnemyData, EnemyStats, EnemyClass }