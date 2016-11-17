define(function(require) {
    'use strict';

    const { actionTypes, settings } = require('/src/constants.js');
    const request = require('/src/utils/request.js');

    const twitchSearchURL = 'https://api.twitch.tv/kraken/search/streams';

    return {
        initialize: function() {
            return {
                type: actionTypes.initialize,
            };
        },
        searchPrev: function(getState, dispatch) {
            request.jsonp(
                `${getState().navigation.prev}&client_id=${settings.twitchClientID}`
            ).then(function(data) {
                dispatch({
                    type: actionTypes.searchComplete,
                    payload: data,
                    meta: {
                        pageSize: settings.twitchSearchLimit,
                        dec: true,
                    }
                });
            });
        },
        searchNext: function(getState, dispatch) {
            request.jsonp(
                `${getState().navigation.next}&client_id=${settings.twitchClientID}`
            ).then(function(data) {
                dispatch({
                    type: actionTypes.searchComplete,
                    payload: data,
                    meta: {
                        pageSize: settings.twitchSearchLimit,
                        inc: true,
                    }
                });
            });
        },
        searchForStreams: function(dispatch, query) {
            request.jsonp(
                `${twitchSearchURL}?q=${query}&client_id=${settings.twitchClientID}&limit=${settings.twitchSearchLimit}`
            ).then(function(data) {
                dispatch({
                    type: actionTypes.searchComplete,
                    payload: data,
                    meta: {
                        pageSize: settings.twitchSearchLimit,
                        newSearch: true,
                    }
                });
            });

            return {
                type: actionTypes.search,
                payload: {
                    query: query,
                },
            };
        },
    };

});
