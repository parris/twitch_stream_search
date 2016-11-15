define(function(require) {
    'use strict';

    function generateCallbackName() {
        return `jsonpcb_${(new Date().getTime())}_${Math.round(Math.random() * 100000)}`;
    };

    return {
        jsonp: function jsonp(path) {
            let callbackName = generateCallbackName();

            let requestPromise = new Promise(function(resolve, reject) {
                window[callbackName] = (data) => {
                    delete window[callbackName];
                    resolve(data);
                };

                let script = document.createElement('script');
                if (path.indexOf('?')) {
                    script.src = path + `&callback=${callbackName}`;
                } else {
                    script.src = path + `?callback=${callbackName}`;
                }
                document.body.appendChild(script);
            });

            return requestPromise;
        },
    };
});
