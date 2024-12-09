import { Wave } from "../objects/Wave"

const oneEnemy = [
    //wave 1
    new Wave(
        [
            {
                enemy: "TON 618",
                count: 1,
                spacingMillis: 1000
            }
        ]
    ),
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
                enemy: "Stone Pricker",
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
    //wave 21
    new Wave(
        [
            {
                enemy: "Toddler Sphere",
                count: 5,
                spacingMillis: 1200
            },
            {
                enemy: "4p 2024",
                count: 3,
                spacingMillis: 500
            },
            {
                enemy: "Mean Triangle",
                count: 6,
                spacingMillis: 800
            },
            {
                enemy: "Toddler Sphere",
                count: 5,
                spacingMillis: 1000
            },
        ]
    ),
    //wave 22
    new Wave(
        [
            {
                enemy: "Cute Crow",
                count: 5,
                spacingMillis: 400
            },
            {
                enemy: "Stone Pricker",
                count: 5,
                spacingMillis: 100
            },
            {
                enemy: "Toddler Sphere",
                count: 13,
                spacingMillis: 1300
            },
        ]
    ),
]




















// /**
//  * legacy old waves
//  */
// const ancientWaves = [
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

//for production
const productionWaves = [
    //wave 1
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 10,
                spacingMillis: 800
            }
        ]
    ),
    //wave 2
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 18,
                spacingMillis: 600
            }
        ]
    ),
    //wave 3
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
    //wave 4
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 5,
                spacingMillis: 1000
            },
            {
                enemy: "Little Sparrow",
                count: 5,
                spacingMillis: 700
            },
            {
                enemy: "Earthling Flake",
                count: 5,
                spacingMillis: 2000
            }
        ]
    ),
    //wave 5
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 30,
                spacingMillis: 250
            }
        ]
    ),
    //wave 6
    new Wave(
        [
            {
                enemy: "Quick Bonhomme",
                count: 4,
                spacingMillis: 2500
            },
            {
                enemy: "Little Sparrow",
                count: 10,
                spacingMillis: 500
            },
            {
                enemy: "Infant Circle",
                count: 8,
                spacingMillis: 400
            }
        ]
    ),
    //wave 7
    new Wave(
        [
            {
                enemy: "Earthling Flake",
                count: 5,
                spacingMillis: 400
            },
            {
                enemy: "Infant Circle",
                count: 15,
                spacingMillis: 1500
            },
            {
                enemy: "Quick Bonhomme",
                count: 15,
                spacingMillis: 1500
            }
        ]
    ),
    //wave 8
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
    //wave 9
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
    ),
    //wave 10
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 14,
                spacingMillis: 300
            },
            {
                enemy: "Little Sparrow",
                count: 8,
                spacingMillis: 700
            },
            {
                enemy: "Quick Bonhomme",
                count: 6,
                spacingMillis: 2000
            },
            {
                enemy: "Earthling Flake",
                count: 3,
                spacingMillis: 2000
            },
            {
                enemy: "Stone Pricker",
                count: 2,
                spacingMillis: 5000
            }
        ]
    ),
    //wave 11
    new Wave(
        [
            {
                enemy: "Quick Bonhomme",
                count: 15,
                spacingMillis: 800
            },
            {
                enemy: "Infant Circle",
                count: 1,
                spacingMillis: 1
            },
            {
                enemy: "Quick Bonhomme",
                count: 12,
                spacingMillis: 2
            },
            {
                enemy: "Earthling Flake",
                count: 6,
                spacingMillis: 2000
            },
            {
                enemy: "Stone Pricker",
                count: 2,
                spacingMillis: 500
            }
        ]
    ),
    //wave 12
    new Wave(
        [
            {
                enemy: "Stone Pricker",
                count: 4,
                spacingMillis: 1200
            },
            {
                enemy: "Little Sparrow",
                count: 10,
                spacingMillis: 800
            },
            {
                enemy: "Infant Circle",
                count: 8,
                spacingMillis: 400
            },
            {
                enemy: "Earthling Flake",
                count: 8,
                spacingMillis: 750
            },
            {
                enemy: "Stone Pricker",
                count: 1,
                spacingMillis: 120
            }
        ]
    ),
    //wave 13
    new Wave(
        [
            {
                enemy: "4p 2024",
                count: 1,
                spacingMillis: 800
            },
            {
                enemy: "Earthling Flake",
                count: 6,
                spacingMillis: 600
            },
            {
                enemy: "Quick Bonhomme",
                count: 5,
                spacingMillis: 1000
            },
            {
                enemy: "Earthling Flake",
                count: 6,
                spacingMillis: 600
            },
            {
                enemy: "Quick Bonhomme",
                count: 5,
                spacingMillis: 1000
            }
        ]
    ),
    // wave 14
    new Wave(
        [
            {
                enemy: "Quick Bonhomme",
                count: 3,
                spacingMillis: 500
            },
            {
                enemy: "Little Sparrow",
                count: 5,
                spacingMillis: 600
            },
            {
                enemy: "4p 2024",
                count: 1,
                spacingMillis: 1000
            },
            {
                enemy: "Quick Bonhomme",
                count: 4,
                spacingMillis: 2000
            },
            {
                enemy: "Stone Pricker",
                count: 3,
                spacingMillis: 1000
            }
        ]
    ),
    // wave 15
    new Wave(
        [
            {
                enemy: "Mean Triangle",
                count: 1,
                spacingMillis: 600
            },
            {
                enemy: "Stone Pricker",
                count: 3,
                spacingMillis: 600
            },
            {
                enemy: "Infant Circle",
                count: 30,
                spacingMillis: 200
            },
            {
                enemy: "Earthling Flake",
                count: 7,
                spacingMillis: 800
            }
        ]
    ),
    // wave 16
    new Wave(
        [
            {
                enemy: "Mean Triangle",
                count: 2,
                spacingMillis: 4000
            },
            {
                enemy: "4p 2024",
                count: 3,
                spacingMillis: 600
            },
            {
                enemy: "Infant Circle",
                count: 3,
                spacingMillis: 200
            },
            {
                enemy: "Quick Bonhomme",
                count: 10,
                spacingMillis: 900
            }
        ]
    ),
    // wave 17
    new Wave(
        [
            {
                enemy: "Stone Pricker",
                count: 8,
                spacingMillis: 2000
            }
        ]
    ),
    // wave 18
    new Wave(
        [
            {
                enemy: "Mean Triangle",
                count: 7,
                spacingMillis: 3000
            },
            {
                enemy: "4p 2024",
                count: 5,
                spacingMillis: 1000
            },
            {
                enemy: "Infant Circle",
                count: 1,
                spacingMillis: 1
            },
            {
                enemy: "Stone Pricker",
                count: 4,
                spacingMillis: 700
            },
            {
                enemy: "Quick Bonhomme",
                count: 8,
                spacingMillis: 200
            },
            {
                enemy: "Mean Triangle",
                count: 7,
                spacingMillis: 5000
            }
        ]
    ),
    // wave 19
    new Wave(
        [
            {
                enemy: "4p 2024",
                count: 5,
                spacingMillis: 1000
            },
            {
                enemy: "Mean Triangle",
                count: 2,
                spacingMillis: 500
            },
            {
                enemy: "Earthling Flake",
                count: 4,
                spacingMillis: 500
            },
            {
                enemy: "Stone Pricker",
                count: 5,
                spacingMillis: 600
            },
            {
                enemy: "4p 2024",
                count: 1,
                spacingMillis: 1
            },
            {
                enemy: "Mean Triangle",
                count: 3,
                spacingMillis: 500
            },
            {
                enemy: "Quick Bonhomme",
                count: 6,
                spacingMillis: 700
            },
            {
                enemy: "Quick Bonhomme",
                count: 1,
                spacingMillis: 3000
            }
        ]
    ),
    // wave 20 boss =============================================
    new Wave(
        [
            {
                enemy: "Brave Proxima Centauri",
                count: 1,
                spacingMillis: 7000
            }
        ]
    ),
    //wave 21
    new Wave(
        [
            {
                enemy: "Toddler Sphere",
                count: 5,
                spacingMillis: 1200
            },
            {
                enemy: "4p 2024",
                count: 3,
                spacingMillis: 500
            },
            {
                enemy: "Mean Triangle",
                count: 6,
                spacingMillis: 800
            },
            {
                enemy: "Toddler Sphere",
                count: 5,
                spacingMillis: 1000
            },
        ]
    ),
    //wave 22
    new Wave(
        [
            {
                enemy: "Cute Crow",
                count: 5,
                spacingMillis: 400
            },
            {
                enemy: "Stone Pricker",
                count: 5,
                spacingMillis: 100
            },
            {
                enemy: "Toddler Sphere",
                count: 13,
                spacingMillis: 1300
            }
        ]
    ),
    //wave 23
    new Wave(
        [
            {
                enemy: "Cute Crow",
                count: 8,
                spacingMillis: 500
            },
            {
                enemy: "Quick Bonhomme",
                count: 30,
                spacingMillis: 250
            },
            {
                enemy: "Polar Goldfish",
                count: 1,
                spacingMillis: 2000
            },
            {
                enemy: "4p 2024",
                count: 10,
                spacingMillis: 600
            }
        ]
    ),
    //wave 24
    new Wave(
        [
            {
                enemy: "Fast Runner",
                count: 2,
                spacingMillis: 2000
            },
            {
                enemy: "Toddler Sphere",
                count: 8,
                spacingMillis: 250
            },
            {
                enemy: "Cute Crow",
                count: 5,
                spacingMillis: 1000
            },
            {
                enemy: "Mean Triangle",
                count: 6,
                spacingMillis: 200
            },
            {
                enemy: "Toddler Sphere",
                count: 15,
                spacingMillis: 750
            }
        ]
    ),
    //wave 25
    new Wave(
        [
            {
                enemy: "Polar Goldfish",
                count: 5,
                spacingMillis: 1400
            },
            {
                enemy: "Polar Goldfish",
                count: 10,
                spacingMillis: 800
            },
        ]
    ),
    //wave 26
    new Wave(
        [
            {
                enemy: "Cute Crow",
                count: 6,
                spacingMillis: 700
            },
            {
                enemy: "Polar Goldfish",
                count: 5,
                spacingMillis: 400
            },
            {
                enemy: "Toddler Sphere",
                count: 20,
                spacingMillis: 600
            },
        ]
    ),
    //wave 27
    new Wave(
        [
            {
                enemy: "Cute Crow",
                count: 2,
                spacingMillis: 700
            },
            {
                enemy: "Fast Runner",
                count: 5,
                spacingMillis: 1000
            },
            {
                enemy: "Cute Crow",
                count: 5,
                spacingMillis: 600
            },
            {
                enemy: "Polar Goldfish",
                count: 7,
                spacingMillis: 650
            },
        ]
    ),
    //wave 28
    new Wave(
        [
            {
                enemy: "Steel Warrior",
                count: 3,
                spacingMillis: 3000
            },
            {
                enemy: "Fast Runner",
                count: 6,
                spacingMillis: 1000
            },
        ]
    ),
    //wave 29
    new Wave(
        [
            {
                enemy: "Fast Runner",
                count: 3,
                spacingMillis: 500
            },
            {
                enemy: "4p 2024",
                count: 25,
                spacingMillis: 200
            },
            {
                enemy: "Fast Runner",
                count: 4,
                spacingMillis: 700
            },
            {
                enemy: "Toddler Sphere",
                count: 14,
                spacingMillis: 200
            },
            {
                enemy: "Fast Runner",
                count: 5,
                spacingMillis: 800
            },
        ]
    ),
    //wave 30
    new Wave(
        [
            {
                enemy: "Polar Goldfish",
                count: 8,
                spacingMillis: 500
            },
            {
                enemy: "Fast Runner",
                count: 8,
                spacingMillis: 2000
            }
        ]
    ),
    //wave 31
    new Wave(
        [
            {
                enemy: "Steel Warrior",
                count: 4,
                spacingMillis: 1000
            },
            {
                enemy: "Cute Crow",
                count: 5,
                spacingMillis: 100
            },
            {
                enemy: "5p 2025",
                count: 3,
                spacingMillis: 2000
            },
        ]
    ),
    //wave 32
    new Wave(
        [
            {
                enemy: "Fast Runner",
                count: 5,
                spacingMillis: 400
            },
            {
                enemy: "Quick Bonhomme",
                count: 40,
                spacingMillis: 300
            },
            {
                enemy: "Steel Warrior",
                count: 2,
                spacingMillis: 600
            }
        ]
    ),
    //wave 33
    new Wave(
        [
            {
                enemy: "Polar Goldfish",
                count: 7,
                spacingMillis: 8
            },
            {
                enemy: "5p 2025",
                count: 1,
                spacingMillis: 600
            },
            {
                enemy: "Polar Goldfish",
                count: 5,
                spacingMillis: 600
            },
            {
                enemy: "5p 2025",
                count: 2,
                spacingMillis: 600
            },
            {
                enemy: "Polar Goldfish",
                count: 3,
                spacingMillis: 600
            },
            {
                enemy: "5p 2025",
                count: 3,
                spacingMillis: 600
            },
        ]
    ),
    //wave 34
    new Wave(
        [
            {
                enemy: "Fast Runner",
                count: 5,
                spacingMillis: 400
            },
            {
                enemy: "Quick Bonhomme",
                count: 40,
                spacingMillis: 300
            },
            {
                enemy: "Steel Warrior",
                count: 2,
                spacingMillis: 600
            }
        ]
    ),
    //wave 35
    new Wave(
        [
            {
                enemy: "Angry Piranha",
                count: 5,
                spacingMillis: 5000
            },
            {
                enemy: "5p 2025",
                count: 1,
                spacingMillis: 600
            },
            {
                enemy: "Fast Runner",
                count: 2,
                spacingMillis: 300
            },
            {
                enemy: "Polar Goldfish",
                count: 5,
                spacingMillis: 600
            },
            {
                enemy: "5p 2025",
                count: 2,
                spacingMillis: 600
            },
            {
                enemy: "Fast Runner",
                count: 2,
                spacingMillis: 300
            },
            {
                enemy: "Polar Goldfish",
                count: 3,
                spacingMillis: 600
            },
            {
                enemy: "5p 2025",
                count: 3,
                spacingMillis: 600
            },
        ]
    ),
    //wave 36
    new Wave(
        [
            {
                enemy: "Steel Warrior",
                count: 5,
                spacingMillis: 2000
            },
            {
                enemy: "5p 2025",
                count: 5,
                spacingMillis: 800
            },
            {
                enemy: "Fast Runner",
                count: 12,
                spacingMillis: 1700
            },
            {
                enemy: "5p 2025",
                count: 2,
                spacingMillis: 500
            },
        ]
    ),
    //wave 37
    new Wave(
        [
            {
                enemy: "5p 2025",
                count: 4,
                spacingMillis: 2000
            },
            {
                enemy: "Steel Warrior",
                count: 5,
                spacingMillis: 800
            },
            {
                enemy: "Angry Piranha",
                count: 2,
                spacingMillis: 1700
            },
            {
                enemy: "Fast Runner",
                count: 5,
                spacingMillis: 400
            },
        ]
    ),
    //wave 38
    new Wave(
        [
            {
                enemy: "Angry Piranha",
                count: 4,
                spacingMillis: 2000
            },
            {
                enemy: "5p 2025",
                count: 6,
                spacingMillis: 800
            },
            {
                enemy: "Angry Piranha",
                count: 7,
                spacingMillis: 1200
            },
            {
                enemy: "Steel Warrior",
                count: 10,
                spacingMillis: 1000
            },
        ]
    ),
    //wave 39
    new Wave(
        [
            {
                enemy: "Angry Piranha",
                count: 12,
                spacingMillis: 2000
            },
            {
                enemy: "Fast Runner",
                count: 14,
                spacingMillis: 700
            },
            {
                enemy: "Polar Goldfish",
                count: 10,
                spacingMillis: 400
            },
            {
                enemy: "Cute Crow",
                count: 4,
                spacingMillis: 3000
            }
        ]
    ),
    // wave 40 boss =============================================
    new Wave(
        [
            {
                enemy: "Serious Sirius",
                count: 1,
                spacingMillis: 7000
            }
        ]
    ),
    // wave 41
    new Wave(
        [
            {
                enemy: "Steel Warrior",
                count: 5,
                spacingMillis: 2400
            },
            {
                enemy: "Angry Piranha",
                count: 5,
                spacingMillis: 600
            },
            {
                enemy: "Freshman Octahedron",
                count: 9,
                spacingMillis: 1700
            },
            {
                enemy: "Fast Runner",
                count: 10,
                spacingMillis: 1700
            },
        ]
    ),
    // wave 42
    new Wave(
        [
            {
                enemy: "Freshman Octahedron",
                count: 6,
                spacingMillis: 1000
            },
            {
                enemy: "5p 2025",
                count: 6,
                spacingMillis: 1000
            },
            {
                enemy: "Freshman Octahedron",
                count: 7,
                spacingMillis: 1000
            },
        ]
    ),
    // wave 43
    new Wave(
        [
            {
                enemy: "Fast Runner",
                count: 10,
                spacingMillis: 800
            },
            {
                enemy: "Beautiful Peacock",
                count: 3,
                spacingMillis: 1000
            },
            {
                enemy: "Freshman Octahedron",
                count: 3,
                spacingMillis: 1200
            },
            {
                enemy: "Beautiful Peacock",
                count: 3,
                spacingMillis: 1200
            },
            {
                enemy: "Freshman Octahedron",
                count: 5,
                spacingMillis: 400
            },
        ]
    ),
    // wave 44
    new Wave(
        [
            {
                enemy: "Fast Runner",
                count: 5,
                spacingMillis: 300
            },
            {
                enemy: "Twilight Great White",
                count: 1,
                spacingMillis: 500
            },
            {
                enemy: "Angry Piranha",
                count: 6,
                spacingMillis: 500
            },
            {
                enemy: "Polar Goldfish",
                count: 1,
                spacingMillis: 500
            },
            {
                enemy: "Twilight Great White",
                count: 1,
                spacingMillis: 500
            },
            {
                enemy: "Angry Piranha",
                count: 4,
                spacingMillis: 300
            },
            {
                enemy: "Quick Bonhomme",
                count: 100,
                spacingMillis: 200
            },
        ]
    ),
    // wave 45
    new Wave(
        [
            {
                enemy: "Dashing Dasher", // change to dashing dasher after testing each t3 killer
                count: 6,
                spacingMillis: 2000
            },
        ]
    ),
    // wave 46 placeholder wave
    new Wave(
        [
            {
                enemy: "Infant Circle",
                count: 10,
                spacingMillis: 500
            },
            {
                enemy: "Toddler Sphere",
                count: 10,
                spacingMillis: 500
            },
            {
                enemy: "Freshman Octahedron",
                count: 10,
                spacingMillis: 500
            },
            {
                enemy: "Twilight Great White",
                count: 7,
                spacingMillis: 1200
            }
        ]
    ),
    // wave 47 placeholder wave
    new Wave(
        [
            {
                enemy: "Beautiful Peacock",
                count: 8,
                spacingMillis: 850
            },
            {
                enemy: "Angry Piranha",
                count: 16,
                spacingMillis: 1000
            },
            {
                enemy: "Beautiful Peacock",
                count: 8,
                spacingMillis: 850
            },
        ]
    ),
    // wave 48 placeholder wave
    new Wave(
        [
            {
                enemy: "Beautiful Peacock",
                count: 6,
                spacingMillis: 750
            },
            {
                enemy: "Fast Runner",
                count: 4,
                spacingMillis: 750
            },
            {
                enemy: "Dashing Dasher",
                count: 7,
                spacingMillis: 1000
            },
            {
                enemy: "Freshman Octahedron",
                count: 12,
                spacingMillis: 700
            },
        ]
    ),
    // wave 49 placeholder wave
    new Wave(
        [
            {
                enemy: "12p 2028",
                count: 3,
                spacingMillis: 2000
            }
        ]
    ),
    // wave 50 placeholder wave
    new Wave(
        [
            {
                enemy: "Titanium Bruiser",
                count: 2,
                spacingMillis: 1000
            },
            {
                enemy: "Beautiful Peacock",
                count: 5,
                spacingMillis: 600
            },
            {
                enemy: "Dashing Dasher",
                count: 2,
                spacingMillis: 2500
            },
            {
                enemy: "Titanium Bruiser",
                count: 1,
                spacingMillis: 50
            },
        ]
    ),
    // wave 51 placeholder wave
    new Wave(
        [
            {
                enemy: "Freshman Octahedron",
                count: 5,
                spacingMillis: 1000
            },
            {
                enemy: "Freshman Octahedron",
                count: 10,
                spacingMillis: 700
            },
            {
                enemy: "Freshman Octahedron",
                count: 15,
                spacingMillis: 350
            },
            {
                enemy: "Dashing Dasher",
                count: 1,
                spacingMillis: 3000
            }
        ]
    ),
    // wave 52 placeholder wave
    new Wave(
        [
            {
                enemy: "12p 2028",
                count: 1,
                spacingMillis: 1400
            },
            {
                enemy: "Titanium Bruiser",
                count: 1,
                spacingMillis: 50
            },
            {
                enemy: "Twilight Great White",
                count: 4,
                spacingMillis: 1000
            },
            {
                enemy: "12p 2028",
                count: 3,
                spacingMillis: 1400
            },
            {
                enemy: "Dashing Dasher",
                count: 1,
                spacingMillis: 1
            },
            {
                enemy: "Titanium Bruiser",
                count: 1,
                spacingMillis: 1000
            },
        ]
    ),
    // wave 53 placeholder wave
    new Wave(
        [
            {
                enemy: "Dashing Dasher",
                count: 1,
                spacingMillis: 10
            },
            {
                enemy: "12p 2028",
                count: 6,
                spacingMillis: 7000
            },
            {
                enemy: "Dashing Dasher",
                count: 1,
                spacingMillis: 10
            }
        ]
    ),
    // wave 54 placeholder wave
    new Wave(
        [
            {
                enemy: "12p 2028",
                count: 3,
                spacingMillis: 900
            },
            {
                enemy: "Twilight Great White",
                count: 13,
                spacingMillis: 400
            }
        ]
    ),
    // wave 55 placeholder wave
    new Wave(
        [
            {
                enemy: "Furious Raven",
                count: 2,
                spacingMillis: 1000
            },
            {
                enemy: "12p 2028",
                count: 1,
                spacingMillis: 1000
            },
            {
                enemy: "Fast Runner",
                count: 30,
                spacingMillis: 400
            },
            {
                enemy: "12p 2028",
                count: 1,
                spacingMillis: 1000
            },
        ]
    ),
    // wave 56 placeholder wave
    new Wave(
        [
            {
                enemy: "Titanium Bruiser",
                count: 1,
                spacingMillis: 1000
            },
            {
                enemy: "12p 2028",
                count: 1,
                spacingMillis: 1000
            },
            {
                enemy: "Titanium Bruiser",
                count: 1,
                spacingMillis: 1000
            },
            {
                enemy: "12p 2028",
                count: 1,
                spacingMillis: 1000
            },
            {
                enemy: "Titanium Bruiser",
                count: 1,
                spacingMillis: 1000
            },
            {
                enemy: "12p 2028",
                count: 1,
                spacingMillis: 1000
            },
            {
                enemy: "Titanium Bruiser",
                count: 1,
                spacingMillis: 1000
            },
            {
                enemy: "12p 2028",
                count: 1,
                spacingMillis: 1000
            },
            {
                enemy: "Titanium Bruiser",
                count: 1,
                spacingMillis: 1000
            },
            {
                enemy: "12p 2028",
                count: 1,
                spacingMillis: 1000
            }
        ]
    ),
    // wave 57 placeholder wave
    new Wave(
        [
            {
                enemy: "12p 2028",
                count: 4,
                spacingMillis: 1200
            },
            {
                enemy: "Furious Raven",
                count: 4,
                spacingMillis: 1200
            },
            {
                enemy: "12p 2028",
                count: 4,
                spacingMillis: 1200
            },
            {
                enemy: "Furious Raven",
                count: 2,
                spacingMillis: 3000
            },
            {
                enemy: "Dashing Dasher",
                count: 8,
                spacingMillis: 1000
            },
        ]
    ),
    // wave 58 placeholder wave
    new Wave(
        [
            {
                enemy: "Furious Raven",
                count: 3,
                spacingMillis: 2000
            },
            {
                enemy: "12p 2028",
                count: 3,
                spacingMillis: 4000
            },
            {
                enemy: "Dashing Dasher",
                count: 25,
                spacingMillis: 1000
            },
        ]
    ),
    // wave 59 placeholder wave
    new Wave(
        [
            {
                enemy: "12p 2028",
                count: 5,
                spacingMillis: 1000
            },
            {
                enemy: "Furious Raven",
                count: 5,
                spacingMillis: 1000
            },
            {
                enemy: "Beautiful Peacock",
                count: 7,
                spacingMillis: 1500
            }
        ]
    ),
    // wave 60 boss =============================================
    new Wave(
        [
            {
                enemy: "Remorseless Rigel",
                count: 1,
                spacingMillis: 7000
            }
        ]
    ),
    // wave 61 placeholder wave
    new Wave(
        [
            {
                enemy: "Toddler Sphere",
                count: 1,
                spacingMillis: 7000
            }
        ]
    ),
    // wave 62 placeholder wave
    new Wave(
        [
            {
                enemy: "Toddler Sphere",
                count: 1,
                spacingMillis: 7000
            }
        ]
    ),
    // wave 63 placeholder wave
    new Wave(
        [
            {
                enemy: "Toddler Sphere",
                count: 1,
                spacingMillis: 7000
            }
        ]
    ),
]


export { oneEnemy, grouped, ten10, stressTest, testWaves1, testWaves2, productionWaves }


