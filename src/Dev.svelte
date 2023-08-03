<!-- svelte-ignore a11y-media-has-caption -->
<script lang="ts" context="module">
const videos = Array.from({ length: 4 }).map(crypto.randomUUID.bind(crypto));
</script>

<main>
  {#each videos as id (id)}
    <video
      controls
      src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
      poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
      width="620"
    />
  {/each}
</main>

<style lang="scss">
main {
  padding: calc(var(--VTExt__spacing-nm) * 3);
  display: flex;
  flex-wrap: wrap;
  gap: var(--VTExt__spacing-nm);
}
</style>
