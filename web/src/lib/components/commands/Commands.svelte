<script lang="ts">
import type { SvelteComponent } from "svelte";
import { Locale } from "$lib/store/locale";
import './commands.scss';
import type { Command } from '$lib/typings/command';
import { fetchNui } from "$lib/utils/fetchNui";
import { onMount } from 'svelte';

let commands = $state<Command[]>([
    { name: 'bring', label: Locale.bring || 'Bring', category: 'player', expandable: true },
    { name: 'attach', label: Locale.attach || 'Attach', category: 'player', expandable: true }
]);

const components = import.meta.glob<{ default: typeof SvelteComponent }>('./**/*.svelte');
let loadedComponents = $state<Record<string, any>>({});

async function loadComponents(name: string) {
    const path = `./${name}/${name[0].toUpperCase() + name.slice(1)}.svelte`;
    if (components[path] && !loadedComponents[name]) {
        loadedComponents[name] = (await components[path]()).default;
    }
};

$effect(() => {
    for (const cmd of commands) {
        loadComponents(cmd.name);
    };
});

function setFavorite(name: string, fav: boolean) {
    fetchNui('toggleFavoriteCmd', name);

    commands = commands.map(c =>
      c.name === name ? { ...c, favorite: fav } : c
    );
};

/*
onMount(async () => {
  const favorites = await fetchNui('getFavoritesCmd');

  if (favorites) {
    favorites.map((fav: string) => {
        commands = commands.map(cmd => {
            return {
                ...cmd,
                favorite: cmd.name.includes(fav)
            }
        })
    })
  }
});
*/

const { players, category, searchQuery } = $props();

let matchingCommands = $state<Command[] | undefined>();
$effect(() => {
    matchingCommands = commands.filter(cmd => {
        const matchCategory = category === 'all' || cmd.category === category;
        const matchQuery = !searchQuery || cmd.label.toLowerCase().includes(searchQuery.toLowerCase());

        return matchCategory && matchQuery;
    })
    .sort((a, b) => {
        // 1 = favorite
        return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
    });
});

</script>

<div class="commands">
    {#each matchingCommands as cmd}
        {#if loadedComponents[cmd.name]}
            <!-- svelte-ignore svelte_component_deprecated -->
            <svelte:component this={loadedComponents[cmd.name]} {...cmd} setFavorite={setFavorite} players={players} />
        {/if}
    {/each}
</div>