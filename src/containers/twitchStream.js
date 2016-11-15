define(function(require) {
    'use strict';

    const i18n = require('/src/utils/i18n.js');

    const actionCreators = require('/src/actionCreators.js');
    const streams = require('/src/components/streams.js');

    return function twitchSteam(store) {
        let state = store.getState();
        let props = {
            actions: {
                search: function(query) {
                    store.dispatch(
                        actionCreators.searchForStreams(store.dispatch, query)
                    );
                },
                searchPrev: function() {
                    store.dispatch(
                        actionCreators.searchPrev(store.getState, store.dispatch)
                    );
                },
                searchNext: function() {
                    store.dispatch(
                        actionCreators.searchNext(store.getState, store.dispatch)
                    );
                },
            },
            navigation: state.navigation,
            streams: state.streams,
        };

        document.querySelector('body').addEventListener('submit', function(e) {
            if (e.target.className.indexOf('js-query-form') !== -1) {
                e.preventDefault();
                let queryInputEl = document.querySelector('.js-query-input');
                props.actions.search(queryInputEl.value);
            }
        });

        document.querySelector('body').addEventListener('click', function(e) {
            if (e.target.className.indexOf('js-prev') !== -1) {
                e.preventDefault();
                props.actions.searchPrev();
            }

            if (e.target.className.indexOf('js-next') !== -1) {
                e.preventDefault();
                props.actions.searchNext();
            }
        });

        return streams(props);
    };

});
