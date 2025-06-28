import { cache } from '@overextended/ox_lib/client';

export let favCommands: string[] | null;

RegisterNuiCallback('toggleFavoriteCmd', async (commandName: string, cb?: NuiCb) => {
  if (cb) cb(1);

  emitNet(`${cache.resource}:toggleFavoriteCmd`, commandName);
});

onNet(`${cache.resource}:favCommands`, (commands: string[]) => {
  favCommands = commands;
});
