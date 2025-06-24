<script lang="ts">
import { Locale } from '$lib/store/locale';
import Select from 'svelte-select';
import type { Command } from '$lib/typings/command';
import '../commands.scss';
import './bring.scss';

const { name, label, favorite, expandable, boundedTo, setFavorite }: Command = $props();

let expanded = $state(false);

let selected = $state(null);
// @todo fetch players from the server
const options = [
    { label: '(357) koil [STEAM: 015478856]', value: 357 },
    { label: '(142) buddha [STEAM: 1234534]', value: 142 },
    { label: '(15) xqc [STEAM: 1231385745634]', value: 15 },
    { label: '(678) saab [STEAM: 123874534]', value: 678 },
    { label: '(154) np [STEAM: 1238575364]', value: 154 },
    { label: '(154) np [STEAM: 1238575364]', value: 154 },
    { label: '(154) np [STEAM: 1238575364]', value: 154 },
    { label: '(154) np [STEAM: 1238575364]', value: 154 },
    { label: '(154) np [STEAM: 1238575364]', value: 154 },
    { label: '(154) np [STEAM: 1238575364]', value: 154 },
    { label: '(154) np [STEAM: 1238575364]', value: 154 },
    { label: '(154) np [STEAM: 1238575364]', value: 154 },
    { label: '(154) np [STEAM: 1238575364]', value: 154 },
];

let floatingConfig = {
    strategy: 'fixed'
};

function bringPlayer() {
    console.log(selected.value)
};
</script>

<div class="command" style={`max-height: ${expanded ? '200px' : '50px'}`}>
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
            {floatingConfig}
            bind:value={selected}
            items={options}
            placeholder={Locale.select_player || 'Select Player'}
            class="bring-input"
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