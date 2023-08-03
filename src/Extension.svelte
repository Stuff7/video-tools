<script lang="ts">
import { SHORTCUTS_ON_KEY, getShortcutsOn, sendToCurrentTab } from "~/api";

let enabled: boolean | null = null;
let focused = false;

getShortcutsOn(videoShortcutsOn => enabled = videoShortcutsOn);

$: if (enabled !== null) {
  browser.storage.local.set({ [SHORTCUTS_ON_KEY]: enabled }).catch((error) => {
    console.error(`Error saving ${SHORTCUTS_ON_KEY} status: ${error}`);
  });
}
</script>

<main class="VideoTools">
  <label class="checkbox" class:focused class:enabled>
    <input
      type="checkbox"
      bind:checked={enabled}
      on:focus={() => focused = true}
      on:blur={() => focused = false}
    >
    <p>SHORTCUTS <strong>{enabled ? "ON" : "OFF"}</strong></p>
  </label>
  <div class="divider" />
  <button on:click={() => sendToCurrentTab({ showSubsUploadArea: true })}>
    Upload Subtitles
  </button>
</main>

<style lang="scss">
.VideoTools {
  display: flex;
  flex-direction: column;
  gap: var(--VTExt__spacing-nm);
  background: var(--VTExt__color-background);
  color: var(--VTExt__color-text);
  width: 200px;
  padding: var(--VTExt__spacing-nm);

  .checkbox {
    border-radius: 20%;
    border: 3px solid var(--VTExt__color-text);
    cursor: pointer;
    position: relative;

    &:hover, &.focused, &.enabled {
      border-color: var(--VTExt__color-accent);
      color: var(--VTExt__color-accent);
    }

    input {
      opacity: 0;
      position: absolute;
      border-radius: inherit;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    p {
      display: flex;
      flex-direction: column;
      padding: var(--VTExt__spacing-nm);
      margin: var(--VTExt__spacing-nm);
      text-align: center;
      aspect-ratio: 2 / 1;
      border-radius: inherit;
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
    }

    input:checked + p {
      background: var(--VTExt__color-accent);
      color: var(--VTExt__color-background);
    }
  }

  .divider {
    width: 100%;
    height: 2px;
    background: var(--VTExt__color-text);
    margin-block: var(--VTExt__spacing-sm);
  }

  button {
    background: var(--VTExt__color-text);
    color: var(--VTExt__color-background);
    padding: var(--VTExt__spacing-nm);
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: var(--VTExt__radius-nm);
    border: 0;
    cursor: pointer;
      outline: 2px solid transparent;

    &:hover {
      background: var(--VTExt__color-accent);
    }

    &:active, &:focus {
      background: var(--VTExt__color-background);
      color: var(--VTExt__color-accent);
      outline-color: var(--VTExt__color-accent);
    }
  }
}
</style>
