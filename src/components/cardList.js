define(function(require) {
    'use strict';

    return function cardList(props) {
        return (`
            <ul class="card-list">
                ${ props.children }
            </ul>
        `);
    };
});
