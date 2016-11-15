define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const Component = require('/src/components/Component.js');
    const { Button, Div } = require('/src/components/BasicComponents.js');
    const i18n = require('/src/utils/i18n.js');

    const Card = require('/src/components/Card.js');
    const CardList = require('/src/components/CardList.js');
    const Header = require('/src/components/Header.js');

    return class Streams extends Component {

        events() {
            return {
                'click .js-prev': (e) => {
                    e.preventDefault();
                    this.props.actions.searchPrev();
                },
                'click .js-next': (e) => {
                    e.preventDefault();
                    this.props.actions.searchNext();
                },
            };
        }

        render() {
            return build(
                Div, { className: 'layout'},
                [
                    build(Header, {
                        onSearch: this.props.actions.search,
                        query: this.props.navigation.query,
                    }, []),
                    build(Div, {}, [
                        this.props.navigation.total,
                        build(Button, { className: 'js-prev', }, ['&lt;']),
                        build(Button, { className: 'js-next', }, ['&gt;']),
                    ]),
                    build(
                        CardList,
                        {},
                        this.props.streams.map(
                            function(stream) {
                                return build(Card, { stream: stream, })
                            }
                        )
                    ),
                ]
            );
        }
    };

});
