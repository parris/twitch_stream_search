define(function(require) {
    'use strict';

    const i18n = require('/src/utils/i18n.js');

    const card = require('/src/components/card.js');
    const cardList = require('/src/components/cardList.js');
    const header = require('/src/components/header.js');

    return function twitchSteam(props) {
        var cards = props.streams.map(
            function(stream) { return card(stream); }
        ).join('');

        return (`
            <div class="layout">
                ${ header({ query: props.navigation.query }) }
                <div>
                    ${ props.navigation.total }
                    <button class="js-prev">&lt;</button>
                    <button class="js-next">&gt;</button>
                </div>
                ${ cardList({ children: cards, }) }
            </div>
        `);
    };

});
