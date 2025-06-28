<script lang="ts">
import { Locale } from '$lib/store/locale';
import '../commands.scss';
import { fetchNui } from '$lib/utils/fetchNui';

const { name, label, favorite, boundedTo, setFavorite } = $props();

function resetSkin() {
    fetchNui('reset_skin');
};
</script>

<div class="command">
    <div class='cmd-header' onclick={() => resetSkin()}>
        <div class="leftSide">
            <i class="fa-solid fa-star" style={`opacity: ${favorite ? 1 : 0.4}`}
            onclick={(e) => { e.stopPropagation(); setFavorite(name, !favorite); }}></i>
            <p>{label}</p>
        </div>
        <div class='static'>
            <p>{Locale.bound_to || 'Bound To'}: <span>{boundedTo}</span></p>
        </div>
    </div>
</div>