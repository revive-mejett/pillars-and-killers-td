import Position from "../ts/types/Position.ts";
interface IEntity {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare class Entity implements IEntity {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    getCenterPosition(): {
        x: number;
        y: number;
    };
    getTopLeftCoordinates(centerPos: Position): {
        x: number;
        y: number;
    };
}
export {};
