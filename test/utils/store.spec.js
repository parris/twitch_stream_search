define(function(require) {
    'use strict';

    const { describe, it, expect } = require('/src/utils/testUtils.js');

    const createStore = require('/src/utils/store.js');

    describe('Store', function() {

        it('retains state', function() {
            expect(
                JSON.stringify(createStore().getState())
            ).toEqual(
                JSON.stringify({})
            );
        });

        it('does nothing when an action is undefined', function() {
            let store = createStore({
                reducers: {
                    increment: function(state, action) {
                        state.count++;
                        return state;
                    },
                },
                initialState: {
                    increment: { count: 0, },
                }
            });
            store.dispatch();
            // first run = 1, second run would equal 2
            expect(store.getState().increment.count).toEqual(1);
        });

        it('allows reducers to transform state', function() {
            let store = createStore({
                reducers: {
                    increment: function(state, action) {
                        let newState = state;

                        if (!newState) {
                            newState = { count: 0, };
                        }

                        if (action.type === 'increment') {
                            newState.count++;
                        }

                        return newState;
                    },
                },
            });

            store.dispatch({ type: 'increment' });

            expect(store.getState().increment.count).toEqual(1);
        });

        it('runs each reducer once on init, to set up the initial state', function() {
            let streamsDefault = [];
            let navDefaultState = { location: 'index', };
            let store = createStore({
                reducers: {
                    streams: function(state, actions) {
                        let newState = state;
                        if (!newState) {
                            newState = streamsDefault;
                        }
                        return newState;
                    },
                    nav: function(state, actions) {
                        let newState = state;
                        if (!newState) {
                            newState = navDefaultState;
                        }
                        return newState;
                    },
                },
            });

            expect(
                JSON.stringify(store.getState())
            ).toEqual(
                JSON.stringify({
                    streams: streamsDefault,
                    nav: navDefaultState,
                })
            );

        });

    });

});
