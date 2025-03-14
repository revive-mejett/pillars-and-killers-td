import EnemyType from "./EnemyType"

type EnemyClass = "Infant Circle" | "Little Sparrow" | "Earthling Flake" | "Quick Bonhomme" | "Stone Pricker" | "4p 2024" | "Mean Triangle" | "Brave Proxima Centauri"
| "Toddler Sphere" | "Cute Crow" | "Polar Goldfish" | "Fast Runner" | "Steel Warrior" | "5p 2025" | "Angry Piranha" | "Serious Sirius"
| "Freshman Octahedron" | "Beautiful Peacock" | "Twilight Great White" | "Dashing Dasher" | "Titanium Bruiser" | "12p 2028" | "Furious Raven" | "Remorseless Rigel"
| "Sophomore Dodecahedron" | "Alluring Rooster" | "Neptunian Megalodon" | "Kingda Ka Zipper" | "Obsidian Ripper" | "256p 2152" | "Enraged Eagle" | "Unforgiving Stephenson 2-18"
| "Jr. Rhombicosidodecahedron" | "Irresistible Phoenix" | "Challenger Deep Kraken" | "Near-Light Zoomer" |  "Carbon Nanotube Annihilator" |  "2^1024p 137632" |  "Merciless Loch Ness" | "TON 618"

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
    animationSpeed? : number,
    slowImmune?: boolean
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
        description: string,
        stats : EnemyStats
    }
}

export { EnemyData, EnemyStats, EnemyClass }