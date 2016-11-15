define(function(require) {
    'use strict';

    const { renderer } = require('/src/utils/renderer.js');
    const createStore = require('/src/utils/store.js');
    const testUtils = require('/src/utils/testUtils.js');

    const UnitTestRunner = require('/src/containers/UnitTestRunner.js');

    // ideally these would be "discovered" by the test runner.
    require('/test/actionCreators.spec.js');
    require('/test/components/Card.spec.js');
    require('/test/components/CardList.spec.js');
    require('/test/components/Streams.spec.js');
    require('/test/containers/TwitchStream.spec.js');
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
            UnitTestRunner
        );
    };
});
