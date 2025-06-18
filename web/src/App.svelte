<script lang="ts">
import { useNuiEvent } from '$lib/hooks/useNuiEvent';
import { fetchNui } from '$lib/utils/fetchNui';
import { debugData } from '$lib/utils/debugData';
import { isEnvBrowser } from '$lib/utils/misc';
import MenuWindow from '$lib/components/MenuWindow.svelte';
import type { AdminData } from '$lib/state/admin';

let visible = $state(false);
let admin = $state<AdminData>({
  nickname: '',
  role: ''
})

debugData<AdminData>([
  {
    action: 'openMenu',
    data: {
      nickname: 'Linden',
      role: 'admin'
    }
  }
]);

function animation(exit?: boolean) {
  const app = document.getElementById('admin-menu') as HTMLDivElement;

  if (app === null) return;

  app.style.animation = exit ? 'slideOut 500ms forwards' : 'slideIn 500ms forwards';

  if (exit)
    setTimeout(() => visible = false, 500);
}

useNuiEvent<AdminData>('openMenu', (data) => {
  admin = data;

  visible = true;
  setTimeout(() => animation(), 0); // Important to *Wait* 0s for animation to play
});

useNuiEvent('closeMenu', () => animation(true));

if (isEnvBrowser()) {
  const root = document.getElementById('app');

  // https://i.imgur.com/iPTAdYV.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

function onKeyDown(event: KeyboardEvent) {
  const key = event.key.toLowerCase();

  switch (key) {
    case 'escape': {
      return fetchNui('closeMenu');
    }
  }
}
</script>

<svelte:window onkeydown={onKeyDown}/>

{#if visible}
  <MenuWindow 
    visible={visible}
    admin={admin}
  />
{/if}