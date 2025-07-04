<script lang="ts">
import Commands from '$lib/components/commands/Commands.svelte';
import Header from '$lib/components/header/Header.svelte';
import Section from '$lib/components/sections/Section.svelte';
import { useNuiEvent } from '$lib/hooks/useNuiEvent';
import { Locale } from '$lib/store/locale';
import type { Item } from '$lib/typings/item';
import type { PedModel, RawPedModel } from '$lib/typings/models';
import type { PlayerAdminData as Player } from '$lib/typings/player';
import { debugData } from '$lib/utils/debugData';
import { fetchNui } from '$lib/utils/fetchNui';
import { isEnvBrowser } from '$lib/utils/misc';

let visible = $state(false);
let section = $state('commands');
let category = $state<string>('all');
let searchQuery = $state<string>('');

let Players = $state<Player[] | null>();
let Items = $state<Record<string, Item>>();
let PedModels = $state<PedModel[]>([]);

debugData([
  {
    action: 'init',
    data: {}
  }
]);

debugData([
  {
    action: 'openAdminPanel',
    data: {}
  }
], 1500);

if (isEnvBrowser()) {
  const root = document.getElementById('app');

  // https://i.imgur.com/iPTAdYV.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
};

async function FetchPedModels() {
  const headers = {};

  const response = await fetch('https://raw.githubusercontent.com/DurtyFree/gta-v-data-dumps/refs/heads/master/peds.json', {
    headers: headers
  });

  if (response.status === 304) {
    return;
  }

  if (!response.ok) throw new Error(response.statusText);

  await response.json().then((data: RawPedModel[]) => {
    PedModels = data.map(model => ({
      Name: model.Name,
      Label: model.TranslatedDirectorName?.English,
      Image: `https://docs.fivem.net/peds/${model.Name.toLowerCase()}.webp`
    }));
  });
}

useNuiEvent<{
  locale: { [key: string]: string };
  items: Record<string, Item>;
}>('init', ({ locale, items }) => {
  for (const name in locale) Locale[name] = locale[name];
  Items = items;

  FetchPedModels().then(async () => {});
});

fetchNui('uiLoaded');

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
        <Commands players={Players} category={category} searchQuery={searchQuery} items={Items} pedModels={PedModels} />
      {/if}
    </main>
  </div>
{/if}