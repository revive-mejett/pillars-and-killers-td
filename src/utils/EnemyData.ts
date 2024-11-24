import { EnemyData } from "src/ts/types/EnemyData"


const allEnemyData : EnemyData = {

    "Infant Circle" : {
        atlasData: {
            "frames": {
                "infantCircle1":
                {
                    "frame": {"x":0,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                },
                "infantCircle2":
                {
                    "frame": {"x":250,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                },
                "infantCircle3":
                {
                    "frame": {"x":500,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                },
                "infantCircle4":
                {
                    "frame": {"x":750,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                }
            },

            "animations": {
                "enemy": ["infantCircle1","infantCircle2","infantCircle3","infantCircle4"]
            },

            "meta": {
                "image": "assets/spritesheets/InfantCircle.png",
                "format": "RGBA8888",
                "size": {"w":1000,"h":250},
                "scale": "1"
            }
        },
        "stats": {
            className: "Infant Circle",
            type: "Normal",
            health: 50,
            speed: 1,
            damage: 1,
            killValue: 5,
            rotationSpeed: 0.1,
            isLooking: false,
            animationSpeed: 0.1
        }
    },
    "Little Sparrow" : {
        atlasData: {
            "frames": {
                "littleSparrow1":
                {
                    "frame": {"x":0,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                },
                "littleSparrow2":
                {
                    "frame": {"x":250,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                },
                "littleSparrow3":
                {
                    "frame": {"x":500,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                },
                "littleSparrow4":
                {
                    "frame": {"x":750,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                }
            },

            "animations": {
                "enemy": ["littleSparrow1","littleSparrow2","littleSparrow3","littleSparrow4"]
            },

            "meta": {
                "image": "assets/spritesheets/LittleSparrow.png",
                "format": "RGBA8888",
                "size": {"w":1000,"h":250},
                "scale": "1"
            }
        },
        "stats": {
            className: "Little Sparrow",
            type: "Regen",
            health: 100,
            speed: 1.1,
            damage: 1,
            killValue: 10,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.1,
            regen: 0.1
        }
    }
}

export { allEnemyData }