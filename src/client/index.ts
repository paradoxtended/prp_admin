import './commands/index';
import lib, { cache } from '@overextended/ox_lib/client';
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
  if (cb) cb(1);
});

export function Notify(content: string, notifyType: 'success' | 'error' | 'inform') {
  lib.notify({
     description: content,
     type: notifyType 
  })
};

onNet(`${cache.resource}:notify`, Notify)