import Waypoint from "src/ts/types/WaypointType"


export type MapData = {
    mapInfo: {
        grassColour?: number
        grassSecondaryColour?: number
        difficulty?: 1 | 2 | 3 | 4 | 5,
        grassOpacity?: number,
        pathOpacity?: number
        bgColourMapKey?: string
    },
    waypoints: Waypoint[],
    blocked?: { x: number, y: number }[]
}

const allMaps: Map<string, MapData> = new Map()



allMaps.set("Walk in the Park", {
    mapInfo: {
        difficulty: 1
    },
    waypoints: [
        {
            type: "start",
            x: 0,
            y: 15
        },
        {
            type: "point",
            x: 10,
            y: 15
        },
        {
            type: "point",
            x: 10,
            y: 13
        },
        {
            type: "point",
            x: 3,
            y: 13
        },
        {
            type: "point",
            x: 3,
            y: 11
        },
        {
            type: "point",
            x: 1,
            y: 11
        },
        {
            type: "point",
            x: 1,
            y: 2
        },
        {
            type: "point",
            x: 5,
            y: 2
        },
        {
            type: "point",
            x: 5,
            y: 9
        },
        {
            type: "point",
            x: 8,
            y: 9
        },
        {
            type: "point",
            x: 8,
            y: 3
        },
        {
            type: "point",
            x: 11,
            y: 3
        },
        {
            type: "point",
            x: 11,
            y: 9
        },
        {
            type: "point",
            x: 14,
            y: 9
        },
        {
            type: "point",
            x: 14,
            y: 1
        },
        {
            type: "point",
            x: 16,
            y: 1
        },
        {
            type: "point",
            x: 16,
            y: 18
        },
        {
            type: "point",
            x: 11,
            y: 18
        },
        {
            type: "point",
            x: 11,
            y: 20
        },
        {
            type: "point",
            x: 3,
            y: 20
        },
        {
            type: "point",
            x: 3,
            y: 18
        },
        {
            type: "point",
            x: 5,
            y: 18
        },
        {
            type: "point",
            x: 5,
            y: 22
        },
        {
            type: "point",
            x: 7,
            y: 22
        },
        {
            type: "point",
            x: 7,
            y: 23
        },
        {
            type: "point",
            x: 20,
            y: 23
        },
        {
            type: "point",
            x: 20,
            y: 20
        },
        {
            type: "point",
            x: 22,
            y: 20
        },
        {
            type: "point",
            x: 22,
            y: 16
        },
        {
            type: "point",
            x: 20,
            y: 16
        },
        {
            type: "point",
            x: 20,
            y: 17
        },
        {
            type: "point",
            x: 18,
            y: 17
        },
        {
            type: "point",
            x: 18,
            y: 10
        },
        {
            type: "point",
            x: 23,
            y: 10
        },
        {
            type: "point",
            x: 23,
            y: 4
        },
        {
            type: "point",
            x: 20,
            y: 4
        },
        {
            type: "point",
            x: 20,
            y: 2
        },
        {
            type: "end",
            x: 24,
            y: 2
        }
    ]
})

allMaps.set("Death Walk", {
    mapInfo: {
        difficulty: 1,
        grassColour: 0x160000,
        grassSecondaryColour: 0x760006
    },
    waypoints: [
        {
            type: "start",
            x: 0,
            y: 1
        },
        {
            type: "point",
            x: 0,
            y: 5
        },
        {
            type: "point",
            x: 10,
            y: 5
        },
        {
            type: "point",
            x: 10,
            y: 10
        },
        {
            type: "point",
            x: 5,
            y: 10
        },
        {
            type: "point",
            x: 5,
            y: 20
        },
        {
            type: "point",
            x: 20,
            y: 20
        },
        {
            type: "point",
            x: 20,
            y: 0
        }
    ]
})

