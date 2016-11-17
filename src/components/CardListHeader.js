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
            let info = this.props.info;

            let counter = '';
            if (info.total > 0) {
                counter = build(
                    Div, { className: 'card-list-count'}, [`Total results: ${info.total}`,]
                );
            }

            let page = '';
            if (info.currentPage > 0) {
                page = ` ${info.currentPage} / ${info.totalPages} `;
            }

            let prevButtonProperties = {
                className: 'pagination-button triangle--left js-prev',
            };
            if (!this.props.hasPrev) {
                prevButtonProperties.disabled = 'disabled';
            }

            let nextButtonProperties = {
                className: 'pagination-button triangle--right js-next',
            };
            // HAH... funny story, the twitch api paginates poorly,
            // sometimes pages return back at the proper limit. Sometimes they
            // don't. I just don't want to look stupid, so we'll prevent people
            // from clicking next and the counter looking like we are on page
            // 14 of 13.
            if (!this.props.hasNext || info.currentPage === info.totalPages) {
                nextButtonProperties.disabled = 'disabled';
            }

            let controls = [];
            if (counter) {
                controls = [
                    build(Button, prevButtonProperties, []),
                    page,
                    build(Button, nextButtonProperties, []),
                ];
            }

            return build(Div, { className: 'card-list-info'}, [
                counter,
                build(Div, { className: 'l-align-right'}, controls),
            ]);
        }
    };
});
