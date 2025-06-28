import { cache } from '@overextended/ox_lib/server';
import { IsPlayerAllowed } from '../utils';

onNet(`${cache.resource}:change_model`, (target: number, model: number) => {
  const allowed = IsPlayerAllowed(source);

  if (!allowed) return;

  emitNet(`${cache.resource}:change_model`, target, model);
});
