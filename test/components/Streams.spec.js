define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const { renderComponentTree } = require('/src/utils/renderer.js');
    const createStore = require('/src/utils/store.js');
    const { describe, it, expect } = require('/src/utils/testUtils.js');

    const Streams = require('/src/components/Streams.js');

    describe('Streams', function() {

        it('renders the streams', function() {
            let streamList = [
                { name: 'abc' },
                { name: 'xyz' },
                { name: '123' },
            ];
            let store = createStore({
                initialState: {
                    actions: {},
                    streams: streamList,
                    navigation: {
                        query: ''
                    },
                },
            });

            let rendered = renderComponentTree(
                build(Streams, store.getState())
            ).html;

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
                    actions: {},
                    streams: streamList,
                    navigation: {
                        query: ''
                    },
                },
            });

            let rendered = renderComponentTree(
                build(Streams, store.getState())
            ).html;

            expect(
                rendered.indexOf('type="text"') !== -1
            ).toEqual(true);
            expect(
                rendered.indexOf('type="submit"') !== -1
            ).toEqual(true);
        });

    });

});
