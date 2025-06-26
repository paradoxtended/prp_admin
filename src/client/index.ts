import './commands/index';
import lib, { cache } from '@overextended/ox_lib/client';
import './bridge/init';
import './favoriteCmd';
import { cloaked } from './commands/index';
import { favCommands } from './favoriteCmd';
import locale from '@common/locale';

let Items: Item[] | null = null;

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

onNet(`${cache.resource}:notify`, Notify);

RegisterNuiCallback('uiLoaded', (_data: null, cb: NuiCb) => {
  emitNet(`${cache.resource}:fetchItems`);

  setTimeout(() => {
    SendNUIMessage({
      action: 'init',
      data: {
        items: Items
      }
    })
  }, 1000);

  Notify(locale('uiLoaded'), 'inform');

  cb(1);
});

RegisterNuiCallback('initCommands', (_data: null, cb: NuiCb) => {
  emitNet(`${cache.resource}:getFavoritesCmd`);

  const activeCommands: Record<string, boolean> = {};

  activeCommands.cloak = cloaked;

  const data: InitializingData = {
    favorites: favCommands,
    activeCommands: activeCommands
  };

  setTimeout(() => cb(data), 50)
});

onNet(`${cache.resource}:fetchItems`, (items: Item[]) => Items = items);