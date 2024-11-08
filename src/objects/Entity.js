
//base class for representing objects in the game
export class Entity {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    //retrieves the position of the entity's center, rather then from its top left
    getCenterPosition() {
        return {
            x : this.x + this.width / 2,
            y : this.y + this.height / 2
        }
    }

    //retrieves the coordinates of the top left corner of the entity
    getTopLeftCoordinates(centerPos) {
        return {
            x : centerPos.x - this.width / 2,
            y : centerPos.y - this.height / 2
        }
    }

}