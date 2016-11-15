define(function(require) {
    'use strict';

    const i18n = require('/src/utils/i18n.js');

    return function header(props) {
        return (`
            <form class="js-query-form header">
                <input
                    type="text"
                    class="js-query-input"
                    value="${ props.query }"
                    placeholder="${ i18n('Search query...') }"
                />
                <input type="submit" value="${ i18n('Search') }" />
            </form>
        `);
    };
});
