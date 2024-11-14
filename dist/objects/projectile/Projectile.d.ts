import { Entity } from "../Entity.ts";
export declare class Projectile extends Entity {
    /**
     *
     */
    constructor(x: any, y: any, width: any, height: any, targetEnemy: any, damage: any, colour: any);
    setEnemy(enemy: any): void;
    fire(deltaTime: any): void;
    render(parentContainer: any): void;
    cleanUpResources(): void;
}
