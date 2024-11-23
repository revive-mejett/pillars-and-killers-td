const enemyData = {

    "infantCircle" : {
        atlasData: {
            "frames": {
                "infantCircle1":
                {
                    "frame": {"x":0,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250},
                    "anchor": {"x":0,"y":0}
                },
                "infantCircle2":
                {
                    "frame": {"x":750,"y":0,"w":250,"h":250},
                    "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                    "sourceSize": {"w":250,"h":250},
                    "anchor": {"x":0,"y":0}
                }
            },

            "animations": {
                "enemy": ["infantCircle1","infantCircle2"]
            },

            "meta": {
                "image": "assets/spritesheets/InfantCircle.png",
                "format": "RGBA8888",
                "size": {"w":1000,"h":250},
                "scale": "1"
            }
        },
        "statsData": {
            className: "Infant Circle",
            type: "Normal",
            health: 100,
            speed: 1,
            damage: 1,
            killValue: 15
        }
    }
}

export { enemyData }