allMaps.set("Xmas 2024", {
    mapInfo: {
        difficulty: 1,
        grassColour: 0x000344,
        grassSecondaryColour: 0x001F77
    },
    waypoints: [{
        type: "start",
        x: 12,
        y: 24
    },
    {
        type: "point",
        x: 12,
        y: 4
    },
    {
        type: "point",
        x: 13,
        y: 4
    },
    {
        type: "point",
        x: 13,
        y: 2
    },
    {
        type: "point",
        x: 11,
        y: 2
    },
    {
        type: "point",
        x: 11,
        y: 4
    },
    {
        type: "point",
        x: 12,
        y: 4
    },
    {
        type: "point",
        x: 12,
        y: 7
    },
    {
        type: "point",
        x: 7,
        y: 7
    },
    {
        type: "point",
        x: 7,
        y: 9
    },
    {
        type: "point",
        x: 17,
        y: 9
    },
    {
        type: "point",
        x: 17,
        y: 11
    },
    {
        type: "point",
        x: 5,
        y: 11
    },
    {
        type: "point",
        x: 5,
        y: 14
    },
    {
        type: "point",
        x: 19,
        y: 14
    },
    {
        type: "point",
        x: 19,
        y: 17
    },
    {
        type: "point",
        x: 3,
        y: 17
    },
    {
        type: "point",
        x: 3,
        y: 20
    },
    {
        type: "point",
        x: 22,
        y: 20
    },
    {
        type: "point",
        x: 22,
        y: 22
    },
    {
        type: "point",
        x: 14,
        y: 22
    },
    {
        type: "end",
        x: 14,
        y: 24
    }]
})
allMaps.set("Starry Night", {
    mapInfo: {
        difficulty: 3,
        grassColour: 0x555555,
        grassSecondaryColour: 0xA6A6A6,
        grassOpacity: 0.001,
        pathOpacity: 0.5,
        bgColourMapKey: "starryNight"
    },
    waypoints: [
        {
            type: "start",
            x: 1,
            y: 24
        },

        {
            type: "point",
            x: 1,
            y: 18
        },

        {
            type: "point",
            x: 2,
            y: 18
        },

        {
            type: "point",
            x: 2,
            y: 12
        },

        {
            type: "point",
            x: 3,
            y: 12
        },

        {
            type: "point",
            x: 3,
            y: 7
        },

        {
            type: "point",
            x: 5,
            y: 7
        },

        {
            type: "point",
            x: 5,
            y: 1
        },

        {
            type: "point",
            x: 8,
            y: 1
        },

        {
            type: "point",
            x: 8,
            y: 4
        },

        {
            type: "point",
            x: 7,
            y: 4
        },

        {
            type: "point",
            x: 7,
            y: 6
        },

        {
            type: "point",
            x: 12,
            y: 6
        },

        {
            type: "point",
            x: 12,
            y: 0
        },

        {
            type: "point",
            x: 16,
            y: 0
        },

        {
            type: "point",
            x: 16,
            y: 4
        },

        {
            type: "point",
            x: 14,
            y: 4
        },

        {
            type: "point",
            x: 14,
            y: 7
        },

        {
            type: "point",
            x: 17,
            y: 7
        },

        {
            type: "point",
            x: 17,
            y: 9
        },

        {
            type: "point",
            x: 9,
            y: 9
        },

        {
            type: "point",
            x: 9,
            y: 12
        },

        {
            type: "point",
            x: 8,
            y: 12
        },

        {
            type: "point",
            x: 8,
            y: 16
        },

        {
            type: "point",
            x: 12,
            y: 16
        },

        {
            type: "point",
            x: 12,
            y: 13
        },

        {
            type: "point",
            x: 15,
            y: 13
        },

        {
            type: "point",
            x: 15,
            y: 11
        },

        {
            type: "point",
            x: 18,
            y: 11
        },

        {
            type: "point",
            x: 18,
            y: 15
        },

        {
            type: "point",
            x: 14,
            y: 15
        },

        {
            type: "point",
            x: 14,
            y: 19
        },

        {
            type: "point",
            x: 12,
            y: 19
        },

        {
            type: "point",
            x: 12,
            y: 23
        },

        {
            type: "point",
            x: 18,
            y: 23
        },

        {
            type: "point",
            x: 18,
            y: 19
        },

        {
            type: "point",
            x: 20,
            y: 19
        },

        {
            type: "point",
            x: 20,
            y: 17
        },

        {
            type: "end",
            x: 24,
            y: 17
        }
    ]
})


allMaps.set("Medium French Vanilla", {
    mapInfo: {
        difficulty: 2,
        grassColour: 0x555555,
        grassSecondaryColour: 0xC1682C,
        grassOpacity: 0.001,
        pathOpacity: 0.4,
        bgColourMapKey: "mediumFrenchVanilla"
    },
    waypoints: [
        {
            type: "start",
            x: 18,
            y: 24
        },

        {
            type: "point",
            x: 18,
            y: 22
        },

        {
            type: "point",
            x: 7,
            y: 22
        },

        {
            type: "point",
            x: 7,
            y: 24
        },

        {
            type: "point",
            x: 1,
            y: 24
        },

        {
            type: "point",
            x: 1,
            y: 22
        },

        {
            type: "point",
            x: 5,
            y: 22
        },

        {
            type: "point",
            x: 5,
            y: 19
        },

        {
            type: "point",
            x: 8,
            y: 19
        },

        {
            type: "point",
            x: 8,
            y: 17
        },

        {
            type: "point",
            x: 5,
            y: 17
        },

        {
            type: "point",
            x: 5,
            y: 15
        },

        {
            type: "point",
            x: 17,
            y: 15
        },

        {
            type: "point",
            x: 17,
            y: 19
        },

        {
            type: "point",
            x: 17,
            y: 15
        },

        {
            type: "point",
            x: 5,
            y: 15
        },

        {
            type: "point",
            x: 5,
            y: 11
        },

        {
            type: "point",
            x: 6,
            y: 11
        },

        {
            type: "point",
            x: 6,
            y: 6
        },

        {
            type: "point",
            x: 9,
            y: 6
        },

        {
            type: "point",
            x: 9,
            y: 10
        },

        {
            type: "point",
            x: 16,
            y: 10
        },

        {
            type: "point",
            x: 16,
            y: 9
        },

        {
            type: "point",
            x: 18,
            y: 9
        },

        {
            type: "point",
            x: 18,
            y: 5
        },

        {
            type: "point",
            x: 12,
            y: 5
        },

        {
            type: "point",
            x: 18,
            y: 5
        },

        {
            type: "point",
            x: 18,
            y: 2
        },

        {
            type: "point",
            x: 22,
            y: 2
        },

        {
            type: "point",
            x: 22,
            y: 4
        },

        {
            type: "point",
            x: 22,
            y: 2
        },

        {
            type: "point",
            x: 18,
            y: 2
        },

        {
            type: "end",
            x: 18,
            y: 0
        },
    ]
})

