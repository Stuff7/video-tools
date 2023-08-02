<script lang="ts">
import { scale } from "svelte/transition";
import { SHORTCUTS_ON_KEY } from "~/api";

let timeoutId = -1;
let visible = false;
let speed = 1;
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
    visible = true;
  } else if (key === "]") {
    speed = Math.min(10, speed + 0.25);
    increase = true;
    visible = true;
  }
}

$: document.querySelectorAll("video").forEach(video => video.playbackRate = speed);
$: if (visible) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    visible = false;
  }, 2e3);
}
</script>

<svelte:document on:keydown={adjustSpeed} />
{#if visible}
  <div class="VideoSpeed" class:increase transition:scale>
    {speed}
  </div>
{/if}

<style lang="scss">
.VideoSpeed {
  position: fixed;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  background: rgb(0,0,0,0.5);
  color: white;
  font: 1.5rem "Fira Sans", sans-serif;
  font-weight: bold;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  border: 1px solid rgb(255,255,255,0.5);
  border-radius: 5px;
  pointer-events: none;
  background: #8b000088;

  &.increase {
    background: #00640088;
  }
}
</style>
