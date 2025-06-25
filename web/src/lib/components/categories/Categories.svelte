<script lang="ts">
import { Locale } from '$lib/store/locale';
import './categories.scss';

const { category } = $props();

interface Category {
    name: string;
    label?: string;
    active?: boolean;
};

let categories = $state<Category[]>([
    { name: 'all', label: Locale.all || 'All', active: true },
    { name: 'player', label: Locale.player || 'Player' },
    { name: 'utility', label: Locale.utility || 'Utility' },
    { name: 'user', label: Locale.user || 'User' }
]);

let categoriesEl: HTMLElement;
let bgSliderEl: HTMLElement;
let sliderEl: HTMLElement;

function setActive(name: string) {
    categories = categories.map(c => ({ ...c, active: c.name === name }));
    category(categories.find(c => c.active).name);
};

function updateSlider() {
    if (!categoriesEl || !bgSliderEl || !sliderEl) return;

    const activeIndex = categories.findIndex(c => c.active);
    if (activeIndex === -1) return;

    const pEls = categoriesEl.querySelectorAll('p');
    const activeEl = pEls[activeIndex] as HTMLElement;

    if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        const containerRect = categoriesEl.getBoundingClientRect();

        const width = rect.width;
        const offsetLeft = rect.left - containerRect.left;

        bgSliderEl.style.width = width + 'px';
        bgSliderEl.style.transform = `translateX(${offsetLeft}px)`;

        sliderEl.style.width = width + 'px';
        sliderEl.style.transform = `translateX(${offsetLeft}px)`;
    }
};

$effect(() => {
    updateSlider();
});
</script>

<div class="categories" bind:this={categoriesEl}>
    {#each categories as category}
        <p 
            class={category.active ? 'active' : ''}
            onclick={() => setActive(category.name)}
        >
            {category.label.toUpperCase()}
        </p>
    {/each}
    <div class="bg-slider" bind:this={bgSliderEl}></div>
    <div class="slider" bind:this={sliderEl}></div>
</div>