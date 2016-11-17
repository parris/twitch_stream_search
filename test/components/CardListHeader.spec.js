define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const Component = require('/src/components/Component.js');
    const { renderComponentTree } = require('/src/utils/renderer.js');
    const { describe, it, expect } = require('/src/utils/testUtils.js');

    const CardListHeader = require('/src/components/CardListHeader.js');

    describe('CardListHeader', function() {

        it('disables prev/next buttons when there are no links', function() {
            expect(
                renderComponentTree(
                    build(CardListHeader, { hasNext: false, hasPrev: false, info: { total: 50, totalPages: 10, }, }, [])
                ).html.match(/disabled/g).length
            ).toEqual(4); // 4 means, disabled="disabled" 2 times

            expect(
                renderComponentTree(
                    build(CardListHeader, { hasNext: false, hasPrev: true, info: { total: 50, totalPages: 10, }, }, [])
                ).html.match(/disabled/g).length
            ).toEqual(2);

            expect(
                renderComponentTree(
                    build(CardListHeader, { hasNext: true, hasPrev: false, info: { total: 50, totalPages: 10, }, }, [])
                ).html.match(/disabled/g).length
            ).toEqual(2);

            expect(
                renderComponentTree(
                    build(CardListHeader, { hasNext: true, hasPrev: true, info: { total: 50, totalPages: 10, }, }, [])
                ).html.match(/disabled/g)
            ).toEqual(null);

            expect(
                renderComponentTree(
                    build(CardListHeader, {
                        hasNext: true,
                        hasPrev: true,
                        info: { total: 50, currentPage: 10, totalPages: 10, },
                    }, [])
                ).html.match(/disabled/g).length
            ).toEqual(2);
        });

    });

});
