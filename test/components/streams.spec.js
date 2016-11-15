define(function(require) {
    'use strict';

    const createStore = require('/src/utils/store.js');
    const { describe, it, expect } = require('/src/utils/testUtils.js');

    const streams = require('/src/components/streams.js');

    describe('Streams', function() {

        it('renders the streams', function() {
            let streamList = [
                { name: 'abc' },
                { name: 'xyz' },
                { name: '123' },
            ];
            let store = createStore({
                initialState: {
                    streams: streamList,
                    navigation: {
                        query: ''
                    },
                },
            });

            let rendered = streams(store.getState());

            expect(
                rendered.indexOf(streamList[0].name) !== -1
            ).toEqual(true);

            expect(
                rendered.indexOf(streamList[1].name) !== -1
            ).toEqual(true);

            expect(
                rendered.indexOf(streamList[1].name) !== -1
            ).toEqual(true);
        });

        it('renders the search form', function() {
            let streamList = [
                { name: 'abc' },
                { name: 'xyz' },
                { name: '123' },
            ];
            let store = createStore({
                initialState: {
                    streams: streamList,
                    navigation: {
                        query: ''
                    },
                },
            });

            let rendered = streams(store.getState());

            expect(
                rendered.indexOf('type="text"') !== -1
            ).toEqual(true);
            expect(
                rendered.indexOf('type="submit"') !== -1
            ).toEqual(true);
        });

    });

});
