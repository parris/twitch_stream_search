/**
 * Super simple test framework from scratch. It is modeled off of jasmine.
 * I think a few parts of it are messy. I think jasmine has a bunch of globals,
 * and plays around with prototypes and call/apply a lot. I tried to avoid too
 * many games like that. Just trying to get a simple test runner going.
 */
define(function(require) {
    'use strict';

    var testing = {
        passCount: 0,
        failCount: 0,

        failedTests: [],
        passedTests: [],
        currentDescribe: null,
        currentIt: null,
        currentExpectCount: 0,

        testsToRun: [],

        describe: function(name, callback) {
            testing.currentDescribe = name;
            callback();
            testing.currentDescribe = null;
        },

        it: function(name, callback) {
            testing.testsToRun.push({
                describeName: testing.currentDescribe,
                itName: name,
                callback: callback,
            });
        },

        expect: function(actual) {
            return {
                toEqual: function(expected) {
                    testing.currentExpectCount++;
                    if (actual === expected) {
                        testing.passCount++;
                        testing.passedTests.push(`${testing.currentDescribe}, ${testing.currentIt}, expect #${testing.currentExpectCount}`);
                        return true;
                    }

                    testing.failCount++;
                    testing.failedTests.push(`${testing.currentDescribe}, ${testing.currentIt}, expect #${testing.currentExpectCount}`);
                    return false;
                },
            };
        },

        runTests: function() {
            testing.testsToRun.forEach(function(it) {
                testing.currentDescribe = it.describeName;
                testing.currentIt = it.itName;
                testing.currentExpectCount = 0;
                it.callback();
                testing.currentDescribe = null;
                testing.currentIt = null;
                testing.currentExpectCount = 0;
            });

            return {
                passedTests: testing.passedTests,
                failedTests: testing.failedTests,
                passCount: testing.passCount,
                failCount: testing.failCount,
            };
        },

    };

    return testing;
});
