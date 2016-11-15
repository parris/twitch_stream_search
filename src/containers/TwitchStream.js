define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const Component = require('/src/components/Component.js');
    const i18n = require('/src/utils/i18n.js');

    const actionCreators = require('/src/actionCreators.js');
    const Streams = require('/src/components/Streams.js');

    return class TwitchStream extends Component {

        constructor(props) {
            super(props);
            let state = props.getState();
            this.props = {
                actions: {
                    search: function(query) {
                        props.dispatch(
                            actionCreators.searchForStreams(props.dispatch, query)
                        );
                    },
                    searchPrev: function() {
                        props.dispatch(
                            actionCreators.searchPrev(props.getState, props.dispatch)
                        );
                    },
                    searchNext: function() {
                        props.dispatch(
                            actionCreators.searchNext(props.getState, props.dispatch)
                        );
                    },
                },
                navigation: state.navigation,
                streams: state.streams,
            };
        }

        render() {
            return build(Streams, this.props);
        }
    }

});
