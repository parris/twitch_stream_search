define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const Component = require('/src/components/Component.js');
    const { Div, Form, Input } = require('/src/components/BasicComponents.js');
    const i18n = require('/src/utils/i18n.js');

    return class Header extends Component {

        events() {
            return {
                'submit .js-query-form': (e) => {
                    e.preventDefault();
                    let queryInputEl = document.querySelector('.js-query-input');
                    this.props.onSearch(queryInputEl.value);
                },
            };
        }

        render() {
            return (
                build(Form, { className: 'js-query-form header', }, [
                    build(Div, { className: 'header__search', }, [
                        build(Input, {
                            type: 'text',
                            className: 'search-input js-query-input',
                            value: this.props.query,
                            placeholder: i18n('Search query...'),
                        }),
                        build(Input, {
                            type: 'submit',
                            className: 'search-button js-query-input',
                            value: i18n('Search'),
                        }),
                    ]),
                ])
            );
        }
    };
});
