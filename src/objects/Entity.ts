import Position from "../ts/types/Position"

//base class for representing objects in the game
interface IEntity {
    x: number
    y: number
    width: number
    height: number

    getCenterPosition() : Position
    // eslint-disable-next-line no-unused-vars
    getTopLeftCoordinates(centerPos : Position) : Position
}

export class Entity implements IEntity {
    x: number
    y: number
    width: number
    height: number

    constructor(x : number, y : number, width : number, height : number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    //retrieves the position of the entity's center, rather then from its top left
    getCenterPosition() : Position {
        return {
            x : this.x + this.width / 2,
            y : this.y + this.height / 2
        }
    }

    //retrieves the coordinates of the top left corner of the entity
    getTopLeftCoordinates(centerPos : Position) : Position {
        return {
            x : centerPos.x - this.width / 2,
            y : centerPos.y - this.height / 2
        }
    }

}