import { createVttBlob, setSubtitlesForVideo } from "~/api";

console.log("[video-tools] LOADED CONTENT SCRIPT");
browser.runtime.onMessage.addListener((request: { subtitles: string }) => {
  console.log("CONTENT RECEIVED MESSAGE", request);
  if (request.subtitles) {
    const blob = createVttBlob(request.subtitles);
    console.log("BLOB", blob);
    document.querySelectorAll("video").forEach(v => {
      setSubtitlesForVideo(v, blob);
    });
  }
});
