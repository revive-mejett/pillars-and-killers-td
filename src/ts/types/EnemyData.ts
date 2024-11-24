import EnemyType from "./EnemyType"

type EnemyStats = {
    className: string,
    type: EnemyType,
    health: number,
    speed: number,
    damage: number,
    killValue: number,
    rotationSpeed: number,
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

export { EnemyData, EnemyStats }