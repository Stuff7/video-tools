import Content from "~/Content.svelte";
import { polyfill } from "~/api";

polyfill();

if (import.meta.env.PROD) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.dataset.videoToolsExt = "";
  link.href = browser.runtime.getURL("content/style.css");
  document.head.appendChild(link);
}

let content: Content | null = null;

function mount() {
  content?.$destroy();
  content = new Content({ target: document.fullscreenElement || document.body });
}

document.addEventListener("fullscreenchange", mount);
mount();
