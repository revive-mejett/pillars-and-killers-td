import { EnemyData } from "src/ts/types/EnemyData"


const allEnemyData : EnemyData = {

    "infantCircle" : {
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
            health: 100,
            speed: 1,
            damage: 1,
            killValue: 15,
            animationSpeed: 0.1
        }
    }
}

export { allEnemyData }