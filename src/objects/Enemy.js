export class Enemy {

    /**
     *
     */
    constructor(health, speed, textureFilePath, xPosition, yPosition) {
        super();
        this.health = health
        this.speed = speed
        this.textureFilePath = textureFilePath
        this.position = { x: xPosition, x: yPosition}
    }

    updatePos() {

    }


}