define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const Component = require('/src/components/Component.js');
    const { A, Article, Header, Img, Li, P } = require('/src/components/BasicComponents.js');
    const i18n = require('/src/utils/i18n.js');

    return class Card extends Component {
        render() {
            let stream = this.props.stream;
            let altText = i18n(`${ stream.name } - Stream Preview`);

            return (
                build(Li, { className: 'card',}, [
                    build(A, { href: stream.url, target: '_blank', }, [
                        build(Img, { className: 'card__image', src: stream.image, alt: altText, }),
                    ]),
                    build(Article, { className: 'card__body', }, [
                        build(A, { href: stream.url, target: '_blank', }, [
                            build(Header, { className: 'card__title'}, [stream.name]),
                        ]),
                        build(P, {}, [i18n(`${stream.game} - ${stream.viewers} viewers`)]),
                        build(P, {}, [i18n(`Stream description - ${stream.description}`)]),
                    ])
                ])
            );
        }
    };
});
