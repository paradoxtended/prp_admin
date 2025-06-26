import { cache } from '@overextended/ox_lib/client';

let favCommands: string[] | null;

RegisterNuiCallback('toggleFavoriteCmd', async (commandName: string, cb?: NuiCb) => {
  if (cb) cb(1);

  emitNet(`${cache.resource}:toggleFavoriteCmd`, commandName);
});

RegisterNuiCallback('getFavoritesCmd', async (_data: unknown, cb: NuiCb) => {
  emitNet(`${cache.resource}:getFavoritesCmd`);
  
  // Delay 50ms, so the favorite commands will get fetched
  setTimeout(() => cb(favCommands), 50);
});

onNet(`${cache.resource}:favCommands`, (commands: string[]) => {
  favCommands = commands;
});