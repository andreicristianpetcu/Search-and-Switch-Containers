browser.omnibox.setDefaultSuggestion({
  description: `Search for containers and switch to them (e.g. "co personal", "co banking", or "co default" for no container)`,
});

// Helper function to get icon emoji for container icons
function getContainerIconEmoji(iconName) {
  const iconMap = {
    fingerprint: '🔒',
    briefcase: '💼',
    dollar: '💰',
    cart: '🛒',
    circle: '🔵',
    gift: '🎁',
    vacation: '🏖️',
    food: '🍕',
    fruit: '🍎',
    pet: '🐕',
    tree: '🌳',
    chill: '😎',
    fence: '🚧',
    heart: '❤️',
  };
  return iconMap[iconName] || '📁';
}

// Helper function to get color indicator
function getColorIndicator(colorName) {
  const colorMap = {
    blue: '🔵',
    turquoise: '🔵',
    green: '🟢',
    yellow: '🟡',
    orange: '🟠',
    red: '🔴',
    pink: '⚪️',
    purple: '🟣',
    toolbar: '⚫',
  };
  return colorMap[colorName] || '⚪';
}

browser.omnibox.onInputChanged.addListener(async (text, addSuggestions) => {
  const contexts = await browser.contextualIdentities.query({});

  // Add default container
  contexts.push({
    name: 'default',
    color: 'toolbar',
    icon: 'circle',
  });

  const searchText = text.toLowerCase();

  // Find exact matches first
  const exactMatches = contexts.filter(
    (context) => context.name.toLowerCase() === searchText
  );

  // Find partial matches (excluding exact matches)
  const partialMatches = contexts.filter(
    (context) =>
      context.name.toLowerCase().includes(searchText) &&
      context.name.toLowerCase() !== searchText
  );

  // Combine: exact matches first, then partial matches, limit to 5 total
  const allMatches = [...exactMatches, ...partialMatches].slice(0, 5);

  const result = allMatches.map((context) => {
    const iconEmoji = getContainerIconEmoji(context.icon);
    const colorEmoji = getColorIndicator(context.color);

    return {
      content: context.name,
      description: `${iconEmoji} ${colorEmoji} Switch to container: ${context.name}`,
    };
  });

  addSuggestions(result);
});

browser.omnibox.onInputEntered.addListener(async (text) => {
  const contexts = await browser.contextualIdentities.query({});
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  contexts.push({
    cookieStoreId: 'firefox-default',
    name: 'default',
  });

  for (const context of contexts) {
    if (context.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
      const tabCreateProperties = {
        cookieStoreId: context.cookieStoreId,
        index: tabs[0].index,
      };
      if (tabs[0].url !== 'about:newtab' && tabs[0].url !== 'about:blank') {
        tabCreateProperties.url = tabs[0].url;
      }
      browser.tabs.create(tabCreateProperties);
      browser.tabs.remove(tabs[0].id);
      break;
    }
  }
});
