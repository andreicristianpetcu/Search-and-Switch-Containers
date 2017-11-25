browser.omnibox.setDefaultSuggestion({
  description: `Search for containers and switch to them (e.g. "co personal" or "co bancking")`
});

// Update the suggestions whenever the input is changed.
browser.omnibox.onInputChanged.addListener(async (text, addSuggestions) => {
  const contexts = await browser.contextualIdentities.query({});
  for (let context of contexts) {
    if (context.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
      addSuggestions({
        content: context.name,
        description: `Switch to container: ${context.name}`
      });
    }
  }
});

// Open the page based on how the user clicks on a suggestion.
browser.omnibox.onInputEntered.addListener(async (text, disposition) => {
  const contexts = await browser.contextualIdentities.query({});
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  for (let context of contexts) {
    if (context.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
      browser.tabs.create(
        {
          url: tabs[0].url,
          cookieStoreId: context.cookieStoreId
        }
      )
      browser.tabs.remove({ id: tabs[0].id });
      break;
    }
  }
});