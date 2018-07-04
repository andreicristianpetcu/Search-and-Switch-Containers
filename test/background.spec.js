(function () {
    'use strict';

    describe('Default suggestion', function () {
        it('should have a good default suggestion', function () {
            assert.ok(browser.omnibox.setDefaultSuggestion.withArgs({
                description: `Search for containers and switch to them (e.g. "co personal" or "co banking")`
            }).calledOnce, 'setDefaultSuggestion should be called with specified args');
        });
    });

    describe('browser.omnibox.onInputChanged.addListener', function () {
        const onInputChangedListener = browser.omnibox.onInputChanged.addListener.getCall(0).args[0];
        const addSuggestions = sinon.spy();

        it('should have a good default suggestion', async function () {
            browser.contextualIdentities.query = sinon.fake.returns(Promise.resolve([]));

            await onInputChangedListener('de', addSuggestions);

            assert.ok(addSuggestions.withArgs([{
                "content": "default",
                "description": "Switch to container: default"
            }]).calledOnce, 'addSuggestions should include the default container');
        });

        it('should match the needed containers', async function () {
            browser.contextualIdentities.query = sinon.fake.returns(Promise.resolve(
                [{
                    name: "Fun"
                }, {
                    name: "Boring work"
                }]
            ));

            await onInputChangedListener('fu', addSuggestions);

            assert.ok(addSuggestions.withArgs([{
                "content": "Fun",
                "description": "Switch to container: Fun"
            }]).calledOnce, 'addSuggestions should include the matching container name');
        });
    });

})();