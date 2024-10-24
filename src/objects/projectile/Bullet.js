import { Projectile } from "./Projectile.js";


export class Bullet extends Projectile {

    /**
     *
     */
    constructor(x, y, width, height, colour) {
        super(x, y, width, height);
        this.colour = colour
    }
}