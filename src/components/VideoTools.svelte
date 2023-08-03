<script lang="ts">
import "~/style/base.scss";
import { createVttBlob, setSubtitlesForVideo } from "~/api";
import UploadZone from "~/components/UploadArea.svelte";
import VideoSpeed from "~/components/VideoSpeed.svelte";

export let subsUploadOn: boolean;
export let videoElem: HTMLVideoElement;

let subtitles: string | null = null;

$: if (subtitles) {
  const blob = createVttBlob(subtitles);
  setSubtitlesForVideo(videoElem, blob);
  subsUploadOn = false;
}
</script>

<div
  class="VideoTools"
  style:width="{videoElem.clientWidth}px"
  style:height="{videoElem.clientHeight}px"
  style:left="{videoElem.offsetLeft}px"
  style:top="{videoElem.offsetTop}px"
>
  {#if subsUploadOn}
    <UploadZone
      on:upload={(event) => subtitles = event.detail}
      position="absolute"
      width="100%"
      height="100%"
      left="0"
      top="0"
    />
  {/if}
  <VideoSpeed {videoElem} />
</div>

<style lang="scss">
.VideoTools {
  position: absolute;
  pointer-events: none;

  :global(*) {
    pointer-events: all;
  }
}
</style>
