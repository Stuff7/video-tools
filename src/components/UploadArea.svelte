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
  opacity: 0.8;
  border: 2px dashed var(--VTExt__color-text);
  border-radius: var(--VTExt__radius-nm);
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  background: var(--VTExt__color-background);
  color: var(--VTExt__color-text);
  font-size: clamp(2rem, 8vw, 3rem);
  outline: 0;
  transition: border-color 0.1s, color 0.1s;

  &:focus, &:hover {
    border-color: var(--VTExt__color-accent);
    color: var(--VTExt__color-accent);
  }
}
</style>
