
let instance = null

export class EventDispatcher {


    constructor() {
        //singleton
        if (!instance) {
            instance = this
            this.listeners = {}
        }
        return instance
    }

    //register an event handler
    on(event, callback) {
        //register handler
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        //add the event handler function to list of handlers
        this.listeners[event].push(callback)
    }

    //remove an event handler function from the event
    off(event, callbackToRemove) {
        //if no such event is register
        if (!this.listeners[event]) {
            return
        }
        //add the event handler function to list of handlers
        this.listeners[event].filter(callback => callback != callbackToRemove)
    }

    fireEvent(event, data) {
        if (!this.listeners[event]) {
            console.warn("no such event is registered -- ", event)
            return
        }
        //call all event handlers for that event
        this.listeners[event].forEach(callback => callback(data))
    }

}