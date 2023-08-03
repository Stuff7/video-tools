<script lang="ts">
import { scale } from "svelte/transition";
import { SHORTCUTS_ON_KEY } from "~/api";

export let videoElem: HTMLVideoElement;
let speed = videoElem.playbackRate;
let timeoutId = -1;
let visible = false;
let increase = false;

async function adjustSpeed({ key }: KeyboardEvent) {
  const { [SHORTCUTS_ON_KEY]: videoShortcutsOn = true } = await browser.storage.local.get(SHORTCUTS_ON_KEY);

  if (!videoShortcutsOn) {
    return;
  }

  const activeTag = document.activeElement?.tagName;
  if (activeTag === "INPUT" || activeTag === "TEXTAREA") {
    return;
  }

  if (key === "[") {
    speed = Math.max(0.25, speed - 0.25);
    increase = false;
    show();
  } else if (key === "]") {
    speed = Math.min(10, speed + 0.25);
    increase = true;
    show();
  }
}

function show() {
  clearTimeout(timeoutId);
  visible = true;
  timeoutId = setTimeout(() => {
    visible = false;
  }, 2e3);
}

$: videoElem.playbackRate = speed;
</script>

<svelte:document on:keydown={adjustSpeed} />
{#if visible}
  <div class="VideoSpeed" class:increase transition:scale={{ duration: 200 }}>
    {speed}
  </div>
{/if}

<style lang="scss">
.VideoSpeed {
  position: absolute;
  left: 50%;
  translate: -50% 0;
  top: calc(var(--VTExt__spacing-nm) * 2);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  padding: var(--VTExt__spacing-nm);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.5rem;
  border: 2px solid rgb(255,255,255,0.5);
  border-radius: var(--VTExt__radius-nm);
  pointer-events: none;
  background: #8b0000AA;

  &.increase {
    background: #006400AA;
  }
}
</style>
