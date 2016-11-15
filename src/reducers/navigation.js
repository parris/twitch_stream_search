define(function(require) {
    'use strict';

    const { actionTypes } =  require('/src/constants.js');

    const defaultNavigationState = {
        loading: false,
        query: '',
        next: '',
        prev: '',
        self: '',
        total: 0,
    };

    const transformers = {
        [actionTypes.search]: function(state, action) {
            return {
                loading: true,
                query: action.payload.query,
                next: '',
                prev: '',
                self: '',
                total: 0,
            };
        },
        [actionTypes.searchComplete]: function(state, action) {
            return Object.assign(
                state,
                {
                    loading: false,
                    next: action.payload['_links'].next,
                    prev: action.payload['_links'].prev,
                    self: action.payload['_links'].self,
                    total: action.payload['_total'],
                }
            );
        },
    };

    return function navigationReducer(state, action) {
        let newState = state;

        if (!newState) {
            newState = defaultNavigationState;
        }

        if (transformers[action.type]) {
            return transformers[action.type](newState, action);
        }

        return newState;
    };

});
