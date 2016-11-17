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
                        meta: {},
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
                meta: {},
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
                meta: {},
            };
            let newState = navigation(state, action);

            expect(newState.next).toEqual('1');
            expect(newState.prev).toEqual('2');
            expect(newState.self).toEqual('3');
            expect(newState.total).toEqual(4);
        });

        it('hangs on to a counter to surface page number and total pages', function() {
            let state = {
                query: 'test',
            };
            let action = {
                type: actionTypes.searchComplete,
                payload: {
                    '_links': {},
                    '_total': 4,
                },
                meta: {
                    pageSize: 1,
                    newSearch: true,
                },
            };
            let newState = navigation(state, action);

            expect(newState.currentPage).toEqual(1);
            expect(newState.totalPages).toEqual(4);

            let action2 = {
                type: actionTypes.searchComplete,
                payload: {
                    '_links': {},
                    '_total': 4,
                },
                meta: {
                    pageSize: 1,
                    inc: true,
                },
            };
            let newState2 = navigation(newState, action2);

            expect(newState2.currentPage).toEqual(2);

            let action3 = {
                type: actionTypes.searchComplete,
                payload: {
                    '_links': {},
                    '_total': 4,
                },
                meta: {
                    pageSize: 1,
                    dec: true,
                },
            };
            let newState3 = navigation(newState2, action3);

            expect(newState3.currentPage).toEqual(1);
        });

    });

});
