<script lang="ts">
import { Locale } from "$lib/store/locale";
import Categories from "../categories/Categories.svelte";
import './header.scss'

</script>

<div class="header">
    <div class="info">
        <p class="title">{Locale.admin_panel || 'Administrator Panel'}</p>
        <p class="description">{Locale.all_commands || 'All Commands'}</p>
    </div>
    <Categories />
    <div class="input-wrapper">
        <input type="text" placeholder={Locale.search || 'Search...'}>
        <i class="fa-solid fa-magnifying-glass"></i>
    </div>
    <div class="exit-wrapper">
        <p class="exit">{Locale.exit || 'Exit'}</p>
        <p>ESC</p>
    </div>
</div>