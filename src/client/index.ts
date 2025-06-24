import './commands/index';
import { cache } from '@overextended/ox_lib/client';
import './bridge/init';

onNet(`${cache.resource}:openAdminPanel`, (players: { name: string; id: string; steamId: string }[]) => {
  SetNuiFocus(true, true);

  SendNUIMessage({
    action: 'openAdminPanel',
    data: {
      players: players,
    },
  });
});

RegisterNuiCallback('closeAdminPanel', (data: null, cb: (data: unknown) => void) => {
  SetNuiFocus(false, false);
  cb({});
});
