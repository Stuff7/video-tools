<script lang="ts">
import "~/style/base.scss";
import { onDestroy, onMount } from "svelte";
import VideoTools from "./components/VideoTools.svelte";

type Video = {
  id: string,
  videoElem: HTMLVideoElement,
}

let videos: Video[] = [];
let subsUploadOn = import.meta.env.DEV;

function reflow() {
  videos = videos;
}

function onBrowserMessage(request: BrowserRequest) {
  subsUploadOn = !!request.showSubsUploadArea;
}

onMount(() => {
  videos = [...document.querySelectorAll("video")].map(videoElem => {
    videoElem.addEventListener("loadeddata", reflow);

    return {
      id: crypto.randomUUID(),
      videoElem,
    };
  });
  browser.runtime.onMessage.addListener(onBrowserMessage);
});

onDestroy(() => {
  videos.forEach(({ videoElem }) => videoElem.removeEventListener("loadeddata", reflow));
  browser.runtime.onMessage.removeListener(onBrowserMessage);
});
</script>

<svelte:window on:resize={reflow} />
<div class="VideoToolsExt">
  {#each videos as { id, videoElem } (id)}
    <VideoTools {videoElem} {subsUploadOn} />
  {/each}
</div>

<style lang="scss">
.VideoToolsExt {
  display: flex;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  pointer-events: none;
  font-family: "Consolas", "Menlo", "Monaco", "Courier New", monospace;
}
</style>
