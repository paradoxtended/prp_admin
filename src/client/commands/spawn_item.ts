import { cache } from '@overextended/ox_lib/client';

RegisterNuiCallback(
  'spawn_item',
  (data: { target?: number; item?: { label: string; value: string }; amount?: string; json?: string }, cb?: NuiCb) => {
    if (cb) cb(1);

    if (!data.item) return;

    emitNet(`${cache.resource}:spawnItem`, { ...data, item: data.item.value });
  },
);
