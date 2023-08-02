import "~/style/main.scss";
import Extension from "~/Extension.svelte";
import { polyfill } from "~/api";

polyfill();

export default new Extension({ target: document.body });
