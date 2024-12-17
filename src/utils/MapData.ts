import Waypoint from "src/ts/types/WaypointType"

const allMaps : Map<string, Waypoint[]> = new Map()

allMaps.set("Walk in the Park", [
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
])

allMaps.set("Death Walk", [
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
])

// TEST MAPS
allMaps.set("blons", [
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
])



export { allMaps }