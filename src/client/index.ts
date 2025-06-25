import './commands/index';
import { cache } from '@overextended/ox_lib/client';
import './bridge/init';
import './favoriteCmd';

onNet(`${cache.resource}:openAdminPanel`, (players: { name: string; id: string; steamId: string }[], favoritesCmd: string[]) => {
  SetNuiFocus(true, true);

  SendNUIMessage({
    action: 'openAdminPanel',
    data: {
      players: players,
      favoritesCmd: favoritesCmd
    },
  });
});

RegisterNuiCallback('closeAdminPanel', (_data: null, cb: (data: unknown) => void) => {
  SetNuiFocus(false, false);
  cb(1);
});
