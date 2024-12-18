import Waypoint from "src/ts/types/WaypointType"


export type MapData = {
    mapInfo: {
        grassColour?: number
        grassSecondaryColour?: number
        difficulty?: 1 | 2 | 3 | 4 | 5
    },
    waypoints: Waypoint[]
}

const allMaps : Map<string, MapData> = new Map()



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



export { allMaps }