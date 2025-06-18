<script lang="ts">
import type { Tab } from '$lib/state/tabs';
import { cn } from '$lib/utils';
import Icon from '@iconify/svelte';

interface Props {
    data: Tab;
    onclick: Function;
}

const { data, onclick }: Props = $props();

</script>

<!-- svelte-ignore event_directive_deprecated -->
<div on:click={() => onclick(data.name)} class={cn('border-2 border-white w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer bg-gray-500/15 hover:border-lime-500 hover:bg-lime-500/10 transition-all', 
            data.isActive && 'border-lime-500 bg-lime-500/10')}>
    {#if data.icon.startsWith('material-symbols') }
        <Icon icon={data.icon} class="text-2xl" />
    {:else}
        <i class="fa-solid fa-{data.icon}"></i>
    {/if}
</div>