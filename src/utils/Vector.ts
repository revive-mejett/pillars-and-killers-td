export class Vector {
    x: number
    y: number
    /**
     *
     */
    constructor(x : number, y : number) {
        this.x = x
        this.y = y
    }

    magnitude() : number {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    normalize() : Vector {
        return new Vector(this.x/this.magnitude(), this.y/this.magnitude())
    }
}