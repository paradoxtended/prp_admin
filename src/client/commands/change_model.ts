import { cache } from '@overextended/ox_lib/client';
import { Notify } from '..';
import locale from '@common/locale';
import { Delay } from '../utils';

RegisterNuiCallback(
  'change_model',
  async (data: { target?: { label: string; value: any }; model: { label: string; value: any } }, cb: NuiCb) => {
    cb(1);

    if (!data.model) {
      return;
    }

    const target: number = data.target?.value ? data.target.value : cache.serverId;
    const model: number = GetHashKey(data.model.value);

    emitNet(`${cache.resource}:change_model`, target, model);
  },
);

onNet(`${cache.resource}:change_model`, async (model: number) => {
  if (IsModelInCdimage(model) && IsModelValid(model)) {
    RequestModel(model);

    while (!HasModelLoaded(model)) await Delay(100);

    SetPlayerModel(cache.playerId, model);

    Notify(locale('notifications.change_model', model), 'inform');
    SetModelAsNoLongerNeeded(model);
  }
});
