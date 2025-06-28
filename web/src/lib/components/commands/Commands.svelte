<script lang="ts">
import type { SvelteComponent } from "svelte";
import { Locale } from "$lib/store/locale";
import './commands.scss';
import type { Command } from '$lib/typings/command';
import { fetchNui } from "$lib/utils/fetchNui";
import { onMount } from 'svelte';

let commands = $state<Command[]>([
    { name: 'bring', label: Locale.bring || 'Bring', category: 'player', expandable: true },
    { name: 'attach', label: Locale.attach || 'Attach', category: 'player', expandable: true },
    { name: 'cloak', label: Locale.cloak || 'Cloak', category: 'user' },
    { name: 'spawn_item', label: Locale.spawn_item || 'Spawn Item', category: 'utility', expandable: true },
    { name: 'change_model', label: Locale.change_model || 'Change Model', category: 'utility', expandable: true },
    { name: 'reset_skin', label: Locale.reset_skin || 'Reset Skin', category: 'utility' }
]);

const { players, category, searchQuery, items, pedModels } = $props();

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
onMount(async () => {
  const data: {
    favorites: string[];
    activeCommands: Record<string, boolean>;
  } = await fetchNui('initCommands');

  if (data.favorites) {
    data.favorites.map((fav: string) => {
        commands = commands.map(cmd => {
            return {
                ...cmd,
                favorite: cmd.name.includes(fav)
            }
        })
    })
  };

  if (data.activeCommands) {
    commands = commands.map(cmd => {
        return {
            ...cmd,
            active: data.activeCommands[cmd.name]
        }
    })
  }
});

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

function setActive(commandName: string) {
    commands = commands.map(cmd => 
        cmd.name === commandName ? {...cmd, active: !cmd.active} : cmd
    )
};
</script>

<div class="commands">
    {#each matchingCommands as cmd}
        {#if loadedComponents[cmd.name]}
            <!-- svelte-ignore svelte_component_deprecated -->
            <svelte:component this={loadedComponents[cmd.name]} {...cmd} setFavorite={setFavorite} players={players} setActive={setActive} items={items} pedModels={pedModels} />
        {/if}
    {/each}
</div>