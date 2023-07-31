export async function searchSubtitles(search: string) {
  const rawHTML = await rawAPIFetch(`search.php?search=${encodeURIComponent(search)}&Submit=Search`);

  if (!rawHTML) {
    return null;
  }

  const anchorStart = '<a class="buttonDownload" href="/';
  const anchorSearch = `${anchorStart}original`;
  const downloadLink = rawHTML.slice(rawHTML.indexOf(anchorSearch) + anchorStart.length);

  const subtitlesText = srtToWebVTT(
    `${await rawAPIFetch(downloadLink.slice(0, downloadLink.indexOf('"')))}/`,
  );

  return subtitlesText || null;
}

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

export async function rawAPIFetch(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API}/${endpoint}`, options ? { ...APIOptions, ...options } : APIOptions);
  return response.ok ? response.text() : null;
}

const API = "https://www.addic7ed.com";
const APIOptions: RequestInit = { referrer: API, method: "GET", mode: "cors" };
