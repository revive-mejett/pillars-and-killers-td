/* eslint-disable @typescript-eslint/no-explicit-any */

let instance : EventDispatcher | undefined = undefined

export class EventDispatcher {
    // eslint-disable-next-line no-unused-vars
    private listeners: { [event: string]: Array<(...args: any[]) => any> } = {};


    constructor() {
        //singleton
        if (!instance) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            instance = this
            this.listeners = {}
        }
        return instance
    }

    //register an event handler
    // eslint-disable-next-line no-unused-vars
    on(event : string, callback : ((...args : any[]) => any) | ((arg : any) => any)) {
        //register handler
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        //add the event handler function to list of handlers
        this.listeners[event].push(callback)
    }

    //remove an event handler function from the event
    // eslint-disable-next-line no-unused-vars
    off(event : string, callbackToRemove : ((...args : any[]) => any) | ((arg : any) => any)) {
        //if no such event is register
        if (!this.listeners[event]) {
            return
        }
        //add the event handler function to list of handlers
        this.listeners[event].filter(callback => callback !== callbackToRemove)
    }

    fireEvent(event : string, data? : any) {
        if (!this.listeners[event]) {
            throw new Error("no such event is registered -- " + event)
        }
        //call all event handlers for that event
        this.listeners[event].forEach(callback => callback(data))
    }

    clearListenersOfEvent(event : string) {
        if (!this.listeners[event]) {
            return
        }
        this.listeners[event] = []
    }

    getListeners() {
        return this.listeners
    }
}