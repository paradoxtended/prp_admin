<script lang="ts">
import { Locale } from '$lib/store/locale';
import './categories.scss'

interface Category {
    name: string;
    label?: string;
    active?: boolean;
}

let categories = $state<Category[]>([
    { name: 'all', label: Locale.all || 'All', active: true },
    { name: 'player', label: Locale.player || 'Player' },
    { name: 'utility', label: Locale.utility || 'Utility' },
    { name: 'user', label: Locale.user || 'User' }
])
</script>

<div class="categories">
    {#each categories as category}
        <p class={`${category.active && 'active'}`}
        onclick={() => categories = categories.map(c => ({ ...c, active: c.name === category.name }))}
        >{category.label.toUpperCase()}
        </p>
    {/each}
</div>