define(function(require) {
    'use strict';

    const { actionTypes } = require('/src/constants.js');
    const { describe, it, expect } = require('/src/utils/testUtils.js');

    const streams = require('/src/reducers/streams.js');
    const twitchStreamFixture = require('/test/fixtures/twitchSearch.js');

    describe('Streams Reducer', function() {

        it('sets up an array as the initial state', function() {
            expect(
                streams(null, { type: null, }).length
            ).toEqual(0);
        });

        it('empties the stream data on search start', function() {
            expect(
                streams(
                    null,
                    {
                        type: actionTypes.search,
                        payload: {},
                    }
                ).length
            ).toEqual(0);
        });

        it('replaces stream data on search complete', function() {
            expect(
                streams(
                    null,
                    {
                        type: actionTypes.searchComplete,
                        payload: twitchStreamFixture,
                    }
                ).length
            ).toEqual(2);
        });

    });

});
