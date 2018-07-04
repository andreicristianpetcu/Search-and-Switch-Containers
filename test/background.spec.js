(function () {
    'use strict';

    describe('Default suggestion', function () {

        it('should have a good default suggestion', function () {
            assert.ok(
                browser.omnibox.setDefaultSuggestion.withArgs(
                    {description: `Search for containers and switch to them (e.g. "co personal" or "co banking")`}
                ).calledOnce,
                'setDefaultSuggestion should be called with specified args'
            );
        });
    });
})();