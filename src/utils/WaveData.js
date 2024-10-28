import { Wave } from "../objects/Wave.js"


const testWaves1 = [
    new Wave(
        [
            {
                enemy: "blueCircle",
                count: 55,
                spacingMillis: 100,
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

export { testWaves1, testWaves2, prodWaves }


