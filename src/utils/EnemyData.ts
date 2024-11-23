const enemyData = {

    "Infant Circle" : {
        "frames": {
            "infantCircle1.png":
            {
                "frame": {"x":0,"y":0,"w":250,"h":250},
                "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                "sourceSize": {"w":250,"h":250},
                "anchor": {"x":0,"y":0}
            },
            "infantCircle2.png":
            {
                "frame": {"x":750,"y":0,"w":250,"h":250},
                "spriteSourceSize": {"x":0,"y":0,"w":250,"h":250},
                "sourceSize": {"w":250,"h":250},
                "anchor": {"x":0,"y":0}
            }
        },

        "animations": {
            "enemy": ["infantCircle1.png","infantCircle2.png"]
        },

        "meta": {
            "image": "src/assets/spritesheets/InfantCircle.png",
            "format": "RGBA8888",
            "size": {"w":1000,"h":250},
            "scale": "1"
        },

        "enemyData": {
            type: "Normal",
            health: 100,
            speed: 1,
            damage: 1,
            killValue: 15
        }
    }
}

export { enemyData }