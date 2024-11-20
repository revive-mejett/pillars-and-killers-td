import { Wave } from "../objects/Wave"

const oneEnemy = [
    new Wave(
        [
            {
                enemy: "yellowCircle",
                count: 1,
                spacingMillis: 800
            }
        ]
    )
]

const grouped = [
    new Wave(
        [
            {
                enemy: "greenCircle",
                count: 50,
                spacingMillis: 25
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "blueCircle",
                count: 50,
                spacingMillis: 25
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "purpleCircle",
                count: 50,
                spacingMillis: 25
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "yellowCircle",
                count: 50,
                spacingMillis: 25
            }
        ]
    )
]

const testWaves1 = [
    new Wave(
        [
            {
                enemy: "blueCircle",
                count: 55,
                spacingMillis: 100
            },
            {
                enemy: "purpleCircle",
                count: 40,
                spacingMillis: 500
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "blueCircle",
                count: 7,
                spacingMillis: 800
            }
        ]
    )
]

const testWaves2 = [
    new Wave(
        [
            {
                enemy: "greenCircle",
                count: 12,
                spacingMillis: 800
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "greenCircle",
                count: 15,
                spacingMillis: 600
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "blueCircle",
                count: 5,
                spacingMillis: 1000
            },
            {
                enemy: "greenCircle",
                count: 13,
                spacingMillis: 500
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "greenCircle",
                count: 10,
                spacingMillis: 1000
            },
            {
                enemy: "blueCircle",
                count: 10,
                spacingMillis: 700
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "greenCircle",
                count: 30,
                spacingMillis: 250
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "purpleCircle",
                count: 3,
                spacingMillis: 250
            },
            {
                enemy: "blueCircle",
                count: 8,
                spacingMillis: 500
            },
            {
                enemy: "greenCircle",
                count: 8,
                spacingMillis: 400
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "greenCircle",
                count: 20,
                spacingMillis: 400
            },
            {
                enemy: "blueCircle",
                count: 15,
                spacingMillis: 1500
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "greenCircle",
                count: 5,
                spacingMillis: 600
            },
            {
                enemy: "blueCircle",
                count: 8,
                spacingMillis: 600
            },
            {
                enemy: "purpleCircle",
                count: 5,
                spacingMillis: 1500
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "blueCircle",
                count: 14,
                spacingMillis: 400
            },
            {
                enemy: "purpleCircle",
                count: 16,
                spacingMillis: 1000
            },
            {
                enemy: "yellowCircle",
                count: 1,
                spacingMillis: 1000
            }
        ]
    )

]




















/**
 * For production
 */
const prodWaves = [
    new Wave(
        [
            {
                enemy: "greenCircle",
                count: 8,
                spacingMillis: 800
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "blueCircle",
                count: 12,
                spacingMillis: 777
            },
            {
                enemy: "purpleCircle",
                count: 5,
                spacingMillis: 2000
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "greenCircle",
                count: 15,
                spacingMillis: 500
            },
            {
                enemy: "blueCircle",
                count: 10,
                spacingMillis: 700
            },
            {
                enemy: "purpleCircle",
                count: 20,
                spacingMillis: 333
            },
            {
                enemy: "yellowCircle",
                count: 5,
                spacingMillis: 2000
            }
        ]
    ),

    //TODO later move enemy data to game data json
    new Wave(
        [
            {
                enemy: "greenCircle",
                count: 15,
                spacingMillis: 500
            },
            {
                enemy: "blueCircle",
                count: 10,
                spacingMillis: 700
            },
            {
                enemy: "purpleCircle",
                count: 20,
                spacingMillis: 333
            },
            {
                enemy: "yellowCircle",
                count: 5,
                spacingMillis: 2000
            }
        ]
    )
]

export { oneEnemy, grouped, testWaves1, testWaves2, prodWaves }


