define(function(require) {
    'use strict';

    const renderer = require('/src/utils/renderer.js');
    const createStore = require('/src/utils/store.js');
    const testUtils = require('/src/utils/testUtils.js');

    const unitTestRunner = require('/src/containers/unitTestRunner.js');

    // ideally these would be "discovered" by the test runner.
    require('/test/actionCreators.spec.js');
    require('/test/components/card.spec.js');
    require('/test/components/cardList.spec.js');
    require('/test/components/streams.spec.js');
    require('/test/containers/twitchStream.spec.js');
    require('/test/reducers/navigation.spec.js');
    require('/test/reducers/streams.spec.js');
    require('/test/utils/i18n.spec.js');
    require('/test/utils/store.spec.js');

    return function() {
        const results = testUtils.runTests();
        renderer(
            document.querySelector('.js-root'),
            createStore({
                initialState: results,
            }),
            unitTestRunner
        );
    };
});
