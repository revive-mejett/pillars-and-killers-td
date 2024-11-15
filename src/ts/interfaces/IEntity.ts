import Position from "../types/Position"

export interface IEntity {
    x: number
    y: number
    width: number
    height: number

    getCenterPosition() : Position
    // eslint-disable-next-line no-unused-vars
    getTopLeftCoordinates(centerPos : Position) : Position
}

