define(function(require) {
    'use strict';

    return class Component {

        constructor(props, children) {
            this.props = props;
            this.children = children;

            // ensures the event handlers are properly bound
            if (typeof this.events === 'function') {
                this._events = this.events();
                for (let key in this._events) {
                    this._events[key].bind(this);
                }
            }
        }

    }

});
