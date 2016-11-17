define(function(require) {
    'use strict';

    const build = require('/src/utils/componentBuilder.js');
    const Component = require('/src/components/Component.js');

    class Div extends Component {
        render() {
            return (
                build('div', this.props, this.children)
            );
        }
    }

    class Header extends Component {
        render() {
            return (
                build('header', this.props, this.children)
            );
        }
    }

    class Button extends Component {
        render() {
            return (
                build('button', this.props, this.children)
            );
        }
    }

    class A extends Component {
        render() {
            return (
                build('a', this.props, this.children)
            );
        }
    }

    class Article extends Component {
        render() {
            return (
                build('article', this.props, this.children)
            );
        }
    }

    class H1 extends Component {
        render() {
            return (
                build('h1', this.props, this.children)
            );
        }
    }

    class H2 extends Component {
        render() {
            return (
                build('h2', this.props, this.children)
            );
        }
    }

    class P extends Component {
        render() {
            return (
                build('p', this.props, this.children)
            );
        }
    }

    class Img extends Component {
        render() {
            return (
                build('img', this.props, this.children)
            );
        }
    }

    class Form extends Component {
        render() {
            return (
                build('form', this.props, this.children)
            );
        }
    }

    class Input extends Component {
        render() {
            return (
                build('input', this.props)
            );
        }
    }

    class Ul extends Component {
        render() {
            return (
                build('ul', this.props, this.children)
            );
        }
    }

    class Li extends Component {
        render() {
            return (
                build('li', this.props, this.children)
            );
        }
    }

    return {
        Div: Div,
        Header: Header,
        Button: Button,
        A: A,
        Article: Article,
        H1: H1,
        H2: H2,
        P: P,
        Img: Img,
        Form: Form,
        Input: Input,
        Ul: Ul,
        Li: Li,
    };

});
