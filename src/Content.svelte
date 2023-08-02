<script lang="ts">
import "~/style/base.scss";
import { onDestroy, onMount } from "svelte";
import { createVttBlob, setSubtitlesForVideo } from "~/api";
import UploadZone from "~/components/UploadArea.svelte";
import VideoSpeed from "~/components/VideoSpeed.svelte";

let subtitles: string | null = null;

$: if (subtitles) {
  const blob = createVttBlob(subtitles);
  document.querySelectorAll("video").forEach(v => {
    setSubtitlesForVideo(v, blob);
  });
  subsUploadVisible = false;
}

let subsUploadVisible = import.meta.env.DEV;

function onBrowserMessage(request: BrowserRequest) {
  subsUploadVisible = !!request.showSubsUploadArea;
  if (request.subtitles) {
    subtitles = request.subtitles;
  }
}

onMount(() => browser.runtime.onMessage.addListener(onBrowserMessage));
onDestroy(() => browser.runtime.onMessage.removeListener(onBrowserMessage));
</script>

<div class="Content">
  {#if subsUploadVisible}
    <UploadZone on:upload={(event) => subtitles = event.detail} width="100%" height="100%" />
  {/if}
  <VideoSpeed />
</div>

<style lang="scss">
.Content {
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

  :global(*) {
    pointer-events: all;
  }
}
</style>
