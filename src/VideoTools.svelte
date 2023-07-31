<script lang="ts">
import { searchSubtitles, sendToCurrentTab } from "~/api";
import UploadZone from "./components/UploadArea.svelte";

let timeoutId = -1;
let error = "";
let subtitles: string | null = null;

function search(event: Event) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    if (event.target instanceof HTMLInputElement) {
      subtitles = await searchSubtitles(event.target.value);
    } else if (event instanceof CustomEvent) {
      subtitles = event.detail as string;
    }

    if (!subtitles) {
      error = "No subtitles";
      return;
    }
    await sendToCurrentTab({ subtitles });
    console.log("SENT", subtitles);
  }, 400);
}
</script>

<main class="VideoTools">
  <input
    type="text"
    placeholder="Search subtitles..."
    on:input={search}
  >
  <p class="divider">OR</p>
  <UploadZone on:upload={search} />
  {#if error}
    <p class="error">
      { error }
    </p>
  {/if}
  {#if subtitles}
    <pre>{subtitles}</pre>
  {/if}
</main>

<style lang="scss">
.VideoTools {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-nm);
  background: var(--color-background);
  color: var(--color-text);
  width: 300px;
  padding: var(--spacing-nm);

  input {
    border: 0;
    border-radius: var(--radius-nm);
    padding: var(--spacing-nm);
    font-size: 1rem;
    &:focus {
      outline: 2px solid var(--color-accent);
    }
  }

  .divider {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--spacing-nm);
    align-items: center;

    &::after, &::before {
      content: "";
      background: var(--color-text);
      height: 2px;
    }
  }

  .error {
    color: var(--color-error);
  }

  pre {
    max-height: 10rem;
    overflow: hidden auto;
  }
}
</style>
