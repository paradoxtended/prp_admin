<script lang="ts">
import { Locale } from '$lib/store/locale';
import Select from 'svelte-select';
import type { Command } from '$lib/typings/command';
import '../commands.scss';
import './Change_model.scss';
import { fetchNui } from '$lib/utils/fetchNui';
import { isEnvBrowser } from '$lib/utils/misc';

const { name, label, favorite, setFavorite, players, pedModels }: Command = $props();

let expanded = $state(false);
let allowOverflow = $state(false);
let imageExists = $state(false);

let data: { target?: { label: string; value: string }, model?: { label: string; value: string } } = $state({});

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

const models = pedModels.map(model => {
    return {
        label: `${model.Name.toLowerCase()} ${model.Label ? `[${model.Label}]` : ''}`,
        value: model.Name.toLowerCase()
    }
});

$effect(() => {
    if (expanded) {
        setTimeout(() => allowOverflow = true, 300);
    } else {
        allowOverflow = false;
    }
});

$effect(() => {
  if (data.model) {
    const img = new Image();
    img.src = `https://docs.fivem.net/peds/${data.model.value}.webp`;

    img.onload = () => imageExists = true;
    img.onerror = () => imageExists = false;
  } else {
    imageExists = false;
  }
});

function changeModel() {

}
</script>

<div class="command" style={`max-height: ${expanded ? '250px' : '50px'}; ${allowOverflow && 'overflow: visible'}`}>
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
    <div class="command-main">
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
        <p class="command-label">{Locale.model || 'Model'}</p>
        <Select
            bind:value={data.model}
            items={models}
            placeholder={Locale.select_model || 'Select model'}
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
        {#if imageExists}
            <img src={`https://docs.fivem.net/peds/${data.model.value}.webp`} alt="Ped image" />
        {:else if data.model}
            <div class="cross-icon">
                <div></div>
                <div></div>
            </div>
        {/if}
        <button onclick={() => changeModel()} class="command-button">{label}</button>
    </div>
</div>