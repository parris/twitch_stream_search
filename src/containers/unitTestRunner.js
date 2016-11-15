define(function(require) {
    'use strict';

    function allPassed(props) {
        let listItems = props.passedTests.map(
            function(passedTest) { return passedTest; }
        ).reduce(function(memo, html) {
            return memo + `<li>${ html }</li>`;
        }, '');

        return (`
            <article>
                <p>
                    <h1>Test Runner</h1>
                </p>
                <p>Fail Count: ${props.failCount}</p>
                <p>Pass Count: ${props.passCount}</p>
                <p>✓ All is good!</p>
                <p>
                    <h2>Passed:</h2>
                    <ul>
                        ${ listItems }
                    </ul>
                </p>
            </article>
        `);
    };

    function someFailed(props) {
        let listItems = props.failedTests.map(
            function(failedTest) { return failedTest; }
        ).reduce(function(memo, html) {
            return memo + `<li>${ html }</li>`;
        }, '');

        return (`
            <article>
                <p>
                    <h1>Test Runner</h1>
                    <p>Fail Count: ${props.failCount}</p>
                    <p>Pass Count: ${props.passCount}</p>
                </p>
                <p>
                    <h2>Failures:</h2>
                    <ul>
                        ${ listItems }
                    </ul>
                </p>
            </article>
        `);
    };

    return function unitTestRunner(props) {
        let state = props.getState();
        if (state.failCount === 0) {
            return allPassed(state);
        }

        return someFailed(state);
    };

});
