import { Vector3 } from '@nativewrappers/fivem';
import { onClientCallback } from '@overextended/ox_lib/server';
import { IsPlayerAllowed } from '../utils';
import Framework from '../bridge/init';

onClientCallback('np-admin:bring', async (playerId: any, targetId: number) => {
  const allowed = IsPlayerAllowed(playerId);

  if (!allowed) return false;

  const target = Framework.getPlayerFromId(targetId);
  const player = Framework.getPlayerFromId(playerId);

  const peds = {
    admin: GetPlayerPed(player.source),
    target: GetPlayerPed(target.source)
  }

  if (!target || !player) return false;

  const coords = Vector3.fromArray(GetEntityCoords(peds.admin));

  SetEntityCoords(peds.target, coords.x, coords.y, coords.z, true, false, true, false);

  return GetPlayerName(target.source);
});