allMaps.set("Rough Spiral", {
    mapInfo: {
        difficulty: 3,
        grassColour: 0x222200,
        grassSecondaryColour: 0x667A00
    },
    waypoints: [
        {
            type: "start",
            x: 19,
            y: 24
        },
        {
            type: "point",
            x: 19,
            y: 20
        },

        {
            type: "point",
            x: 22,
            y: 20
        },

        {
            type: "point",
            x: 22,
            y: 9
        },

        {
            type: "point",
            x: 23,
            y: 9
        },

        {
            type: "point",
            x: 23,
            y: 2
        },

        {
            type: "point",
            x: 5,
            y: 2
        },

        {
            type: "point",
            x: 5,
            y: 5
        },

        {
            type: "point",
            x: 2,
            y: 5
        },

        {
            type: "point",
            x: 2,
            y: 13
        },

        {
            type: "point",
            x: 4,
            y: 13
        },

        {
            type: "point",
            x: 4,
            y: 20
        },

        {
            type: "point",
            x: 11,
            y: 20
        },

        {
            type: "point",
            x: 11,
            y: 16
        },

        {
            type: "point",
            x: 15,
            y: 16
        },

        {
            type: "point",
            x: 15,
            y: 18
        },

        {
            type: "point",
            x: 17,
            y: 18
        },

        {
            type: "point",
            x: 17,
            y: 13
        },

        {
            type: "point",
            x: 20,
            y: 13
        },

        {
            type: "point",
            x: 20,
            y: 6
        },

        {
            type: "point",
            x: 12,
            y: 6
        },

        {
            type: "point",
            x: 12,
            y: 8
        },

        {
            type: "point",
            x: 7,
            y: 8
        },

        {
            type: "point",
            x: 7,
            y: 12
        },

        {
            type: "point",
            x: 10,
            y: 12
        },

        {
            type: "point",
            x: 10,
            y: 14
        },

        {
            type: "point",
            x: 12,
            y: 14
        },

        {
            type: "point",
            x: 12,
            y: 12
        },

        {
            type: "point",
            x: 14,
            y: 12
        },

        {
            type: "end",
            x: 14,
            y: 11
        },
    ]
})


