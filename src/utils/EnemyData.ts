import { EnemyData } from "src/ts/types/EnemyData"

//TODO later move enemy data to game data json
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
            rotationSpeed: 0,
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
    },
    "Earthling Flake" : {
        atlasData: {
            "frames": {
                "EarthlingFlake1":
                {
                    "frame": {"x":0,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                },
                "EarthlingFlake2":
                {
                    "frame": {"x":250,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                },
                "EarthlingFlake3":
                {
                    "frame": {"x":500,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                },
                "EarthlingFlake4":
                {
                    "frame": {"x":750,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                }
            },

            "animations": {
                "enemy": ["EarthlingFlake1","EarthlingFlake2","EarthlingFlake3","EarthlingFlake4"]
            },

            "meta": {
                "image": "assets/spritesheets/EarthlingFlake.png",
                "format": "RGBA8888",
                "size": {"w":1000,"h":250},
                "scale": "1"
            }
        },
        "stats": {
            className: "Earthling Flake",
            type: "SlowImmune",
            health: 220,
            speed: 0.7,
            damage: 1,
            killValue: 15,
            rotationSpeed: 0,
            isLooking: false,
            animationSpeed: 0.1
        }
    },
    "Quick Bonhomme" : {
        atlasData: {
            "frames": {
                "QuickBonhomme1":
                {
                    "frame": {"x":0,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                },
                "QuickBonhomme2":
                {
                    "frame": {"x":250,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                },
                "QuickBonhomme3":
                {
                    "frame": {"x":500,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                },
                "QuickBonhomme4":
                {
                    "frame": {"x":750,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250}
                }
            },

            "animations": {
                "enemy": ["QuickBonhomme1","QuickBonhomme2","QuickBonhomme3","QuickBonhomme4"]
            },

            "meta": {
                "image": "assets/spritesheets/QuickBonhomme.png",
                "format": "RGBA8888",
                "size": {"w":1000,"h":250},
                "scale": "1"
            }
        },
        "stats": {
            className: "Quick Bonhomme",
            type: "SlowImmune",
            health: 475,
            speed: 1.4,
            damage: 1,
            killValue: 20,
            rotationSpeed: 1,
            isLooking: false,
            animationSpeed: 0.1
        }
    }
}

export { allEnemyData }