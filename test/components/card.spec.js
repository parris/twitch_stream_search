define(function(require) {
    'use strict';

    const { describe, it, expect } = require('/src/utils/testUtils.js');

    const card = require('/src/components/card.js');

    describe('Card', function() {

        it('contains the stream name', function() {
            let testName = '123';

            expect(
                card({ name: testName, }).indexOf(testName) !== -1
            ).toEqual(true);
        });

    });

});
