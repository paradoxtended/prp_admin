import { Vector3 } from '@nativewrappers/fivem';
import { IsPlayerAllowed } from '../utils';
import Framework from '../bridge/init';
import { cache } from '@overextended/ox_lib/server';
import locale from '@common/locale';

onNet(`${cache.resource}:attach`, (playerId: number) => {
  const allowed = IsPlayerAllowed(source);

  if (!allowed) return false;

  const target = Framework.getPlayerFromId(playerId);
  const player = Framework.getPlayerFromId(source);

  if (!target || !player) return false;

  const peds = {
    admin: GetPlayerPed(player.source),
    target: GetPlayerPed(target.source),
  };

  const coords = Vector3.fromArray(GetEntityCoords(peds.target));

  SetEntityCoords(peds.admin, coords.x, coords.y, coords.z, true, false, true, false);

  emitNet(
    `${cache.resource}:notify`,
    source,
    locale('notifications.attach', GetPlayerName(playerId as unknown as string)),
    'inform',
  );
});
