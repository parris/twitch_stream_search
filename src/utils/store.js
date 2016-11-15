define(function(require) {
    'use strict';

    const { actionTypes } = require('/src/constants.js');

    return function createStore(options) {
        let state = options && options.initialState || {};
        let listeners = [];

        let store = {
            addListener: function(handler) {
                listeners.push(handler);
            },
            dispatch: function(action) {
                if (!action) { return; }

                for (let key in store.reducers) {
                    let deepCopy = JSON.parse(JSON.stringify(state[key] || null));
                    let reducer = store.reducers[key];
                    state[key] = reducer(deepCopy, action);
                }
                listeners.forEach(function(handler) {
                    handler(store);
                });
            },
            getState: function() {
                return state;
            },
            reducers: options && options.reducers || {},
        };

        store.dispatch({ type: actionTypes.initialize, });

        return store;
    };
});