allMaps.set("Stairwell-O-Chaos", {
    mapInfo: {
        difficulty: 5,
        bgColourMapKey: "stairwellOChaos",
        grassOpacity: 0.001,
        pathOpacity: 0.05,
        grassColour: 0x0044DD,
        grassSecondaryColour: 0x0077EE
    },
    waypoints: [
        {
            type: "start",
            x: 24,
            y: 22
        },

        {
            type: "point",
            x: 0,
            y: 22
        },

        {
            type: "point",
            x: 1,
            y: 22
        },

        {
            type: "point",
            x: 1,
            y: 21
        },

        {
            type: "point",
            x: 3,
            y: 21
        },

        {
            type: "point",
            x: 3,
            y: 20
        },

        {
            type: "point",
            x: 5,
            y: 20
        },

        {
            type: "point",
            x: 5,
            y: 19
        },

        {
            type: "point",
            x: 7,
            y: 19
        },

        {
            type: "point",
            x: 7,
            y: 18
        },

        {
            type: "point",
            x: 9,
            y: 18
        },

        {
            type: "point",
            x: 9,
            y: 17
        },

        {
            type: "point",
            x: 11,
            y: 17
        },

        {
            type: "point",
            x: 11,
            y: 16
        },

        {
            type: "point",
            x: 13,
            y: 16
        },

        {
            type: "point",
            x: 13,
            y: 15
        },

        {
            type: "point",
            x: 15,
            y: 15
        },

        {
            type: "point",
            x: 15,
            y: 14
        },

        {
            type: "point",
            x: 17,
            y: 14
        },

        {
            type: "point",
            x: 17,
            y: 13
        },

        {
            type: "point",
            x: 19,
            y: 13
        },

        {
            type: "point",
            x: 19,
            y: 12
        },

        {
            type: "point",
            x: 24,
            y: 12
        },

        {
            type: "point",
            x: 23,
            y: 12
        },

        {
            type: "point",
            x: 23,
            y: 11
        },

        {
            type: "point",
            x: 21,
            y: 11
        },

        {
            type: "point",
            x: 21,
            y: 10
        },

        {
            type: "point",
            x: 19,
            y: 10
        },

        {
            type: "point",
            x: 19,
            y: 9
        },

        {
            type: "point",
            x: 17,
            y: 9
        },

        {
            type: "point",
            x: 17,
            y: 8
        },

        {
            type: "point",
            x: 15,
            y: 8
        },

        {
            type: "point",
            x: 15,
            y: 7
        },

        {
            type: "point",
            x: 13,
            y: 7
        },

        {
            type: "point",
            x: 13,
            y: 6
        },

        {
            type: "point",
            x: 11,
            y: 6
        },

        {
            type: "point",
            x: 11,
            y: 5
        },

        {
            type: "point",
            x: 9,
            y: 5
        },

        {
            type: "point",
            x: 9,
            y: 4
        },

        {
            type: "point",
            x: 7,
            y: 4
        },

        {
            type: "point",
            x: 7,
            y: 3
        },

        {
            type: "point",
            x: 5,
            y: 3
        },

        {
            type: "point",
            x: 5,
            y: 2
        },

        {
            type: "end",
            x: 0,
            y: 2
        },
    ],
    blocked: [
        {
            x: 24,
            y: 24
        },
        {
            x: 23,
            y: 21
        },

        {
            x: 22,
            y: 21
        },

        {
            x: 21,
            y: 21
        },

        {
            x: 21,
            y: 20
        },

        {
            x: 22,
            y: 20
        },

        {
            x: 23,
            y: 20
        },

        {
            x: 23,
            y: 19
        },

        {
            x: 22,
            y: 19
        },

        {
            x: 21,
            y: 19
        },

        {
            x: 21,
            y: 18
        },

        {
            x: 22,
            y: 18
        },

        {
            x: 23,
            y: 18
        },

        {
            x: 23,
            y: 17
        },

        {
            x: 22,
            y: 17
        },

        {
            x: 21,
            y: 17
        },

        {
            x: 21,
            y: 16
        },

        {
            x: 22,
            y: 16
        },

        {
            x: 23,
            y: 16
        },

        {
            x: 22,
            y: 15
        },
        {
            x: 18,
            y: 21
        },

        {
            x: 17,
            y: 21
        },

        {
            x: 17,
            y: 20
        },

        {
            x: 18,
            y: 20
        },

        {
            x: 18,
            y: 19
        },

        {
            x: 17,
            y: 19
        },

        {
            x: 16,
            y: 19
        },

        {
            x: 17,
            y: 18
        },

        {
            x: 18,
            y: 18
        },
        {
            x: 9,
            y: 15
        },

        {
            x: 8,
            y: 15
        },

        {
            x: 7,
            y: 15
        },

        {
            x: 7,
            y: 14
        },

        {
            x: 8,
            y: 14
        },

        {
            x: 9,
            y: 14
        },

        {
            x: 9,
            y: 13
        },

        {
            x: 8,
            y: 13
        },

        {
            x: 7,
            y: 13
        },

        {
            x: 7,
            y: 12
        },

        {
            x: 8,
            y: 12
        },

        {
            x: 9,
            y: 12
        },

        {
            x: 6,
            y: 14
        },

        {
            x: 5,
            y: 14
        },

        {
            x: 4,
            y: 14
        },

        {
            x: 3,
            y: 14
        },

        {
            x: 2,
            y: 14
        },

        {
            x: 1,
            y: 14
        },

        {
            x: 0,
            y: 14
        },

        {
            x: 0,
            y: 13
        },

        {
            x: 1,
            y: 13
        },

        {
            x: 2,
            y: 13
        },

        {
            x: 3,
            y: 13
        },

        {
            x: 4,
            y: 13
        },

        {
            x: 5,
            y: 13
        },

        {
            x: 6,
            y: 13
        },

        {
            x: 6,
            y: 12
        },

        {
            x: 5,
            y: 12
        },

        {
            x: 4,
            y: 12
        },

        {
            x: 3,
            y: 12
        },

        {
            x: 2,
            y: 12
        },

        {
            x: 1,
            y: 12
        },

        {
            x: 0,
            y: 12
        },

        {
            x: 0,
            y: 11
        },

        {
            x: 1,
            y: 11
        },

        {
            x: 2,
            y: 11
        },

        {
            x: 3,
            y: 11
        },

        {
            x: 4,
            y: 11
        },

        {
            x: 5,
            y: 11
        },

        {
            x: 6,
            y: 11
        },

        {
            x: 6,
            y: 10
        },

        {
            x: 5,
            y: 10
        },

        {
            x: 4,
            y: 10
        },

        {
            x: 3,
            y: 10
        },

        {
            x: 2,
            y: 10
        },

        {
            x: 1,
            y: 10
        },

        {
            x: 0,
            y: 10
        },

        {
            x: 0,
            y: 9
        },

        {
            x: 1,
            y: 9
        },

        {
            x: 2,
            y: 9
        },

        {
            x: 3,
            y: 9
        },

        {
            x: 4,
            y: 9
        },

        {
            x: 5,
            y: 9
        },

        {
            x: 6,
            y: 9
        },

        {
            x: 6,
            y: 8
        },

        {
            x: 5,
            y: 8
        },

        {
            x: 4,
            y: 8
        },

        {
            x: 3,
            y: 8
        },

        {
            x: 2,
            y: 8
        },

        {
            x: 1,
            y: 8
        },

        {
            x: 0,
            y: 8
        },

        {
            x: 8,
            y: 10
        },

        {
            x: 9,
            y: 10
        },

        {
            x: 10,
            y: 10
        },

        {
            x: 11,
            y: 10
        },

        {
            x: 11,
            y: 9
        },

        {
            x: 11,
            y: 8
        },

        {
            x: 11,
            y: 7
        },

        {
            x: 10,
            y: 7
        },

        {
            x: 9,
            y: 7
        },

        {
            x: 8,
            y: 7
        },

        {
            x: 8,
            y: 8
        },

        {
            x: 8,
            y: 9
        },

        {
            x: 9,
            y: 9
        },

        {
            x: 10,
            y: 9
        },

        {
            x: 10,
            y: 8
        },

        {
            x: 9,
            y: 8
        },
        {
            x: 24,
            y: 7
        },

        {
            x: 23,
            y: 7
        },

        {
            x: 22,
            y: 7
        },

        {
            x: 21,
            y: 7
        },

        {
            x: 20,
            y: 7
        },

        {
            x: 19,
            y: 7
        },

        {
            x: 19,
            y: 6
        },

        {
            x: 20,
            y: 6
        },

        {
            x: 21,
            y: 6
        },

        {
            x: 22,
            y: 6
        },

        {
            x: 23,
            y: 6
        },

        {
            x: 24,
            y: 6
        },

        {
            x: 24,
            y: 5
        },

        {
            x: 23,
            y: 5
        },

        {
            x: 22,
            y: 5
        },

        {
            x: 21,
            y: 5
        },

        {
            x: 20,
            y: 5
        },

        {
            x: 19,
            y: 5
        },

        {
            x: 19,
            y: 4
        },

        {
            x: 20,
            y: 4
        },

        {
            x: 21,
            y: 4
        },

        {
            x: 22,
            y: 4
        },

        {
            x: 23,
            y: 4
        },

        {
            x: 24,
            y: 4
        },

        {
            x: 24,
            y: 3
        },

        {
            x: 23,
            y: 3
        },

        {
            x: 22,
            y: 3
        },

        {
            x: 21,
            y: 3
        },

        {
            x: 20,
            y: 3
        },

        {
            x: 19,
            y: 3
        },

        {
            x: 19,
            y: 2
        },

        {
            x: 20,
            y: 2
        },

        {
            x: 21,
            y: 2
        },

        {
            x: 22,
            y: 2
        },

        {
            x: 23,
            y: 2
        },

        {
            x: 24,
            y: 2
        },

        {
            x: 21,
            y: 1
        },

        {
            x: 21,
            y: 0
        },
        ////stair railing
        {
            x: 2,
            y: 20
        },

        {
            x: 1,
            y: 20
        },

        {
            x: 3,
            y: 19
        },

        {
            x: 4,
            y: 19
        },

        {
            x: 5,
            y: 18
        },

        {
            x: 6,
            y: 18
        },

        {
            x: 7,
            y: 17
        },

        {
            x: 8,
            y: 17
        },

        {
            x: 9,
            y: 16
        },

        {
            x: 10,
            y: 16
        },

        {
            x: 11,
            y: 15
        },

        {
            x: 12,
            y: 15
        },

        {
            x: 13,
            y: 14
        },

        {
            x: 14,
            y: 14
        },

        {
            x: 15,
            y: 13
        },

        {
            x: 16,
            y: 13
        },

        {
            x: 18,
            y: 12
        },
        //upper stair railing
        {
            x: 22,
            y: 10
        },

        {
            x: 21,
            y: 9
        },

        {
            x: 20,
            y: 9
        },

        {
            x: 19,
            y: 8
        },

        {
            x: 18,
            y: 8
        },

        {
            x: 17,
            y: 7
        },

        {
            x: 16,
            y: 7
        },

        {
            x: 15,
            y: 6
        },

        {
            x: 14,
            y: 6
        },

        {
            x: 13,
            y: 5
        },

        {
            x: 12,
            y: 5
        },

        {
            x: 11,
            y: 4
        },

        {
            x: 10,
            y: 4
        },

        {
            x: 9,
            y: 3
        },

        {
            x: 8,
            y: 3
        },

        {
            x: 7,
            y: 2
        },

        {
            x: 6,
            y: 2
        },
    ]
})

