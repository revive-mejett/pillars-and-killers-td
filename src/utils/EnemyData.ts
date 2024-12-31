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
            regen: 2
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
            animationSpeed: 0.1,
            slowImmune: true
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
            killValue: 50,
            armour: 12,
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
            type: "Normal",
            health: 750,
            speed: 0.6,
            damage: 5,
            killValue: 55,
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
            killValue: 70,
            armour: 8,
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
                }
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
            killValue: 2000,
            rotationSpeed: 0.1,
            isLooking: false,
            animationSpeed: 0.05,
            regen: 0,
            armour: 12
        }
    },
    "Toddler Sphere": {
        atlasData: {
            "frames": {
                "ToddlerSphere1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "ToddlerSphere2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "ToddlerSphere3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "ToddlerSphere4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "ToddlerSphere5":
                {
                    "frame": { "x": 1000, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["ToddlerSphere1", "ToddlerSphere2", "ToddlerSphere3", "ToddlerSphere4", "ToddlerSphere5", "ToddlerSphere4", "ToddlerSphere3", "ToddlerSphere2"]
            },

            "meta": {
                "image": "assets/spritesheets/ToddlerSphere.png",
                "format": "RGBA8888",
                "size": { "w": 1250, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Toddler Sphere",
            type: "Normal",
            health: 1100,
            speed: 1,
            damage: 2,
            killValue: 60,
            armour: 0,
            rotationSpeed: 0.05,
            isLooking: false,
            animationSpeed: 0.15
        }
    },
    "Cute Crow": {
        atlasData: {
            "frames": {
                "CuteCrow1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "CuteCrow2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "CuteCrow3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "CuteCrow4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["CuteCrow1", "CuteCrow2", "CuteCrow3", "CuteCrow4"]
            },

            "meta": {
                "image": "assets/spritesheets/CuteCrow.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Cute Crow",
            type: "Regen",
            health: 1500,
            speed: 0.8,
            damage: 2,
            killValue: 90,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.2,
            regen: 30
        }
    },
    "Polar Goldfish": {
        atlasData: {
            "frames": {
                "PolarGoldfish1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "PolarGoldfish2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "PolarGoldfish3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "PolarGoldfish4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["PolarGoldfish1", "PolarGoldfish2", "PolarGoldfish3", "PolarGoldfish4"]
            },

            "meta": {
                "image": "assets/spritesheets/PolarGoldfish.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Polar Goldfish",
            type: "SlowImmune",
            health: 2200,
            speed: 0.6,
            damage: 2,
            killValue: 125,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0,
            slowImmune: true
        }
    },
    "Fast Runner": {
        atlasData: {
            "frames": {
                "FastRunner1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "FastRunner2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "FastRunner3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "FastRunner4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["FastRunner1", "FastRunner2", "FastRunner3", "FastRunner4"]
            },

            "meta": {
                "image": "assets/spritesheets/FastRunner.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Fast Runner",
            type: "Fast",
            health: 3750,
            speed: 1.6,
            damage: 2,
            killValue: 215,
            rotationSpeed: 1.2,
            isLooking: false,
            animationSpeed: 0.12
        }
    },
    "Steel Warrior": {
        atlasData: {
            "frames": {
                "SteelWarrior1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "SteelWarrior2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "SteelWarrior3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "SteelWarrior4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["SteelWarrior1", "SteelWarrior2", "SteelWarrior3", "SteelWarrior4"]
            },

            "meta": {
                "image": "assets/spritesheets/SteelWarrior.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Steel Warrior",
            type: "Armoured",
            health: 4500,
            speed: 0.3,
            damage: 5,
            killValue: 270,
            armour: 35,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.5
        }
    },
    "5p 2025": {
        atlasData: {
            "frames": {
                "5p 2025_1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "5p 2025_2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "5p 2025_3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["5p 2025_1", "5p 2025_2", "5p 2025_3", "5p 2025_2"]
            },

            "meta": {
                "image": "assets/spritesheets/5p2025.png",
                "format": "RGBA8888",
                "size": { "w": 750, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "5p 2025",
            type: "Normal",
            health: 5500,
            speed: 1,
            damage: 10,
            killValue: 350,
            armour: 5,
            rotationSpeed: 0.08,
            isLooking: false,
            animationSpeed: 0.5
        }
    },
    "Angry Piranha": {
        atlasData: {
            "frames": {
                "AngryPiranha1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "AngryPiranha2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["AngryPiranha1", "AngryPiranha2"]
            },

            "meta": {
                "image": "assets/spritesheets/AngryPiranha.png",
                "format": "RGBA8888",
                "size": { "w": 500, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Angry Piranha",
            type: "Hybrid",
            health: 7000,
            speed: 0.4,
            damage: 6,
            killValue: 450,
            armour: 15,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0,
            slowImmune: true
        }
    },
    "Serious Sirius": {
        atlasData: {
            "frames": {
                "SeriousSirius1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "SeriousSirius2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "SeriousSirius3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "SeriousSirius4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "SeriousSirius5":
                {
                    "frame": { "x": 1000, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "SeriousSirius6":
                {
                    "frame": { "x": 1250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["SeriousSirius1", "SeriousSirius2", "SeriousSirius3", "SeriousSirius4", "SeriousSirius5", "SeriousSirius6"]
            },

            "meta": {
                "image": "assets/spritesheets/SeriousSirius.png",
                "format": "RGBA8888",
                "size": { "w": 1500, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Serious Sirius",
            type: "Boss",
            health: 77000,
            speed: 0.7,
            damage: 9999,
            killValue: 5000,
            rotationSpeed: 0.15,
            isLooking: false,
            animationSpeed: 0.08,
            regen: 0,
            armour: 75,
            slowImmune: true
        }
    },
    "Freshman Octahedron": {
        atlasData: {
            "frames": {
                "FreshmanOctahedron1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "FreshmanOctahedron2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "FreshmanOctahedron3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "FreshmanOctahedron4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "FreshmanOctahedron5":
                {
                    "frame": { "x": 1000, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "FreshmanOctahedron6":
                {
                    "frame": { "x": 1250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "FreshmanOctahedron7":
                {
                    "frame": { "x": 1500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "FreshmanOctahedron8":
                {
                    "frame": { "x": 1750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "FreshmanOctahedron9":
                {
                    "frame": { "x": 2000, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["FreshmanOctahedron1", "FreshmanOctahedron2", "FreshmanOctahedron3", "FreshmanOctahedron4", "FreshmanOctahedron5", "FreshmanOctahedron6", "FreshmanOctahedron7", "FreshmanOctahedron8", "FreshmanOctahedron9"]
            },

            "meta": {
                "image": "assets/spritesheets/FreshmanOctahedron.png",
                "format": "RGBA8888",
                "size": { "w": 2250, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Freshman Octahedron",
            type: "Normal",
            health: 9000,
            speed: 1.2,
            damage: 5,
            killValue: 450,
            rotationSpeed: 0.22,
            isLooking: false,
            animationSpeed: 0.2,
            armour: 25
        }
    },
    "Beautiful Peacock": {
        atlasData: {
            "frames": {
                "BeautifulPeacock1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "BeautifulPeacock2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "BeautifulPeacock3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "BeautifulPeacock4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["BeautifulPeacock1", "BeautifulPeacock2", "BeautifulPeacock3", "BeautifulPeacock4"]
            },

            "meta": {
                "image": "assets/spritesheets/BeautifulPeacock.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Beautiful Peacock",
            type: "Regen",
            health: 12000,
            speed: 1.2,
            damage: 5,
            killValue: 555,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.3,
            regen: 155,
            armour: 30
        }
    },
    "Twilight Great White": {
        atlasData: {
            "frames": {
                "TwilightGreatWhite1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "TwilightGreatWhite2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "TwilightGreatWhite3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "TwilightGreatWhite4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["TwilightGreatWhite1", "TwilightGreatWhite2", "TwilightGreatWhite3", "TwilightGreatWhite4"]
            },

            "meta": {
                "image": "assets/spritesheets/TwilightGreatWhite.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Twilight Great White",
            type: "SlowImmune",
            health: 16500,
            speed: 0.8,
            damage: 5,
            killValue: 670,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.077,
            slowImmune: true
        }
    },
    "Dashing Dasher": {
        atlasData: {
            "frames": {
                "DashingDasher1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "DashingDasher2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "DashingDasher3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "DashingDasher4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["DashingDasher1", "DashingDasher2", "DashingDasher3", "DashingDasher4"]
            },

            "meta": {
                "image": "assets/spritesheets/DashingDasher.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Dashing Dasher",
            type: "Fast",
            health: 22000,
            speed: 1.8,
            damage: 5,
            killValue: 777,
            rotationSpeed: 1.2,
            isLooking: false,
            animationSpeed: 0.12,
            armour: 30
        }
    },
    "Titanium Bruiser": {
        atlasData: {
            "frames": {
                "TitaniumBruiser1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "TitaniumBruiser2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "TitaniumBruiser3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "TitaniumBruiser4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["TitaniumBruiser1", "TitaniumBruiser2", "TitaniumBruiser3", "TitaniumBruiser4"]
            },

            "meta": {
                "image": "assets/spritesheets/TitaniumBruiser.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Titanium Bruiser",
            type: "Armoured",
            health: 25000,
            speed: 0.7,
            damage: 10,
            killValue: 1470,
            armour: 540,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.21
        }
    },
    "12p 2028": {
        atlasData: {
            "frames": {
                "12p 2028_1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "12p 2028_2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "12p 2028_3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "12p 2028_4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "12p 2028_5":
                {
                    "frame": { "x": 1000, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "12p 2028_6":
                {
                    "frame": { "x": 1250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["12p 2028_1", "12p 2028_2", "12p 2028_3", "12p 2028_4", "12p 2028_5", "12p 2028_6"]
            },

            "meta": {
                "image": "assets/spritesheets/12p2028.png",
                "format": "RGBA8888",
                "size": { "w": 1500, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "12p 2028",
            type: "EMP",
            health: 33300,
            speed: 1.5,
            damage: 15,
            killValue: 2250,
            armour: 155,
            rotationSpeed: 1,
            isLooking: false,
            animationSpeed: 0.2
        }
    },
    "Furious Raven": {
        atlasData: {
            "frames": {
                "FuriousRaven1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "FuriousRaven2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["FuriousRaven1", "FuriousRaven2"]
            },

            "meta": {
                "image": "assets/spritesheets/FuriousRaven.png",
                "format": "RGBA8888",
                "size": { "w": 500, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Furious Raven",
            type: "Hybrid",
            health: 42000,
            speed: 1.2,
            damage: 6,
            killValue: 4250,
            armour: 350,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0
        }
    },
    "Remorseless Rigel": {
        atlasData: {
            "frames": {
                "RemorselessRigel1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "RemorselessRigel2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "RemorselessRigel3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "RemorselessRigel4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "RemorselessRigel5":
                {
                    "frame": { "x": 1000, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "RemorselessRigel6":
                {
                    "frame": { "x": 1250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["RemorselessRigel1", "RemorselessRigel2", "RemorselessRigel3", "RemorselessRigel4", "RemorselessRigel5", "RemorselessRigel6"]
            },

            "meta": {
                "image": "assets/spritesheets/RemorselessRigel.png",
                "format": "RGBA8888",
                "size": { "w": 1500, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Remorseless Rigel",
            type: "Boss",
            health: 500000,
            speed: 1,
            damage: 99999,
            killValue: 75000,
            rotationSpeed: 0.18,
            isLooking: false,
            animationSpeed: 0.1,
            regen: 500,
            armour: 700
        }
    },
    "Sophomore Dodecahedron": {
        atlasData: {
            "frames": {
                "SophomoreDodecahedron1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "SophomoreDodecahedron2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "SophomoreDodecahedron3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["SophomoreDodecahedron1", "SophomoreDodecahedron2", "SophomoreDodecahedron3"]
            },

            "meta": {
                "image": "assets/spritesheets/SophomoreDodecahedron.png",
                "format": "RGBA8888",
                "size": { "w": 750, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Sophomore Dodecahedron",
            type: "Normal",
            health: 55000,
            speed: 0.8,
            damage: 8,
            killValue: 4100,
            rotationSpeed: 0.24,
            isLooking: false,
            animationSpeed: 0.11,
            armour: 700
        }
    },
    "Alluring Rooster": {
        atlasData: {
            "frames": {
                "AlluringRooster1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "AlluringRooster2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "AlluringRooster3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "AlluringRooster4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["AlluringRooster1", "AlluringRooster2", "AlluringRooster3", "AlluringRooster4"]
            },

            "meta": {
                "image": "assets/spritesheets/AlluringRooster.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Alluring Rooster",
            type: "Regen",
            health: 72000,
            speed: 0.8,
            damage: 10,
            killValue: 6200,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.18,
            regen: 1000,
            armour: 550
        }
    },
    "Neptunian Megalodon": {
        atlasData: {
            "frames": {
                "NeptunianMegalodon1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "NeptunianMegalodon2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "NeptunianMegalodon3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "NeptunianMegalodon4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["NeptunianMegalodon1", "NeptunianMegalodon2", "NeptunianMegalodon3", "NeptunianMegalodon4"]
            },

            "meta": {
                "image": "assets/spritesheets/NeptunianMegalodon.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Neptunian Megalodon",
            type: "SlowImmune",
            health: 80000,
            speed: 1.1,
            damage: 5,
            killValue: 9000,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.06,
            slowImmune: true,
            armour: 1200
        }
    },
    "Kingda Ka Zipper": {
        atlasData: {
            "frames": {
                "KingdaKaZipper1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "KingdaKaZipper2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "KingdaKaZipper3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "KingdaKaZipper4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["KingdaKaZipper1", "KingdaKaZipper2", "KingdaKaZipper3", "KingdaKaZipper4"]
            },

            "meta": {
                "image": "assets/spritesheets/KingdaKaZipper.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Kingda Ka Zipper",
            type: "Fast",
            health: 128000,
            speed: 2.1,
            damage: 10,
            killValue: 12000,
            rotationSpeed: 1.4,
            isLooking: false,
            animationSpeed: 0.10,
            armour: 1200
        }
    },
    "Obsidian Ripper": {
        atlasData: {
            "frames": {
                "ObsidianRipper1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "ObsidianRipper2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "ObsidianRipper3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "ObsidianRipper4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["ObsidianRipper1", "ObsidianRipper2", "ObsidianRipper3", "ObsidianRipper4"]
            },

            "meta": {
                "image": "assets/spritesheets/ObsidianRipper.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Obsidian Ripper",
            type: "Armoured",
            health: 140000,
            speed: 0.7,
            damage: 10,
            killValue: 16500,
            armour: 7000,
            rotationSpeed: 0.07,
            isLooking: false,
            animationSpeed: 0.07
        }
    },
    "256p 2152": {
        atlasData: {
            "frames": {
                "256p 2152_1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "256p 2152_2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "256p 2152_3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "256p 2152_4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "256p 2152_5":
                {
                    "frame": { "x": 1000, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "256p 2152_6":
                {
                    "frame": { "x": 1250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["256p 2152_1", "256p 2152_2", "256p 2152_3", "256p 2152_4", "256p 2152_5", "256p 2152_6"]
            },

            "meta": {
                "image": "assets/spritesheets/256p2152.png",
                "format": "RGBA8888",
                "size": { "w": 1500, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "256p 2152",
            type: "EMP",
            health: 180000,
            speed: 1,
            damage: 30,
            killValue: 22000,
            armour: 3000,
            rotationSpeed: 1.2,
            isLooking: false,
            animationSpeed: 0.27
        }
    },
    "Enraged Eagle": {
        atlasData: {
            "frames": {
                "EnragedEagle1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "EnragedEagle2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["EnragedEagle1", "EnragedEagle2"]
            },

            "meta": {
                "image": "assets/spritesheets/EnragedEagle.png",
                "format": "RGBA8888",
                "size": { "w": 500, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Enraged Eagle",
            type: "Hybrid",
            health: 280000,
            speed: 0.7,
            damage: 12,
            killValue: 39000,
            armour: 5000,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.02
        }
    },
    "Unforgiving Stephenson 2-18": {
        atlasData: {
            "frames": {
                "UnforgivingStephenson 2-18_1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "UnforgivingStephenson 2-18_2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "UnforgivingStephenson 2-18_3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "UnforgivingStephenson 2-18_4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "UnforgivingStephenson 2-18_5":
                {
                    "frame": { "x": 1000, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "UnforgivingStephenson 2-18_6":
                {
                    "frame": { "x": 1250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["UnforgivingStephenson 2-18_1", "UnforgivingStephenson 2-18_2", "UnforgivingStephenson 2-18_3", "UnforgivingStephenson 2-18_4", "UnforgivingStephenson 2-18_5", "UnforgivingStephenson 2-18_6"]
            },

            "meta": {
                "image": "assets/spritesheets/UnforgivingStephenson218.png",
                "format": "RGBA8888",
                "size": { "w": 1500, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Unforgiving Stephenson 2-18",
            type: "Boss",
            health: 8000000,
            speed: 0.8,
            damage: 99999,
            killValue: 300000,
            rotationSpeed: 0.13,
            isLooking: false,
            animationSpeed: 0.1,
            regen: 0,
            armour: 18000
        }
    },
    "Jr. Rhombicosidodecahedron": {
        atlasData: {
            "frames": {
                "JrRhombicosidodecahedron1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "JrRhombicosidodecahedron2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "JrRhombicosidodecahedron3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["JrRhombicosidodecahedron1", "JrRhombicosidodecahedron2", "JrRhombicosidodecahedron3"]
            },

            "meta": {
                "image": "assets/spritesheets/JrRhombicosidodecahedron.png",
                "format": "RGBA8888",
                "size": { "w": 750, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Jr. Rhombicosidodecahedron",
            type: "Normal",
            health: 350000,
            speed: 0.7,
            damage: 10,
            killValue: 38000,
            rotationSpeed: 0.10,
            isLooking: false,
            animationSpeed: 0.06,
            armour: 8500
        }
    },
    "Irresistible Phoenix": {
        atlasData: {
            "frames": {
                "IrresistiblePhoenix1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "IrresistiblePhoenix2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "IrresistiblePhoenix3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "IrresistiblePhoenix4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["IrresistiblePhoenix1", "IrresistiblePhoenix2", "IrresistiblePhoenix3", "IrresistiblePhoenix4"]
            },

            "meta": {
                "image": "assets/spritesheets/IrresistiblePhoenix.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Irresistible Phoenix",
            type: "Regen",
            health: 420000,
            speed: 0.6,
            damage: 10,
            killValue: 65000,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.1,
            regen: 12500,
            armour: 8000
        }
    },
    "Challenger Deep Kraken": {
        atlasData: {
            "frames": {
                "ChallengerDeepKraken1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "ChallengerDeepKraken2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "ChallengerDeepKraken3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "ChallengerDeepKraken4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["ChallengerDeepKraken1", "ChallengerDeepKraken2", "ChallengerDeepKraken3", "ChallengerDeepKraken4"]
            },

            "meta": {
                "image": "assets/spritesheets/ChallengerDeepKraken.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Challenger Deep Kraken",
            type: "SlowImmune",
            health: 520000,
            speed: 1.2,
            damage: 10,
            killValue: 75000,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.04,
            slowImmune: true,
            armour: 12000
        }
    },
    "Near-Light Zoomer": {
        atlasData: {
            "frames": {
                "NearLightZoomer1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "NearLightZoomer2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "NearLightZoomer3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "NearLightZoomer4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["NearLightZoomer1", "NearLightZoomer2", "NearLightZoomer3", "NearLightZoomer4"]
            },

            "meta": {
                "image": "assets/spritesheets/NearLightZoomer.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Near-Light Zoomer",
            type: "Fast",
            health: 1000000,
            speed: 2.8,
            damage: 12,
            killValue: 85000,
            rotationSpeed: 1.3,
            isLooking: false,
            animationSpeed: 0.22,
            armour: 15000
        }
    },
    "Carbon Nanotube Annihilator": {
        atlasData: {
            "frames": {
                "CarbonNanotubeAnnihilator1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "CarbonNanotubeAnnihilator2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "CarbonNanotubeAnnihilator3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "CarbonNanotubeAnnihilator4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["CarbonNanotubeAnnihilator1", "CarbonNanotubeAnnihilator2", "CarbonNanotubeAnnihilator3", "CarbonNanotubeAnnihilator4"]
            },

            "meta": {
                "image": "assets/spritesheets/CarbonNanotubeAnnihilator.png",
                "format": "RGBA8888",
                "size": { "w": 1000, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Carbon Nanotube Annihilator",
            type: "Armoured",
            health: 1250000,
            speed: 0.7,
            damage: 18,
            killValue: 95000,
            armour: 22000,
            rotationSpeed: 1,
            isLooking: true,
            animationSpeed: 0.07
        }
    },
    "2^1024p 137632": {
        atlasData: {
            "frames": {
                "2^1024p 137632_1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "2^1024p 137632_2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "2^1024p 137632_3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "2^1024p 137632_4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "2^1024p 137632_5":
                {
                    "frame": { "x": 1000, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["2^1024p 137632_1", "2^1024p 137632_2", "2^1024p 137632_3", "2^1024p 137632_4", "2^1024p 137632_5"]
            },

            "meta": {
                "image": "assets/spritesheets/2e1024p137632.png",
                "format": "RGBA8888",
                "size": { "w": 1250, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "2^1024p 137632",
            type: "EMP",
            health: 1500000,
            speed: 0.9,
            damage: 30,
            killValue: 110000,
            armour: 27000,
            rotationSpeed: 0.11,
            isLooking: false,
            animationSpeed: 0.25
        }
    },
    "Merciless Loch Ness": {
        atlasData: {
            "frames": {
                "MercilessLochNess1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "MercilessLochNess2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["MercilessLochNess1", "MercilessLochNess2"]
            },

            "meta": {
                "image": "assets/spritesheets/MercilessLochNess.png",
                "format": "RGBA8888",
                "size": { "w": 500, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "Merciless Loch Ness",
            type: "Hybrid",
            health: 2000000,
            speed: 0.7,
            damage: 20,
            killValue: 127000,
            armour: 20000,
            rotationSpeed: 0,
            isLooking: true,
            animationSpeed: 0.02,
            regen: 7500
        }
    },
    "TON 618": {
        atlasData: {
            "frames": {
                "TON618_1":
                {
                    "frame": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "TON618_2":
                {
                    "frame": { "x": 250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "TON618_3":
                {
                    "frame": { "x": 500, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "TON618_4":
                {
                    "frame": { "x": 750, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "TON618_5":
                {
                    "frame": { "x": 1000, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                },
                "TON618_6":
                {
                    "frame": { "x": 1250, "y": 0, "w": 250, "h": 250 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 250 },
                    "sourceSize": { "w": 250, "h": 250 }
                }
            },

            "animations": {
                "enemy": ["TON618_1", "TON618_2", "TON618_3", "TON618_4", "TON618_5", "TON618_6"]
            },

            "meta": {
                "image": "assets/spritesheets/TON618.png",
                "format": "RGBA8888",
                "size": { "w": 1500, "h": 250 },
                "scale": "1"
            }
        },
        "stats": {
            className: "TON 618",
            type: "Boss",
            health: 110000000, //999999999
            speed: 0.1,
            damage: 99999,
            killValue: 1000000,
            rotationSpeed: 0.01,
            isLooking: false,
            animationSpeed: 0.05,
            regen: 0,
            armour: 192575,
            slowImmune: true
        }
    }
}

const zappedAtlasData = {
    "frames": {
        "zapped1":
        {
            "frame": { "x": 0, "y": 0, "w": 500, "h": 500 },
            "spriteSourceSize": { "x": 0, "y": 0, "w": 500, "h": 500 },
            "sourceSize": { "w": 500, "h": 500 }
        },
        "zapped2":
        {
            "frame": { "x": 500, "y": 0, "w": 500, "h": 500 },
            "spriteSourceSize": { "x": 0, "y": 0, "w": 500, "h": 500 },
            "sourceSize": { "w": 500, "h": 500 }
        },
        "zapped3":
        {
            "frame": { "x": 1000, "y": 0, "w": 500, "h": 500 },
            "spriteSourceSize": { "x": 0, "y": 0, "w": 500, "h": 500 },
            "sourceSize": { "w": 500, "h": 500 }
        }
    },

    "animations": {
        "empParticle": ["zapped1", "zapped2", "zapped3"]
    },

    "meta": {
        "image": "assets/spritesheets/towerZapped.png",
        "format": "RGBA8888",
        "size": { "w": 1500, "h": 500 },
        "scale": "1"
    }
}

//UnforgivingStephenson218

export { allEnemyData, zappedAtlasData }

