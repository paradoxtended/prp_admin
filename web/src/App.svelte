<script lang="ts">
import Commands from '$lib/components/commands/Commands.svelte';
import Header from '$lib/components/header/Header.svelte';
import Section from '$lib/components/sections/Section.svelte';
import { useNuiEvent } from '$lib/hooks/useNuiEvent';
import { Locale } from '$lib/store/locale';
import type { PlayerAdminData as Player } from '$lib/typings/player';
import { fetchNui } from '$lib/utils/fetchNui';
import { isEnvBrowser } from '$lib/utils/misc';

let visible = $state(isEnvBrowser());
let section = $state('commands');
let Players = $state<Player[] | null>();
let category = $state<string>('all');
let searchQuery = $state<string>('');

if (isEnvBrowser()) {
  const root = document.getElementById('app');

  // https://i.imgur.com/iPTAdYV.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
};

/*
useNuiEvent<{
  locale: { [key: string]: string }
}>('init', ({ locale }) => {
  for (const name in locale) Locale[name] = locale[name];
});

fetchNui('uiLoaded', {});
*/

useNuiEvent('openAdminPanel', (data: { players: Player[] }) => {
  Players = data.players;
  visible = true;
});

function onKeyDown(event: KeyboardEvent) {
  const key = event.key.toLowerCase();

  switch (key) {
    case 'escape': {
      visible = false;
      fetchNui('closeAdminPanel');
    }
  }
}
</script>

<svelte:window onkeydown={onKeyDown} />

{#if visible}
  <div class="container">
    <Header category={(cat: string) => category = cat} searchQuery={(query: string) => searchQuery = query} />
    <main>
      <Section setSection={(name: string) => section = name} />
      {#if section === 'commands'}
        <Commands players={Players} category={category} searchQuery={searchQuery} />
      {/if}
    </main>
  </div>
{/if}