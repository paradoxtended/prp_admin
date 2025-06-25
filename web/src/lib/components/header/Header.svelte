<script lang="ts">
import { Locale } from "$lib/store/locale";
import Categories from "../categories/Categories.svelte";
import './header.scss'

const { category, searchQuery } = $props();
</script>

<div class="header">
    <div class="info">
        <p class="title">{Locale.admin_panel || 'Administrator Panel'}</p>
        <p class="description">{Locale.all_commands || 'All Commands'}</p>
    </div>
    <Categories category={category} />
    <div class="input-wrapper">
        <input type="text" placeholder={Locale.search || 'Search...'} oninput={(e: Event) => searchQuery((e.target as HTMLInputElement).value)}>
        <i class="fa-solid fa-magnifying-glass"></i>
    </div>
    <div class="exit-wrapper">
        <p class="exit">{Locale.exit || 'Exit'}</p>
        <p>ESC</p>
    </div>
</div>