allMaps.set("Heartbeat Onslaught", {
    mapInfo: {
        difficulty: 3,
        grassColour: 0x11000C,
        grassSecondaryColour: 0x470077
    },
    waypoints: [
        {
            type: "start",
            x: 0,
            y: 12
        },

        {
            type: "point",
            x: 2,
            y: 12
        },

        {
            type: "point",
            x: 2,
            y: 14
        },

        {
            type: "point",
            x: 4,
            y: 14
        },

        {
            type: "point",
            x: 4,
            y: 7
        },

        {
            type: "point",
            x: 6,
            y: 7
        },

        {
            type: "point",
            x: 6,
            y: 21
        },

        {
            type: "point",
            x: 8,
            y: 21
        },

        {
            type: "point",
            x: 8,
            y: 15
        },

        {
            type: "point",
            x: 10,
            y: 15
        },

        {
            type: "point",
            x: 10,
            y: 12
        },

        {
            type: "point",
            x: 12,
            y: 12
        },

        {
            type: "point",
            x: 12,
            y: 1
        },

        {
            type: "point",
            x: 14,
            y: 1
        },

        {
            type: "point",
            x: 14,
            y: 12
        },

        {
            type: "point",
            x: 15,
            y: 12
        },

        {
            type: "point",
            x: 15,
            y: 15
        },

        {
            type: "point",
            x: 17,
            y: 15
        },

        {
            type: "point",
            x: 17,
            y: 12
        },

        {
            type: "point",
            x: 19,
            y: 12
        },

        {
            type: "point",
            x: 19,
            y: 7
        },

        {
            type: "point",
            x: 21,
            y: 7
        },

        {
            type: "point",
            x: 21,
            y: 15
        },

        {
            type: "point",
            x: 23,
            y: 15
        },

        {
            type: "point",
            x: 23,
            y: 12
        },

        {
            type: "end",
            x: 24,
            y: 12
        }
    ]
})

