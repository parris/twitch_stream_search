define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const Component = require('/src/components/Component.js');
    const { Img, Li, P } = require('/src/components/BasicComponents.js');
    const i18n = require('/src/utils/i18n.js');

    return class Card extends Component {
        render() {
            let stream = this.props.stream;
            let altText = i18n(`${ stream.name } - Stream Preview`);

            return (
                build(Li, { className: 'card',}, [
                    build(Img, { src: stream.image, alt: altText, }),
                    build(P, {}, [stream.name]),
                    build(P, {}, [stream.game]),
                    build(P, {}, [stream.descripton]),
                ])
            );
        }
    };
});
