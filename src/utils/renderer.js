define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');

    function propsToAttributes(props) {
        let attributes = [];
        for (let key in props) {
            let k = key;
            if (key === 'className') {
                k = 'class';
            }
            attributes.push(`${k}="${props[key]}"`)
        }

        return attributes.join(' ');
    }

    function mapEvents(events) {
        let results = [];

        for (let key in events) {
            let [eventType, className] = key.split(' ');
            results.push({
                eventType: eventType,
                className: className,
                callback: events[key],
            });
        }

        return results;
    }

    function renderComponentTree(tree) {
        let html = '';
        let events = [];

        function treeToHtml(tree) {
            // handle the bottom most leaf of the tree
            if (typeof tree === 'undefined') {
                return '';
            }

            // handle plain text and numbers
            if (typeof tree === 'string' || typeof tree === 'number') {
                return String(tree);
            }

            if (tree.events) {
                events = events.concat(mapEvents(tree.events));
            }

            let children = '';

            if (typeof tree.children === 'object') {
                // if children is an array
                if (typeof tree.children.length === 'number') {
                    children = tree.children.map((child) => treeToHtml(child)).join('');
                } else {
                    children = treeToHtml(tree.children);
                }
            }

            if (typeof tree.type === 'string') {
                let attributes = propsToAttributes(tree.props);
                return `<${tree.type} ${attributes}>${children}</${tree.type}>`
            } else {
                return children;
            }
        }

        html = treeToHtml(tree);

        return {
            html: html,
            events: events,
        };
    }

    function removeEvents(events) {
        events.forEach((event) => {
            document.querySelectorAll(event.className).forEach((el) => {
                el.removeEventListener(event.eventType, event.callback);
            });
        });
    }

    function addEvents(events) {
        events.forEach((event) => {
            document.querySelectorAll(event.className).forEach((el) => {
                el.addEventListener(event.eventType, event.callback);
            });
        });
    }

    function renderer(el, store, Component) {
        let lastEventListeners = [];

        store.addListener(function() {
            let componentTree = renderComponentTree(build(Component, store));

            removeEvents(lastEventListeners);
            el.innerHTML = componentTree.html;
            lastEventListeners = componentTree.events;
            addEvents(lastEventListeners);
        });

        let componentTree = renderComponentTree(build(Component, store));
        el.innerHTML = componentTree.html;
        lastEventListeners = componentTree.events;
        addEvents(lastEventListeners);
    }

    return {
        renderComponentTree: renderComponentTree,
        renderer: renderer,
    };
});
