<script lang="ts">
import { Locale } from '$lib/store/locale';
import Select from 'svelte-select';
import type { Command } from '$lib/typings/command';
import '../commands.scss';
import { fetchNui } from '$lib/utils/fetchNui';
import { isEnvBrowser } from '$lib/utils/misc';
import { slide } from 'svelte/transition';

const { name, label, favorite, setFavorite, players, items }: Command = $props();

let expanded = $state(false);
let allowOverflow = $state(false);

$effect(() => {
    if (expanded) {
        setTimeout(() => allowOverflow = true, 300);
    } else {
        allowOverflow = false;
    }
});

let data: { target?: number, item?: string, amount?: string, json?: string } = $state({});

const allPlayers = isEnvBrowser() ? [
    { label: "(154) koil [steam:154871384]", value: 154 },
    { label: "(245) xqc [steam:10107867748]", value: 245 },
    { label: "(675) buddha [steam:4121312310]", value: 675 },
    { label: "(789) saab [steam:45631237]", value: 789 },
    { label: "(978) yuki [steam:1456786]", value: 978 }
] : players.map(ply => {
    return {
        label: `(${ply.id}) ${ply.name} [${ply.steamId}]`,
        value: ply.id
    }
});

const allItems = isEnvBrowser() ? [
    { label: "hamburger [Hamburger]", value: 'hamburger' },
    { label: "water [Water]", value: 'water' },
    { label: "weapon_pistol [Pistol]", value: 'weapon_pistol' },
    { label: "ammo-9 [Ammo 9mm]", value: 'ammo-9' },
    { label: "money [Cash]", value: 'money' }
] : Object.keys(items).map(key => {
    return {
        label: `${key} [${items[key].label}]`,
        value: key
    };
}).sort((a, b) => a.label.localeCompare(b.label));

function spawnItem() {
    fetchNui('spawn_item', data);
}
</script>

<div class="command" style={`${allowOverflow && 'overflow: visible'}`}>
    <div class="cmd-header" onclick={() => expanded = !expanded}>
        <div class="leftSide">
            <i class="fa-solid fa-star" style={`opacity: ${favorite ? 1 : 0.4}`}
            onclick={(e) => { e.stopPropagation(); setFavorite(name, !favorite); }}></i>
            <p>{label}</p>
        </div>
        <div class="expand">
            <i class={`${expanded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'}`}></i>
        </div>
    </div>
    {#if expanded}
        <div class="command-main" transition:slide>
            <p class="command-label">{Locale.target || 'Target'} ({Locale.not_required || 'Not Required'})</p>
            <Select
                bind:value={data.target}
                items={allPlayers}
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
                --list-z-index = '100'
                --list-max-height = '200px'
            />
            <p class="command-label">{Locale.item || 'Item'}</p>
            <Select
                bind:value={data.item}
                items={allItems}
                placeholder={Locale.select_player || 'Select Item'}
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
                --list-z-index = '100'
                --list-max-height = '200px'
            />
            <p class="command-label">{Locale.amount || 'Amount'}</p>
            <input type="number" class="command-input" placeholder={Locale.search || 'Search'} oninput={(e: Event) => data.amount = (e.target as HTMLInputElement).value}>
            <p class="command-label">{Locale.json || 'Json'}</p>
            <input type="text" class="command-input" placeholder={Locale.search || 'Search'} oninput={(e: Event) => data.json = (e.target as HTMLInputElement).value}>
            <button onclick={() => spawnItem()} class="command-button">{label}</button>
        </div>
    {/if}
</div>