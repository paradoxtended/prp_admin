<script lang="ts">
import Commands from '$lib/components/commands/Commands.svelte';
import Header from '$lib/components/header/Header.svelte';
import Section from '$lib/components/sections/Section.svelte';
import { useNuiEvent } from '$lib/hooks/useNuiEvent';
import { Locale } from '$lib/store/locale';
import { fetchNui } from '$lib/utils/fetchNui';
import { isEnvBrowser } from '$lib/utils/misc';

let visible = $state(isEnvBrowser());
let section = $state('commands');

$effect(() => {
  if (visible) return;
});

if (isEnvBrowser()) {
  const root = document.getElementById('app');

  // https://i.imgur.com/iPTAdYV.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

useNuiEvent<{
  locale: { [key: string]: string }
}>('init', ({ locale }) => {
  for (const name in locale) Locale[name] = locale[name];
});

fetchNui('uiLoaded', {});
</script>

{#if visible}
  <div class="container">
    <Header />
    <main>
      <Section setSection={(name: string) => section = name} />
      {#if section === 'commands'}
        <Commands />
      {/if}
    </main>
  </div>
{/if}