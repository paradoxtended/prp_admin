import { cache } from '@overextended/ox_lib/client';

RegisterNuiCallback('bring', async (player: string, cb?: NuiCb) => {
  if (!player) return;

  emitNet(`${cache.resource}:bring`, player);

  if (cb) cb(1);
});
