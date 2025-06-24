<script lang="ts">
import { Locale } from '$lib/store/locale';
import Select from 'svelte-select';
import type { Command } from '$lib/typings/command';
import '../commands.scss';
import './bring.scss';
    import { fetchNui } from '$lib/utils/fetchNui';

const { name, label, favorite, expandable, boundedTo, setFavorite, players }: Command = $props();

let expanded = $state(false);
let allowOverflow = $state(false);

$effect(() => {
    if (expanded) {
        setTimeout(() => allowOverflow = true, 300);
    } else {
        allowOverflow = false;
    }
});

let selectedPlayer = $state(null);
// @todo fetch players from the server
const options = players.map(ply => {
    return {
        label: `(${ply.id}) ${ply.name} [${ply.steamId}]`,
        value: ply.id
    }
});

function bringPlayer() {
    fetchNui('bring', selectedPlayer?.value);
};
</script>

<div class="command" style={`max-height: ${expanded ? '200px' : '50px'}; ${allowOverflow && 'overflow: visible'}`}>
    <div class="cmd-header" onclick={() => expanded = !expanded}>
        <div class="leftSide">
            <i class="fa-solid fa-star" style={`opacity: ${favorite ? 1 : 0.4}`}
            onclick={(e) => { e.stopPropagation(); setFavorite(name, !favorite); }}></i>
            <p>{label}</p>
        </div>
        <div class={`${expandable ? 'expand' : 'static'}`}>
            {#if expandable}
                <i class={`${expanded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'}`}></i>
            {:else}
                <p>{Locale.bound_to || 'Bound To'}: <span>{boundedTo}</span></p>
            {/if}
        </div>
    </div>
    <div class="bring-main">
        <p class="bring-label">{Locale.target || 'Target'}</p>
        <Select
            bind:value={selectedPlayer}
            items={options}
            placeholder={Locale.select_player || 'Select Player'}
            --background = "radial-gradient(#71717a, #52525b)"
            --border = '1px solid #656a74'
            --border-focused = '1px solid #656a74'
            --border-hover = '1px solid #656a74'
            --border-radius = '2px'
            --width = '500px'
            --list-background = 'radial-gradient(#71717a, #474a52)'
            --list-border = '1px solid #656a74'
            --font-size = '13px'
            --height = '35px'
            --padding = '0 10px'
            --item-padding = '0 10px'
            --item-hover-bg = 'linear-gradient(#2abea3, #19473fa0)'
            --input-color = '#a8a8a8'
            --clear-select-focus-outline = 'none'
            --placeholder-color = "#bebebe"
            --list-empty-color = "#bebebe"
            --list-empty-padding = '10px'
            --item-is-active-bg = 'linear-gradient(#2abea3, #19473fa0)'
            --list-z-index = '10'
            --list-max-height = '200px'
        />
        <button onclick={() => bringPlayer()} class="command-button">{label}</button>
    </div>
</div>