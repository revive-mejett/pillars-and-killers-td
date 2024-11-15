/* eslint-disable @typescript-eslint/no-explicit-any */
let instance = undefined;
export class EventDispatcher {
    constructor() {
        // eslint-disable-next-line no-unused-vars
        this.listeners = {};
        //singleton
        if (!instance) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            instance = this;
            this.listeners = {};
        }
        return instance;
    }
    //register an event handler
    // eslint-disable-next-line no-unused-vars
    on(event, callback) {
        //register handler
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        //add the event handler function to list of handlers
        this.listeners[event].push(callback);
    }
    //remove an event handler function from the event
    // eslint-disable-next-line no-unused-vars
    off(event, callbackToRemove) {
        //if no such event is register
        if (!this.listeners[event]) {
            return;
        }
        //add the event handler function to list of handlers
        this.listeners[event].filter(callback => callback !== callbackToRemove);
    }
    fireEvent(event, data) {
        if (!this.listeners[event]) {
            throw new Error("no such event is registered -- " + event);
        }
        //call all event handlers for that event
        this.listeners[event].forEach(callback => callback(data));
    }
    clearListenersOfEvent(event) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event] = [];
    }
}
//# sourceMappingURL=EventDispatcher.js.map