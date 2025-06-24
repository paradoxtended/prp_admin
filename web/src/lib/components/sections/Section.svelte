<script lang="ts">
import { Locale } from '$lib/store/locale';
import './section.scss';

let { setSection } = $props<{ setSection: (name: string) => void }>();

interface Section {
    name: string;
    label: string;
    active?: boolean;
    color: string;
    icon: string
};

let sections = $state<Section[]>([
    { name: 'commands', label: Locale.commands || 'Commands', active: true, color: '#1eeec4', icon: 'fa-solid fa-wand-sparkles' }
]);
</script>

<section>
    {#each sections as section}
        <div class="section" style={`border: 1px solid ${section.color}; background: linear-gradient(${section.color + 10}, ${section.color + 60});`}
        onclick={() => setSection(section.name)}>
            <i class={section.icon} style={`color: ${section.color}; filter: drop-shadow(0 0 7px ${section.color})`}></i>
            <p>{section.label}</p>
        </div>
    {/each}
</section>