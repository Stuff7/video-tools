<script lang="ts">
import { SHORTCUTS_ON_KEY, sendToCurrentTab } from "~/api";

let enabled = false;
let focused = false;

browser.storage.local.get([SHORTCUTS_ON_KEY]).then(({ [SHORTCUTS_ON_KEY]: videoShortcutsOn }) => {
  if (typeof videoShortcutsOn === "boolean") {
    enabled = videoShortcutsOn;
  }
});

$: {
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
  gap: var(--spacing-nm);
  background: var(--color-background);
  color: var(--color-text);
  width: 200px;
  padding: var(--spacing-nm);

  .checkbox {
    border-radius: 20%;
    border: 3px solid var(--color-text);
    cursor: pointer;
    position: relative;

    &:hover, &.focused, &.enabled {
      border-color: var(--color-accent);
      color: var(--color-accent);
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
      padding: var(--spacing-nm);
      margin: var(--spacing-nm);
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
      background: var(--color-accent);
      color: var(--color-background);
    }
  }

  .divider {
    width: 100%;
    height: 2px;
    background: var(--color-text);
    margin-block: var(--spacing-sm);
  }

  button {
    background: var(--color-text);
    color: var(--color-background);
    padding: var(--spacing-nm);
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: var(--radius-nm);
    border: 0;
    cursor: pointer;
      outline: 2px solid transparent;

    &:hover {
      background: var(--color-accent);
    }

    &:active, &:focus {
      background: var(--color-background);
      color: var(--color-accent);
      outline-color: var(--color-accent);
    }
  }
}
</style>
