import { EnemyData } from "src/ts/types/EnemyData"

//TODO later move enemy data to game data json
const allEnemyData: EnemyData = {

    "Infant Circle": {
        atlasData: {
            "frames": {
                "infantCircle1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "infantCircle2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "infantCircle3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "infantCircle4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["infantCircle1", "infantCircle2", "infantCircle3", "infantCircle4"]
            },

            "meta": {
                "image": "assets/spritesheets/InfantCircle.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Infant Circle",
            type: "Normal",
            health: 50,
            speed: 1,
            damage: 1,
            killValue: 10,
            rotationSpeed: 0,
            isLooking: false,
            animationSpeed: 0.1
        }
    },
    "Little Sparrow": {
        atlasData: {
            "frames": {
                "littleSparrow1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "littleSparrow2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "littleSparrow3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "littleSparrow4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["littleSparrow1", "littleSparrow2", "littleSparrow3", "littleSparrow4"]
            },

            "meta": {
                "image": "assets/spritesheets/LittleSparrow.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Little Sparrow",
            type: "Regen",
            health: 100,
            speed: 1.1,
            damage: 1,
            killValue: 15,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.1,
            regen: 0.1
        }
    },
    "Earthling Flake": {
        atlasData: {
            "frames": {
                "EarthlingFlake1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "EarthlingFlake2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "EarthlingFlake3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "EarthlingFlake4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["EarthlingFlake1", "EarthlingFlake2", "EarthlingFlake3", "EarthlingFlake4"]
            },

            "meta": {
                "image": "assets/spritesheets/EarthlingFlake.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Earthling Flake",
            type: "SlowImmune",
            health: 220,
            speed: 0.7,
            damage: 1,
            killValue: 25,
            rotationSpeed: 0,
            isLooking: false,
            animationSpeed: 0.1
        }
    },
    "Quick Bonhomme": {
        atlasData: {
            "frames": {
                "QuickBonhomme1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "QuickBonhomme2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "QuickBonhomme3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "QuickBonhomme4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["QuickBonhomme1", "QuickBonhomme2", "QuickBonhomme3", "QuickBonhomme4"]
            },

            "meta": {
                "image": "assets/spritesheets/QuickBonhomme.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Quick Bonhomme",
            type: "Fast",
            health: 350,
            speed: 1.4,
            damage: 1,
            killValue: 30,
            rotationSpeed: 1,
            isLooking: false,
            animationSpeed: 0.1
        }
    },
    "Stone Pricker": {
        atlasData: {
            "frames": {
                "StonePricker1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "StonePricker2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "StonePricker3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "StonePricker4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["StonePricker1", "StonePricker2", "StonePricker3", "StonePricker4"]
            },

            "meta": {
                "image": "assets/spritesheets/StonePricker.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Stone Pricker",
            type: "Armoured",
            health: 700,
            speed: 0.5,
            damage: 3,
            killValue: 40,
            armour: 5,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.1
        }
    },
    "4p 2024": {
        atlasData: {
            "frames": {
                "4p 2024_1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "4p 2024_2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "4p 2024_3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["4p 2024_1", "4p 2024_2", "4p 2024_3", "4p 2024_2"]
            },

            "meta": {
                "image": "assets/spritesheets/4p2024.png",
                "format": "RGBA8888",
                "size": { "w": 750, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "4p 2024",
            type: "EMP",
            health: 750,
            speed: 0.6,
            damage: 5,
            killValue: 50,
            armour: 0,
            rotationSpeed: 0,
            isLooking: false,
            animationSpeed: 0.25
        }
    },
    "Mean Triangle": {
        atlasData: {
            "frames": {
                "MeanTriangle1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "MeanTriangle2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["MeanTriangle1", "MeanTriangle2"]
            },

            "meta": {
                "image": "assets/spritesheets/MeanTriangle.png",
                "format": "RGBA8888",
                "size": { "w": 500, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Mean Triangle",
            type: "Hybrid",
            health: 800,
            speed: 0.5,
            damage: 3,
            killValue: 75,
            armour: 0,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.02
        }
    },
    "Brave Proxima Centauri": {
        atlasData: {
            "frames": {
                "BraveProximaCentauri1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "BraveProximaCentauri2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "BraveProximaCentauri3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "BraveProximaCentauri4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "BraveProximaCentauri5":
                {
                    "frame": { "x": 1000, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "BraveProximaCentauri6":
                {
                    "frame": { "x": 1250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
            },

            "animations": {
                "enemy": ["BraveProximaCentauri1", "BraveProximaCentauri2", "BraveProximaCentauri3", "BraveProximaCentauri4", "BraveProximaCentauri5", "BraveProximaCentauri6"]
            },

            "meta": {
                "image": "assets/spritesheets/BraveProximaCentauri.png",
                "format": "RGBA8888",
                "size": { "w": 1500, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Brave Proxima Centauri",
            type: "Boss",
            health: 10000,
            speed: 0.5,
            damage: 9999,
            killValue: 500,
            rotationSpeed: 0.1,
            isLooking: false,
            animationSpeed: 0.05,
            regen: 0.05
        }
    }
}

export { allEnemyData }