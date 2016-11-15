define(function(require) {
    'use strict';

    return function card(props) {
        return (`
            <li class="card">
                <img src="${ props.image }" alt="${ props.name } - Stream Preview" />
                <p>${ props.name }</p>
                <p>${ props.game }</p>
                <p>${ props.description }</p>
            </li>
        `);
    };
});
