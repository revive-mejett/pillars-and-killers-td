let instance = null
import * as PIXI from 'pixi.js';
export class AssetLoader {



    constructor() {
        
        
        //singleton
        if (!instance) {
            instance = this
            this.resources = {}
        }


        return instance
    }
    
}