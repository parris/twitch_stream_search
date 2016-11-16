define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const { renderComponentTree } = require('/src/utils/renderer.js');
    const { describe, it, expect } = require('/src/utils/testUtils.js');

    const Card = require('/src/components/Card.js');

    describe('Card', function() {

        it('contains the stream name', function() {
            let testName = '123';
            expect(
                renderComponentTree(
                    build(Card, { stream: { name: testName }, })
                ).html.indexOf(testName) !== -1
            ).toEqual(true);
        });

    });

});
