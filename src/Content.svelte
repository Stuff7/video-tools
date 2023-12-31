<script lang="ts">
import "~/style/base.scss";
import { onDestroy, onMount } from "svelte";
import VideoTools from "~/components/VideoTools.svelte";
import { onVideoAdded } from "./api";

type Video = {
  id: string,
  videoElem: HTMLVideoElement,
}

let videos: Video[] = [];
let subsUploadOn = import.meta.env.DEV;

function reflow() {
  videos = videos.filter(({ videoElem }) => document.body.contains(videoElem));
}

function onBrowserMessage(request: BrowserRequest) {
  findVideos();
  subsUploadOn = !!request.showSubsUploadArea;
}

function findVideos() {
  videos = [...document.querySelectorAll("video")].map(videoElem => {
    if (!videoElem.dataset.videoToolsId) {
      videoElem.dataset.videoToolsId = crypto.randomUUID();
      videoElem.addEventListener("loadeddata", reflow);
      videoElem.addEventListener("play", reflow);
    }

    return {
      id: videoElem.dataset.videoToolsId,
      videoElem,
    };
  });
}

onVideoAdded(findVideos);

onMount(() => {
  findVideos();
  browser.runtime.onMessage.addListener(onBrowserMessage);
});

onDestroy(() => {
  videos.forEach(({ videoElem }) => {
    videoElem.removeEventListener("loadeddata", reflow);
    videoElem.removeEventListener("play", reflow);
  });
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

  &, :global(*), :global(*::before), :global(*::after) {
    box-sizing: border-box;
  }
}
</style>
