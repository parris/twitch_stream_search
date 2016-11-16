define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const Component = require('/src/components/Component.js');
    const { Button, Div } = require('/src/components/BasicComponents.js');

    return class CardListHeader extends Component {

        events() {
            return {
                'click .js-prev': (e) => {
                    e.preventDefault();
                    this.props.onPrev();
                },
                'click .js-next': (e) => {
                    e.preventDefault();
                    this.props.onNext();
                },
            };
        }

        render() {
            return build(Div, { className: 'card-list-info'}, [
                build(
                    Div, { className: 'card-list-count'}, [this.props.count]
                ),
                build(Div, { className: 'card-list-controls'}, [
                    build(Button, {
                        className: 'js-prev',
                        disabled: this.props.hasPrev ? '' : 'disabled',
                    }, ['&lt;']),
                    build(Button, {
                        className: 'js-next',
                        disabled: this.props.hasNext ? '' : 'disabled',
                    }, ['&gt;']),
                ]),
            ]);
        }
    };
});
