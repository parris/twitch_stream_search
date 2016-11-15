define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const Component = require('/src/components/Component.js');
    const { renderComponentTree } = require('/src/utils/renderer.js');
    const { describe, it, expect } = require('/src/utils/testUtils.js');

    const Card = require('/src/components/Card.js');
    const CardList = require('/src/components/CardList.js');

    describe('CardList', function() {

        it('renders children', function() {
            let name = 'test';

            class CardListContainer extends Component {
                render() {
                    return build(CardList, {}, [
                        build(Card, { stream: { name: name, }, })
                    ]);
                }
            }

            expect(
                renderComponentTree(
                    CardListContainer, {}
                ).html.indexOf(name) !== -1
            ).toEqual(true);
        });

    });

});
