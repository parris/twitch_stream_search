define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const Component = require('/src/components/Component.js');
    const { Button, Div } = require('/src/components/BasicComponents.js');
    const i18n = require('/src/utils/i18n.js');

    const Card = require('/src/components/Card.js');
    const CardList = require('/src/components/CardList.js');
    const CardListHeader = require('/src/components/CardListHeader.js');
    const Header = require('/src/components/Header.js');

    return class Streams extends Component {

        render() {
            let cards = this.props.streams.map(
                (stream) => build(Card, { stream: stream, })
            );

            return build(Div, { className: 'layout', }, [
                build(Header, {
                    onSearch: this.props.actions.search,
                    query: this.props.navigation.query,
                }, []),
                build(Div, { className: 'layout__body card-list-container', }, [
                    build(CardListHeader, {
                        onPrev: this.props.actions.searchPrev,
                        hasPrev: Boolean(this.props.navigation.prev),
                        onNext: this.props.actions.searchNext,
                        hasNext: Boolean(this.props.navigation.next),
                        info: this.props.navigation,
                    }, []),
                    build(CardList, {}, cards),
                ]),
            ]);
        }
    };

});