allMaps.set("Null Camp", {
    mapInfo: {
        difficulty: 5,
        grassOpacity: 0.1,
        pathOpacity: 0.01,
        grassColour: 0x09070A,
        grassSecondaryColour: 0x2C282C,
        bgColourMapKey: "nullCamp"
    },
    waypoints: [
        {
            type: "point",
            x: 24,
            y: 3
        },

        {
            type: "point",
            x: 12,
            y: 3
        },

        {
            type: "point",
            x: 12,
            y: 4
        },

        {
            type: "point",
            x: 6,
            y: 4
        },

        {
            type: "point",
            x: 6,
            y: 6
        },

        {
            type: "point",
            x: 1,
            y: 6
        },

        {
            type: "point",
            x: 1,
            y: 9
        },

        {
            type: "point",
            x: 4,
            y: 9
        },

        {
            type: "point",
            x: 4,
            y: 15
        },

        {
            type: "point",
            x: 15,
            y: 15
        },

        {
            type: "point",
            x: 15,
            y: 13
        },

        {
            type: "point",
            x: 23,
            y: 13
        },

        {
            type: "point",
            x: 23,
            y: 15
        },

        {
            type: "point",
            x: 19,
            y: 15
        },

        {
            type: "point",
            x: 19,
            y: 17
        },

        {
            type: "point",
            x: 17,
            y: 17
        },

        {
            type: "point",
            x: 13,
            y: 17
        },

        {
            type: "point",
            x: 13,
            y: 19
        },

        {
            type: "point",
            x: 9,
            y: 19
        },

        {
            type: "point",
            x: 9,
            y: 21
        },

        {
            type: "point",
            x: 5,
            y: 21
        },

        {
            type: "point",
            x: 5,
            y: 24
        },
    ],
    blocked: [
        {

            x: 22,
            y: 24
        },

        {

            x: 21,
            y: 24
        },

        {

            x: 20,
            y: 24
        },

        {

            x: 20,
            y: 23
        },

        {

            x: 21,
            y: 23
        },

        {

            x: 22,
            y: 23
        },

        {

            x: 21,
            y: 22
        },

        {

            x: 20,
            y: 22
        },

        {

            x: 20,
            y: 21
        },

        {

            x: 21,
            y: 21
        },

        {

            x: 16,
            y: 24
        },

        {

            x: 16,
            y: 23
        },

        {

            x: 16,
            y: 22
        },

        {

            x: 15,
            y: 22
        },

        {

            x: 15,
            y: 23
        },

        {

            x: 15,
            y: 24
        },

        {

            x: 19,
            y: 10
        },

        {

            x: 19,
            y: 9
        },

        {

            x: 20,
            y: 9
        },

        {

            x: 20,
            y: 8
        },

        {

            x: 19,
            y: 8
        },

        {

            x: 19,
            y: 7
        },

        {

            x: 17,
            y: 8
        },

        {

            x: 16,
            y: 8
        },

        {

            x: 16,
            y: 7
        },

        {

            x: 17,
            y: 7
        },

        {

            x: 17,
            y: 6
        },

        {

            x: 16,
            y: 6
        },

        {

            x: 15,
            y: 7
        },

        {

            x: 15,
            y: 8
        },

        {

            x: 15,
            y: 9
        },

        {

            x: 16,
            y: 9
        },

        {

            x: 4,
            y: 5
        },

        {

            x: 3,
            y: 5
        },

        {

            x: 3,
            y: 4
        },

        {

            x: 4,
            y: 4
        },

        {

            x: 4,
            y: 3
        },

        {

            x: 3,
            y: 3
        },

        {

            x: 3,
            y: 2
        },

        {

            x: 4,
            y: 2
        },

        {

            x: 9,
            y: 12
        },

        {

            x: 8,
            y: 12
        },

        {

            x: 7,
            y: 12
        },

        {

            x: 6,
            y: 11
        },

        {

            x: 7,
            y: 11
        },

        {

            x: 8,
            y: 11
        },

        {

            x: 9,
            y: 11
        },

        {

            x: 10,
            y: 11
        },

        {

            x: 9,
            y: 10
        },

        {

            x: 8,
            y: 10
        },

        {

            x: 7,
            y: 10
        },

        {

            x: 6,
            y: 10
        },

        {

            x: 7,
            y: 9
        },

        {

            x: 7,
            y: 8
        },

        {

            x: 8,
            y: 8
        },

        {

            x: 8,
            y: 9
        },

        {

            x: 9,
            y: 9
        },

        {

            x: 9,
            y: 8
        },

        {

            x: 11,
            y: 10
        },

        {

            x: 11,
            y: 9
        },

        {

            x: 12,
            y: 9
        },

        {

            x: 12,
            y: 10
        },

        {

            x: 13,
            y: 9
        },

        {

            x: 12,
            y: 8
        },

        {

            x: 11,
            y: 8
        },

        {

            x: 13,
            y: 8
        },
    ]
})

// Skeleton: set grassColour, grassSecondaryColour, pathOpacity, grassOpacity, difficulty; replace waypoints (axis-aligned segments only).
allMaps.set("La Lune", {
    mapInfo: {
        grassColour: 0x444444,
        grassSecondaryColour: 0x666666,
        grassOpacity: 1,
        pathOpacity: 1,
        difficulty: 4,
    },
    waypoints: [
        { type: "start", x: 4, y: 21 },
        { type: "point", x: 5, y: 21 },
        { type: "point", x: 5, y: 22 },
        { type: "point", x: 8, y: 22 },
        { type: "point", x: 8, y: 23 },
        { type: "point", x: 15, y: 23 },
        { type: "point", x: 15, y: 22 },
        { type: "point", x: 17, y: 22 },
        { type: "point", x: 17, y: 21 },
        { type: "point", x: 19, y: 21 },
        { type: "point", x: 19, y: 18 },
        { type: "point", x: 20, y: 18 },
        { type: "point", x: 20, y: 15 },
        { type: "point", x: 21, y: 15 },
        { type: "point", x: 21, y: 14 },
        { type: "point", x: 21, y: 9 },
        { type: "point", x: 20, y: 9 },
        { type: "point", x: 20, y: 6 },
        { type: "point", x: 19, y: 6 },
        { type: "point", x: 19, y: 3 },
        { type: "point", x: 17, y: 3 },
        { type: "point", x: 17, y: 2 },
        { type: "point", x: 15, y: 2 },
        { type: "point", x: 15, y: 1 },
        { type: "point", x: 8, y: 1 },
        { type: "point", x: 8, y: 2 },
        { type: "point", x: 5, y: 2 },
        { type: "point", x: 5, y: 3 },
        { type: "point", x: 4, y: 3 },
        { type: "point", x: 4, y: 5 },
        { type: "point", x: 7, y: 5 },
        { type: "point", x: 7, y: 4 },
        { type: "point", x: 11, y: 4 },
        { type: "point", x: 11, y: 5 },
        { type: "point", x: 12, y: 5 },
        { type: "point", x: 12, y: 7 },
        { type: "point", x: 14, y: 7 },
        { type: "point", x: 14, y: 9 },
        { type: "point", x: 15, y: 9 },
        { type: "point", x: 15, y: 15 },
        { type: "point", x: 14, y: 15 },
        { type: "point", x: 14, y: 17 },
        { type: "point", x: 12, y: 17 },
        { type: "point", x: 12, y: 19 },
        { type: "point", x: 11, y: 19 },
        { type: "point", x: 11, y: 20 },
        { type: "point", x: 7, y: 20 },
        { type: "point", x: 7, y: 19 },
        { type: "end", x: 4, y: 19 }
    ]
})

