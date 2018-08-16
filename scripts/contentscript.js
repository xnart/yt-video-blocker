let storage = browser.storage.sync || browser.storage.local;

let pageManager = document.querySelector("ytd-page-manager");
let related = document.querySelector("#related");
let sectionList = document.querySelector("ytd-section-list-renderer");
let endScreen = document.querySelector(".ytp-endscreen-content");

let config = { childList: true, subtree: true };

let observer = new MutationObserver(block);

observer.observe(pageManager, config);
observer.observe(related, config);
observer.observe(sectionList, config);
observer.observe(endScreen, config);

async function block() {
  let keywords = await storage.get("blockedKeywords");

  let videos = document.querySelectorAll(
    "ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer, .ytp-videowall-still"
  );

  for (const video of videos) {
    for (const keyword of keywords.blockedKeywords) {
      if (keyword.trim() === "") continue;
      let regex = new RegExp(keyword, "i");
      if (regex.test(video.textContent.trim())) {
        video.remove();
      }
    }
  }
}

block();
