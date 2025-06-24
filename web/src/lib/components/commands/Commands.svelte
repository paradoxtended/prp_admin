<script lang="ts">
import type { SvelteComponent } from "svelte";
import { Locale } from "$lib/store/locale";
import './commands.scss';
import type { Command } from '$lib/typings/command';

let commands = $state<Command[]>([
    { name: 'bring', label: Locale.bring || 'Bring', expandable: true }
]);

const components = import.meta.glob<{ default: typeof SvelteComponent }>('./**/*.svelte');
let loadedComponents = $state<Record<string, any>>({});

async function loadComponents(name: string) {
    const path = `./${name}/${name[0].toUpperCase() + name.slice(1)}.svelte`;
    if (components[path] && !loadedComponents[name]) {
        loadedComponents[name] = (await components[path]()).default;
    }
};

// svelte-ignore state_referenced_locally
for (const cmd of commands) {
    loadComponents(cmd.name);
};

function setFavorite(name: string, fav: boolean) {
    commands = commands.map(c =>
      c.name === name ? { ...c, favorite: fav } : c
    );
};

const { players } = $props();
</script>

<div class="commands">
    {#each commands as cmd}
        {#if loadedComponents[cmd.name]}
            <!-- svelte-ignore svelte_component_deprecated -->
            <svelte:component this={loadedComponents[cmd.name]} {...cmd} setFavorite={setFavorite} players={players} />
        {/if}
    {/each}
</div>