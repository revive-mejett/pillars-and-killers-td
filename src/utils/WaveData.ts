import { Wave } from "../objects/Wave"

const oneEnemy = [
    new Wave(
        [
            {
                enemy: "Quick Bonhomme",
                count: 1,
                spacingMillis: 800
            }
        ]
    )
]

const ten10 = [
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 10,
                spacingMillis: 800
            }
        ]
    )
]

const grouped = [
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 50,
                spacingMillis: 25
            }
        ]
    ),
]

const stressTest = [
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 9999,
                spacingMillis: 25
            }
        ]
    ),
]


const testWaves1 = [
    new Wave(
        [
            {
                enemy: "Little Sparrow",
                count: 55,
                spacingMillis: 100
            },
            {
                enemy: "Earthling Flake",
                count: 40,
                spacingMillis: 500
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "Little Sparrow",
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
                enemy: "Little Sparrow",
                count: 12,
                spacingMillis: 800
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 15,
                spacingMillis: 600
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "Little Sparrow",
                count: 5,
                spacingMillis: 1000
            },
            {
                enemy: "Infant Circle",
                count: 13,
                spacingMillis: 500
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 10,
                spacingMillis: 1000
            },
            {
                enemy: "Little Sparrow",
                count: 10,
                spacingMillis: 700
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 30,
                spacingMillis: 250
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "Earthling Flake",
                count: 3,
                spacingMillis: 250
            },
            {
                enemy: "Little Sparrow",
                count: 8,
                spacingMillis: 500
            },
            {
                enemy: "Infant Circle",
                count: 8,
                spacingMillis: 400
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 20,
                spacingMillis: 400
            },
            {
                enemy: "Little Sparrow",
                count: 15,
                spacingMillis: 1500
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 5,
                spacingMillis: 600
            },
            {
                enemy: "Little Sparrow",
                count: 8,
                spacingMillis: 600
            },
            {
                enemy: "Earthling Flake",
                count: 5,
                spacingMillis: 1500
            }
        ]
    ),
    new Wave(
        [
            {
                enemy: "Little Sparrow",
                count: 14,
                spacingMillis: 400
            },
            {
                enemy: "Earthling Flake",
                count: 16,
                spacingMillis: 1000
            },
            {
                enemy: "Quick Bonhomme",
                count: 1,
                spacingMillis: 1000
            }
        ]
    )

]




















// /**
//  * For production
//  */
// const prodWaves = [
//     new Wave(
//         [
//             {
//                 enemy: "Infant Circle",
//                 count: 8,
//                 spacingMillis: 800
//             }
//         ]
//     ),
//     new Wave(
//         [
//             {
//                 enemy: "Little Sparrow",
//                 count: 12,
//                 spacingMillis: 777
//             },
//             {
//                 enemy: "Earthling Flake",
//                 count: 5,
//                 spacingMillis: 2000
//             }
//         ]
//     ),
//     new Wave(
//         [
//             {
//                 enemy: "Infant Circle",
//                 count: 15,
//                 spacingMillis: 500
//             },
//             {
//                 enemy: "Little Sparrow",
//                 count: 10,
//                 spacingMillis: 700
//             },
//             {
//                 enemy: "Earthling Flake",
//                 count: 20,
//                 spacingMillis: 333
//             },
//             {
//                 enemy: "Quick Bonhomme",
//                 count: 5,
//                 spacingMillis: 2000
//             }
//         ]
//     ),

//     //TODO later move enemy data to game data json
//     new Wave(
//         [
//             {
//                 enemy: "Infant Circle",
//                 count: 15,
//                 spacingMillis: 500
//             },
//             {
//                 enemy: "Little Sparrow",
//                 count: 10,
//                 spacingMillis: 700
//             },
//             {
//                 enemy: "Earthling Flake",
//                 count: 20,
//                 spacingMillis: 333
//             },
//             {
//                 enemy: "Quick Bonhomme",
//                 count: 5,
//                 spacingMillis: 2000
//             }
//         ]
//     )
// ]

export { oneEnemy, grouped, ten10, stressTest, testWaves1, testWaves2 }


