import { cache } from '@overextended/ox_lib/client';

RegisterNuiCallback('attach', async (player: string, cb?: NuiCb) => {
  if (!player) return;

  emitNet(`${cache.resource}:attach`, player);

  if (cb) cb(1);
});
