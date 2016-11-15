define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const Component = require('/src/components/Component.js');
    const { Ul } = require('/src/components/BasicComponents.js');

    return class CardList extends Component {
        render() {
            return build(Ul, { className: 'card-list', }, this.children);
        }
    };
});
