define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const Component = require('/src/components/Component.js');
    const { Article, H1, H2, Ul, Li, P } = require('/src/components/BasicComponents.js');

    class AllPassed extends Component {
        render() {
            let listItems = this.props.passedTests.map(
                function(passedTest) { return build(Li, {}, [passedTest]); }
            )

            return build(
                Article, {}, [
                    build(P, {}, [build(H1, {}, ['Test Runner'])]),
                    build(P, {}, [`Pass Count: ${this.props.passCount}`]),
                    build(P, {}, [`Fail Count: ${this.props.failCount}`]),
                    build(P, {}, ['✓ All is good!']),
                    build(P, {}, [
                        build(H2, {}, 'Passed:'),
                        build(Ul, {}, listItems),
                    ]),
                ]
            );
        }
    }

    class SomeFailed extends Component {
        render() {
            let listItems = this.props.failedTests.map(
                function(failedTest) { return build(Li, {}, [failedTest]); }
            )

            return build(
                Article, {}, [
                    build(P, {}, [build(H1, {}, ['Test Runner'])]),
                    build(P, {}, [`Pass Count: ${this.props.passCount}`]),
                    build(P, {}, [`Fail Count: ${this.props.failCount}`]),
                    build(P, {}, [
                        build(H2, {}, 'Failures:'),
                        build(Ul, {}, listItems),
                    ]),
                ]
            );
        }
    }

    return class UnitTestRunner extends Component {
        render() {
            let state = this.props.getState();
            if (state.failCount === 0) {
                return build(AllPassed, state);
            }

            return build(SomeFailed, state);
        }
    };

});
