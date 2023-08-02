<script lang="ts">
import { createEventDispatcher } from "svelte";
import { srtToWebVTT } from "~/api";

export let width: string | null = null;
export let height: string | null = null;
export let left: string | null = null;
export let top: string | null = null;
export let position: string | null = null;
let fileContent = "";

const dispatch = createEventDispatcher<{ upload: string }>();

function handleDrop(event: DragEvent) {
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  if (file) {
    readFile(file);
  }
}

function handleFileInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target?.files?.[0];
  if (file) {
    readFile(file);
  }
}

async function readFile(file: File) {
  const text = await file.text();
  fileContent = srtToWebVTT(text);
  dispatch("upload", fileContent);
}
</script>

<button
  class="UploadArea"
  style:width
  style:height
  style:left
  style:top
  style:position
  on:drop={handleDrop}
  on:dragover={(event) => event.preventDefault()}
  on:click={() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".srt";
    input.style.display = "none";
    input.addEventListener("change", handleFileInput);
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  }}
>
  <p>Upload an srt file here</p>
</button>

<style lang="scss">
.UploadArea {
  opacity: 0.75;
  border: 2px dashed var(--color-text);
  border-radius: var(--radius-nm);
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  background: var(--color-background);
  color: var(--color-text);
  font-size: clamp(2rem, 8vw, 4rem);
  outline: 0;

  &:focus {
    border-color: var(--color-accent);
  }
}
</style>
