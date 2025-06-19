<script lang="ts">
import { cn } from '$lib/utils';
import { fetchNui } from '$lib/utils/fetchNui';
import Tabs from './Tabs.svelte';
import type { Tab } from '$lib/state/tabs';
import * as Routes from './tabs/routes';
import type { AdminData } from '$lib/state/admin';

interface Props {
    visible: boolean;
    admin?: AdminData;
}

const { visible, admin }: Props = $props();

let tabs = $state<Tab[]>([
    { name: 'dashboard', icon: 'material-symbols:home-outline-rounded', isActive: true, props: {
        admin,
        allPlayers: () => tabs = tabs.map(t => ({ ...t, isActive: t.name === 'players' }))
    }},
    { name: 'players', icon: 'magnifying-glass' }
]);

let activeTab = $derived(() => tabs.find(t => t.isActive));

let componentMap = $derived(() => {
    const map: Record<string, typeof Routes[keyof typeof Routes]> = {};
    for (const [key, component] of Object.entries(Routes)) {
        map[key.toLowerCase()] = component;
    }
    return map;
});

let activeComponent = $derived(() => {
    const tab = activeTab();
    return tab ? componentMap()[tab?.name] : null;
});

</script>

<div class={cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/4 px-12 py-3 rounded border border-gray-500 bg-gradient-to-r from-black/90 to-lime-950/90', !visible && 'hidden')} id='admin-menu'>
    <div class="flex items-center justify-between text-white">
        <img src="./public/logo.png" class="w-20 h-20">
        <i class="fa-regular fa-circle-xmark text-xl cursor-pointer transition-all hover:text-lime-500 hover:border-lime-500" onclick={() => fetchNui('closeMenu')}></i>
    </div>

    <div class="mt-5 flex">
        <div class="w-28 flex flex-col gap-3 h-[650px]">
            {#each tabs as tab}
                <Tabs data={tab} onclick={(data: string) => tabs = tabs.map(t => ({ ...t, isActive: t.name == data }))} />
            {/each}
        </div>

        <div class="w-full">
            {#if activeComponent()}
                <!-- svelte-ignore svelte_component_deprecated -->
                <svelte:component this={activeComponent()} {...(activeTab()?.props || {})} />
            {/if}
        </div>
    </div>
</div>