// Skeleton: replace mapInfo values and waypoints when ready.
allMaps.set("SCS", {
    mapInfo: {
        bgColourMapKey: "SCS",
        difficulty: 5,
        grassColour: 0x000000,
        grassSecondaryColour: 0x666666,
        grassOpacity: 0.001,
        pathOpacity: 1
    },
    waypoints: [
        { type: "start", x: 12, y: 15 },
        { type: "point", x: 10, y: 15 },
        { type: "point", x: 10, y: 18 },
        { type: "point", x: 23, y: 18 },
        { type: "point", x: 23, y: 23 },
        { type: "point", x: 2, y: 23 },
        { type: "point", x: 2, y: 18 },
        { type: "point", x: 14, y: 18 },
        { type: "point", x: 14, y: 15 },
        { type: "point", x: 21, y: 15 },
        { type: "point", x: 21, y: 3 },
        { type: "point", x: 3, y: 3 },
        { type: "point", x: 3, y: 15 },
        { type: "end", x: 13, y: 15 }
    ],
    blocked: [
        { x: 3, y: 19 }, { x: 4, y: 19 }, { x: 5, y: 19 }, { x: 6, y: 19 }, { x: 7, y: 19 }, { x: 8, y: 19 }, { x: 9, y: 19 }, { x: 10, y: 19 }, { x: 11, y: 19 }, { x: 12, y: 19 }, { x: 13, y: 19 }, { x: 14, y: 19 }, { x: 15, y: 19 }, { x: 16, y: 19 }, { x: 17, y: 19 }, { x: 18, y: 19 }, { x: 19, y: 19 }, { x: 20, y: 19 }, { x: 21, y: 19 }, { x: 22, y: 19 },
        { x: 3, y: 20 }, { x: 4, y: 20 }, { x: 5, y: 20 }, { x: 6, y: 20 }, { x: 7, y: 20 }, { x: 8, y: 20 }, { x: 9, y: 20 }, { x: 10, y: 20 }, { x: 11, y: 20 }, { x: 12, y: 20 }, { x: 13, y: 20 }, { x: 14, y: 20 }, { x: 15, y: 20 }, { x: 16, y: 20 }, { x: 17, y: 20 }, { x: 18, y: 20 }, { x: 19, y: 20 }, { x: 20, y: 20 }, { x: 21, y: 20 }, { x: 22, y: 20 },
        { x: 3, y: 21 }, { x: 4, y: 21 }, { x: 5, y: 21 }, { x: 6, y: 21 }, { x: 7, y: 21 }, { x: 8, y: 21 }, { x: 9, y: 21 }, { x: 10, y: 21 }, { x: 11, y: 21 }, { x: 12, y: 21 }, { x: 13, y: 21 }, { x: 14, y: 21 }, { x: 15, y: 21 }, { x: 16, y: 21 }, { x: 17, y: 21 }, { x: 18, y: 21 }, { x: 19, y: 21 }, { x: 20, y: 21 }, { x: 21, y: 21 }, { x: 22, y: 21 },
        { x: 3, y: 22 }, { x: 4, y: 22 }, { x: 5, y: 22 }, { x: 6, y: 22 }, { x: 7, y: 22 }, { x: 8, y: 22 }, { x: 9, y: 22 }, { x: 10, y: 22 }, { x: 11, y: 22 }, { x: 12, y: 22 }, { x: 13, y: 22 }, { x: 14, y: 22 }, { x: 15, y: 22 }, { x: 16, y: 22 }, { x: 17, y: 22 }, { x: 18, y: 22 }, { x: 19, y: 22 }, { x: 20, y: 22 }, { x: 21, y: 22 }, { x: 22, y: 22 },
        { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 }, { x: 8, y: 4 }, { x: 9, y: 4 }, { x: 10, y: 4 }, { x: 11, y: 4 }, { x: 12, y: 4 }, { x: 13, y: 4 }, { x: 14, y: 4 }, { x: 15, y: 4 }, { x: 16, y: 4 }, { x: 17, y: 4 }, { x: 18, y: 4 }, { x: 19, y: 4 }, { x: 20, y: 4 },
        { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 }, { x: 9, y: 5 }, { x: 10, y: 5 }, { x: 11, y: 5 }, { x: 12, y: 5 }, { x: 13, y: 5 }, { x: 14, y: 5 }, { x: 15, y: 5 }, { x: 16, y: 5 }, { x: 17, y: 5 }, { x: 18, y: 5 }, { x: 19, y: 5 }, { x: 20, y: 5 },
        { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 }, { x: 7, y: 6 }, { x: 8, y: 6 }, { x: 9, y: 6 }, { x: 10, y: 6 }, { x: 11, y: 6 }, { x: 12, y: 6 }, { x: 13, y: 6 }, { x: 14, y: 6 }, { x: 15, y: 6 }, { x: 16, y: 6 }, { x: 17, y: 6 }, { x: 18, y: 6 }, { x: 19, y: 6 }, { x: 20, y: 6 },
        { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 }, { x: 9, y: 7 }, { x: 10, y: 7 }, { x: 11, y: 7 }, { x: 12, y: 7 }, { x: 13, y: 7 }, { x: 14, y: 7 }, { x: 15, y: 7 }, { x: 16, y: 7 }, { x: 17, y: 7 }, { x: 18, y: 7 }, { x: 19, y: 7 }, { x: 20, y: 7 },
        { x: 4, y: 8 }, { x: 5, y: 8 }, { x: 6, y: 8 }, { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 9, y: 8 }, { x: 10, y: 8 }, { x: 11, y: 8 }, { x: 12, y: 8 }, { x: 13, y: 8 }, { x: 14, y: 8 }, { x: 15, y: 8 }, { x: 16, y: 8 }, { x: 17, y: 8 }, { x: 18, y: 8 }, { x: 19, y: 8 }, { x: 20, y: 8 },
        { x: 4, y: 9 }, { x: 5, y: 9 }, { x: 6, y: 9 }, { x: 7, y: 9 }, { x: 8, y: 9 }, { x: 9, y: 9 }, { x: 10, y: 9 }, { x: 11, y: 9 }, { x: 12, y: 9 }, { x: 13, y: 9 }, { x: 14, y: 9 }, { x: 15, y: 9 }, { x: 16, y: 9 }, { x: 17, y: 9 }, { x: 18, y: 9 }, { x: 19, y: 9 }, { x: 20, y: 9 },
        { x: 4, y: 10 }, { x: 5, y: 10 }, { x: 6, y: 10 }, { x: 7, y: 10 }, { x: 8, y: 10 }, { x: 9, y: 10 }, { x: 10, y: 10 }, { x: 11, y: 10 }, { x: 12, y: 10 }, { x: 13, y: 10 }, { x: 14, y: 10 }, { x: 15, y: 10 }, { x: 16, y: 10 }, { x: 17, y: 10 }, { x: 18, y: 10 }, { x: 19, y: 10 }, { x: 20, y: 10 },
        { x: 4, y: 11 }, { x: 5, y: 11 }, { x: 6, y: 11 }, { x: 7, y: 11 }, { x: 8, y: 11 }, { x: 9, y: 11 }, { x: 10, y: 11 }, { x: 11, y: 11 }, { x: 12, y: 11 }, { x: 13, y: 11 }, { x: 14, y: 11 }, { x: 15, y: 11 }, { x: 16, y: 11 }, { x: 17, y: 11 }, { x: 18, y: 11 }, { x: 19, y: 11 }, { x: 20, y: 11 },
        { x: 4, y: 12 }, { x: 5, y: 12 }, { x: 6, y: 12 }, { x: 7, y: 12 }, { x: 8, y: 12 }, { x: 9, y: 12 }, { x: 10, y: 12 }, { x: 11, y: 12 }, { x: 12, y: 12 }, { x: 13, y: 12 }, { x: 14, y: 12 }, { x: 15, y: 12 }, { x: 16, y: 12 }, { x: 17, y: 12 }, { x: 18, y: 12 }, { x: 19, y: 12 }, { x: 20, y: 12 },
        { x: 4, y: 13 }, { x: 5, y: 13 }, { x: 6, y: 13 }, { x: 7, y: 13 }, { x: 8, y: 13 }, { x: 9, y: 13 }, { x: 10, y: 13 }, { x: 11, y: 13 }, { x: 12, y: 13 }, { x: 13, y: 13 }, { x: 14, y: 13 }, { x: 15, y: 13 }, { x: 16, y: 13 }, { x: 17, y: 13 }, { x: 18, y: 13 }, { x: 19, y: 13 }, { x: 20, y: 13 },
        { x: 4, y: 14 }, { x: 5, y: 14 }, { x: 6, y: 14 }, { x: 7, y: 14 }, { x: 8, y: 14 }, { x: 9, y: 14 }, { x: 10, y: 14 }, { x: 11, y: 14 }, { x: 12, y: 14 }, { x: 13, y: 14 }, { x: 14, y: 14 }, { x: 15, y: 14 }, { x: 16, y: 14 }, { x: 17, y: 14 }, { x: 18, y: 14 }, { x: 19, y: 14 }, { x: 20, y: 14 },
        { x: 11, y: 16 }, { x: 12, y: 16 }, { x: 13, y: 16 },
        { x: 11, y: 17 }, { x: 12, y: 17 }, { x: 13, y: 17 }
    ]
})

// TEST MAPS
allMaps.set("blons", {
    mapInfo: {
        difficulty: 5
    },
    waypoints: [
        {
            type: "start",
            x: 10,
            y: 10
        },
        {
            type: "end",
            x: 16,
            y: 10
        }
    ]
})



/** Keys must exist in `allMaps`. Order = map selection screen order (left-to-right, top-to-bottom per page). */
const mapSelectionOrder: string[] = [
    "Walk in the Park",
    "Rough Spiral",
    "Heartbeat Onslaught",
    "Death Walk",
    "Starry Night",
    "Medium French Vanilla",
    "Stairwell-O-Chaos",
    "Null Camp",
    "Xmas 2024",
    "La Lune",
    "SCS"
    // Add new maps here, then `allMaps.set("Title", { ... })` above.
]

export { allMaps, mapSelectionOrder }


