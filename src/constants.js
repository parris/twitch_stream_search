define(function(require) {
    'use strict';

    const constants = Object.freeze({
        actionTypes: Object.freeze({
            initialize: 'initialize',
            search: 'search',
            searchComplete: 'searchComplete',
        }),

        settings: {
            twitchClientID: '62zdxm04emtu9v2zmzhewg1zomghywk',
        },
    });

    return constants;
});
