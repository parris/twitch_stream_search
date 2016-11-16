define(function(require) {
    'use strict';

    const { describe, it, expect } = require('/src/utils/testUtils.js');

    const build = require('/src/utils/componentBuilder.js');
    const Component = require('/src/components/Component.js');
    const { Article, H1, P } = require('/src/components/BasicComponents.js');
    const { renderComponentTree } = require('/src/utils/renderer.js');

    describe('Renderer', function() {

        it('creates a tag from a tag name', function() {
            expect(
                renderComponentTree(build('p', {}, [])).html.indexOf('<p >') !== -1
            ).toEqual(true);
            expect(
                renderComponentTree(build('p', {}, [])).html.indexOf('</p>') !== -1
            ).toEqual(true);
            expect(
                renderComponentTree(build('p', { className: 'test' }, [])).html.indexOf('<p class="test">') !== -1
            ).toEqual(true);
            expect(
                renderComponentTree(build('p', {}, [1, 2, 3])).html.indexOf('123') !== -1
            ).toEqual(true);
        });

        it('allows for rendering nested components', function() {
            class TestComponent extends Component {
                render() {
                    return build(Article, {}, [
                        build(H1, {}, ['hello']),
                        build(P, {}, ['World']),
                    ])
                }
            }

            expect(
                renderComponentTree(build(TestComponent, {}, [])).html.indexOf('<article ><h1 >hello</h1>') !== -1
            ).toEqual(true);

            expect(
                renderComponentTree(build(TestComponent, {}, [])).html.indexOf('<p >World</p>') !== -1
            ).toEqual(true);

            expect(
                renderComponentTree(build(TestComponent, {}, [])).html.indexOf('</article>') !== -1
            ).toEqual(true);
        });

        it('gathers events from nested components', function() {
            class Test extends Component {
                events() {
                    return {'click .js-xyz': () => {},};
                }
                render() {
                    return build(Article, {}, [
                        build(H1, {}, ['hello']),
                        build(P, {}, ['World']),
                    ])
                }
            }

            class TestTwo extends Component {
                events() {
                    return { 'submit .js-abc': () => {}, };
                }
                render() {
                    return build(Article, {}, [
                        build(Test, {}, []),
                    ])
                }
            }

            expect(
                renderComponentTree(build(TestTwo, {}, [])).events.length
            ).toEqual(2);

            expect(
                renderComponentTree(build(TestTwo, {}, [])).events[0].className
            ).toEqual('.js-abc');
            expect(
                renderComponentTree(build(TestTwo, {}, [])).events[0].eventType
            ).toEqual('submit');
            expect(
                typeof renderComponentTree(build(TestTwo, {}, [])).events[0].callback
            ).toEqual('function');

            expect(
                renderComponentTree(build(TestTwo, {}, [])).events[1].className
            ).toEqual('.js-xyz');
            expect(
                renderComponentTree(build(TestTwo, {}, [])).events[1].eventType
            ).toEqual('click');
            expect(
                typeof renderComponentTree(build(TestTwo, {}, [])).events[1].callback
            ).toEqual('function');
        });

    });

});
