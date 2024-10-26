export class Vector {
    /**
     *
     */
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    normalize() {
        return new Vector(this.x/this.magnitude(), this.y/this.magnitude())
    }
}