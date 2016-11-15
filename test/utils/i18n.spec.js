define(function(require) {
    'use strict';

    const { describe, it, expect } = require('/src/utils/testUtils.js');

    const i18n = require('/src/utils/i18n.js');

    describe('i18n', function() {

        it('returns a string', function() {
            expect(i18n('hello')).toEqual('hello');
        });

    });

});
