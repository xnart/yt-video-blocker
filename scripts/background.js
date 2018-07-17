let storage = browser.storage.local;

browser.runtime.onMessage.addListener(async (request) => {
  if (request.action === 'perform-save') {
    let resp = await storage.get('blockedKeywords');

    let keywords = resp.blockedKeywords;
    keywords.push(request.data);
    storage.set({blockedKeywords: keywords});
  }
});

browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    let keywords = await storage.get('blockedKeywords');
    if (!keywords.blockedKeywords) {
      keywords = [];
      storage.set({blockedKeywords: keywords});
    }
  }
});