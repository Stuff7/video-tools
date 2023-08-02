/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "*.svelte" {
  import type { ComponentType } from "svelte";
  const component: ComponentType;
  export default component;
}

declare type BrowserRequest = {
  showSubsUploadArea: boolean,
  subtitles: string,
}
