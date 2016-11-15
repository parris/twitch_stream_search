define(function(require) {
    'use strict';

    return function build(Component, props, children) {
        if (typeof Component === 'string') {
            return {
                children: {
                    type: Component,
                    props: props,
                    children: children,
                },
            };
        } else {
            let component = new Component(props, children);
            return {
                children: component.render(),
                events: component._events,
            };
        }

    };

});
