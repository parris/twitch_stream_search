define(function(require) {
    'use strict';

    return function renderer(el, store, component) {
        store.addListener(function() {
            el.innerHTML = component(store);
        });
        el.innerHTML = component(store);
    };
});
