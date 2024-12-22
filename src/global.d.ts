declare global {
    interface Global {
        __PIXI_APP__: PIXI.Application;
    }
}

export { __global };