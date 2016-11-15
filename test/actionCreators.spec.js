define(function(require) {
    'use strict';

    const { actionTypes } = require('/src/constants.js');
    const { describe, it, expect } = require('/src/utils/testUtils.js');
    const createStore = require('/src/utils/store.js');
    const request = require('/src/utils/request.js');
    const twitchStreamFixture = require('/test/fixtures/twitchSearch.js');

    const actionCreators = require('/src/actionCreators.js');

    describe('ActionCreator', function() {

        it('can create search actions', function() {
            let oldRequest = request.jsonp;
            let callCount = 0;
            let args = [];
            request.jsonp = function() {
                callCount++;
                args.push(arguments);

                return new Promise((resolve, reject) => {
                    resolve(JSON.stringify(twitchStreamFixture));
                });
            };

            let store = createStore();
            let testQuery = 'starcraft';

            expect(
                JSON.stringify(
                    actionCreators.searchForStreams(
                        store.dispatch,
                        testQuery
                    )
                )
            ).toEqual(JSON.stringify({
                type: actionTypes.search,
                payload: {
                    query: testQuery,
                },
            }));

            expect(callCount).toEqual(1);
            expect(args[0][0].indexOf(testQuery) !=- -1).toEqual(true);

            request.jsonp = oldRequest;
        });

    });

});
