define(function(require) {
    'use strict';

    const { renderer } = require('/src/utils/renderer.js');
    const createStore = require('/src/utils/store.js');

    const TwitchStream = require('/src/containers/TwitchStream.js');

    return function() {
        let store = createStore({
            reducers: {
                navigation: require('/src/reducers/navigation.js'),
                streams: require('/src/reducers/streams.js'),
            },
        })

        renderer(
            document.querySelector('.js-root'),
            store,
            TwitchStream
        );
    };
});
