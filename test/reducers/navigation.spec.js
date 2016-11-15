define(function(require) {
    'use strict';

    const { actionTypes } = require('/src/constants.js');
    const { describe, it, expect } = require('/src/utils/testUtils.js');

    const navigation = require('/src/reducers/navigation.js');

    describe('Navigation Reducer', function() {

        it('sets up an initial state', function() {
            expect(
                navigation(null, { type: null, }).total
            ).toEqual(0);
        });

        it('sets up a loading state on search start', function() {
            expect(
                navigation(
                    null,
                    {
                        type: actionTypes.search,
                        payload: {},
                    }
                ).loading
            ).toEqual(true);
        });

        it('hangs onto the query on search start', function() {
            expect(
                navigation(
                    null,
                    {
                        type: actionTypes.search,
                        payload: {
                            query: 'test',
                        },
                    }
                ).query
            ).toEqual('test');
        });

        it('stops loading on search complete', function() {
            let state = {
                query: 'test',
            };
            let action = {
                type: actionTypes.searchComplete,
                payload: {
                    '_links': {
                        next: '1',
                        prev: '2',
                        self: '3',
                    },
                    '_total': 4,
                },
            };
            expect(
                navigation(state, action).loading
            ).toEqual(false);
        });

        it('hangs on to navigation data on search complete', function() {
            let state = {
                query: 'test',
            };
            let action = {
                type: actionTypes.searchComplete,
                payload: {
                    '_links': {
                        next: '1',
                        prev: '2',
                        self: '3',
                    },
                    '_total': 4,
                },
            };
            let newState = navigation(state, action);

            expect(newState.next).toEqual('1');
            expect(newState.prev).toEqual('2');
            expect(newState.self).toEqual('3');
            expect(newState.total).toEqual(4);
        });

    });

});
