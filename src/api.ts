export function srtToWebVTT(srtText: string) {
  return `WEBVTT\n\n${srtText.replace(/\r\n|\r|\n/g, "\n").replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, "$1.$2")}`;
}

export function createVttBlob(subtitles: string) {
  const blob = new Blob([subtitles], { type: "text/vtt" });
  return URL.createObjectURL(blob);
}

export function setSubtitlesForVideo(videoElement: HTMLVideoElement, src: string, languageCode = "en") {
  let track = videoElement.querySelector("[data-video-tools]") as HTMLTrackElement;

  if (!track) {
    track = document.createElement("track");
    track.dataset.videoTools = "";
  }

  track.kind = "subtitles";
  track.label = "video-tools";
  track.srclang = languageCode;
  track.default = true;
  track.src = src;

  videoElement.appendChild(track);
}

export async function sendToCurrentTab<T>(message: T) {
  const [currentTab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!currentTab?.id) {
    console.warn("No current tab found.");
    return;
  }
  await browser.tabs.sendMessage(currentTab.id, message);
}

export function polyfill() {
  if (import.meta.env.DEV) {
    const NOOP = () => {};
    const NOOPromise = () => Promise.resolve({});
    (window.browser as unknown) = {
      storage: { local: { set: NOOPromise, get: NOOPromise } },
      extension: { getURL: NOOP },
      runtime: { onMessage: { addListener: NOOP, removeListener: NOOP } },
      tabs: { query: NOOP, sendMessage: NOOP },
    };
  }
}

export function getShortcutsOn(callback: (enabled: boolean) => void) {
  browser.storage.local.get([SHORTCUTS_ON_KEY]).then(({ [SHORTCUTS_ON_KEY]: videoShortcutsOn = true }) => {
    if (typeof videoShortcutsOn === "boolean") {
      callback(videoShortcutsOn);
    }
  });
}

export function onVideoAdded(callback: (node: HTMLVideoElement) => void) {
  // Create a new MutationObserver
  const observer = new MutationObserver(mutationsList => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLVideoElement) {
            callback(node);
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function getBrowserStorageKey<T extends string>(key: T) {
  return `video-tools@stuff7.github.io.${key}` as const;
}

export const SHORTCUTS_ON_KEY = getBrowserStorageKey("shortcuts-on");
