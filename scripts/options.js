let storage = browser.storage.sync || browser.storage.local;

browser.runtime.onMessage.addListener(function (request) {
  if (request.action === 'update-options') {
    setKeywords();
  }
});


document.querySelector('#saveBtn').onclick = function () {
  let keywords = document.querySelector('#blockedKeywords').value.split(',');

  storage.set({blockedKeywords: keywords})
    .then(setKeywords, (error) => console.log(error));
};


async function setKeywords() {
  let keywords = await storage.get('blockedKeywords');


  document.querySelector('#blockedKeywords').textContent = keywords.blockedKeywords.toString();

  return true;
}

setKeywords();