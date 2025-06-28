import { cache } from '@overextended/ox_lib/client';
import { Delay } from '../utils';

async function ResetSkin(cb?: NuiCb) {
  if (cb) cb(1);

  const maxHealth = GetEntityMaxHealth(cache.ped);
  const health = GetEntityHealth(cache.ped);

  let data: any = null;
  let sex: number = 0;

  await new Promise<void>((resolve) => {
    emit('skinchanger:getSkin', (skin: any) => {
      sex = skin.sex;
      data = skin;

      resolve();
    });
  });

  let model: number = sex === 1 ? GetHashKey('mp_f_freemode_01') : GetHashKey('mp_m_freemode_01');

  RequestModel(model);

  while (!HasModelLoaded(model)) await Delay(100);

  SetPlayerModel(cache.playerId, model);
  SetModelAsNoLongerNeeded(model);

  emit('skinchanger:loadSkin', data);

  SetPedMaxHealth(cache.ped, maxHealth);
  SetEntityHealth(cache.ped, health);
}

RegisterNuiCallback('reset_skin', ResetSkin);
