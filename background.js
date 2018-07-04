// browser.omnibox.setDefaultSuggestion({
//   description: `Search for containers and switch to them (e.g. "co personal" or "co banking")`
// });

// browser.omnibox.onInputChanged.addListener(async (text, addSuggestions) => {
//   const contexts = await browser.contextualIdentities.query({});
//   const result = [];
//   contexts.push({
//     name: "default",
//     description: `Switch to container: default`
//   });
//   for (let context of contexts) {
//     if (context.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
//       result.push({
//         content: context.name,
//         description: `Switch to container: ${context.name}`
//       })
//     }
//   }
//   addSuggestions(result);
// });

// browser.omnibox.onInputEntered.addListener(async (text, disposition) => {
//   const contexts = await browser.contextualIdentities.query({});
//   const tabs = await browser.tabs.query({ currentWindow: true, active: true });
//   contexts.push({
//     cookieStoreId: 'firefox-default',
//     name: 'default'
//   });

//   for (let context of contexts) {
//     if (context.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
//       let tabCreateProperties = {
//         cookieStoreId: context.cookieStoreId,
//         index: tabs[0].index
//       };
//       if(tabs[0].url !== 'about:newtab') {
//         tabCreateProperties.url = tabs[0].url;
//       }
//       browser.tabs.create(tabCreateProperties);
//       browser.tabs.remove(tabs[0].id);
//       break
//     }
//   }
// });
