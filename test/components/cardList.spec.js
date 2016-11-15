define(function(require) {
    'use strict';

    const { describe, it, expect } = require('/src/utils/testUtils.js');

    const cardList = require('/src/components/cardList.js');

    describe('CardList', function() {

        it('renders children', function() {
            let testChild = '<li>123</li>';

            expect(
                cardList({ children: testChild, }).indexOf(testChild) !== -1
            ).toEqual(true);
        });

    });

});
