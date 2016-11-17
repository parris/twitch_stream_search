define(function(require) {
    'use strict';

    const { actionTypes } =  require('/src/constants.js');

    const defaultStreamList = [];

    const transformers = {
        [actionTypes.search]: function(state, action) {
            return [];
        },
        [actionTypes.searchComplete]: function(state, action) {
            return state = action.payload.streams.map((stream) => {
                return {
                    name: stream.channel['display_name'],
                    viewers: stream.viewers,
                    game: stream.channel.game,
                    image: stream.preview.template.replace('{width}', 100).replace('{height}', 90),
                    description: stream.channel.status,
                    url: stream.channel.url,
                };
            });
        },
    };

    return function streamsReducer(state, action) {
        let newState = state;

        if (!newState) {
            newState = defaultStreamList;
        }

        if (transformers[action.type]) {
            return transformers[action.type](newState, action);
        }

        return newState;
    };

});
