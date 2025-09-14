// Function to hide ads by common class names
function hideAds() {
    const adSelectors = [
        '[aria-label="Ads"]',          // Google Search Ads
        '[aria-label="Sponsored"]',    // Sponsored ads
        'div[data-text-ad]',           // Google Text Ads
        'iframe[src*="ads"]',          // iFrame ads
        '.ad-container',               // Common ad containers
        'div[id*="google_ads_iframe"]' // Google AdSense banners
    ];

    adSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
    });
}

// Function to add a 10x button for YouTube videos
function addSpeedButton() {
    const controls = document.querySelector(".ytp-left-controls");
    if (!controls || document.getElementById("tenXButton")) return;

    const button = document.createElement("button");
    button.id = "tenXButton";
    button.innerText = ">>";
    button.classList.add("ytp-button");

    button.addEventListener("click", () => {
        const video = document.querySelector("video");
        if (video) {
            video.playbackRate = video.playbackRate !== 10 ? 10 : 1;
        }
    });

    controls.appendChild(button);
}

// Function to auto-speed up YouTube ads
function speedUpAds() {
    const video = document.querySelector("video");
    if (video && video.src.includes("googlevideo")) {
        video.playbackRate = 10;
        video.muted = true;
    }
}

// Observer for YouTube changes
function observeYouTubeChanges() {
    const observer = new MutationObserver(() => {
        addSpeedButton();
        speedUpAds();
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Observer for general ad hiding
function observeAds() {
    const adObserver = new MutationObserver(hideAds);
    adObserver.observe(document.body, { childList: true, subtree: true });
}

// Run the functions
hideAds();
addSpeedButton();
speedUpAds();
observeYouTubeChanges();
observeAds();
