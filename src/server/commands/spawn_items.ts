import { cache } from '@overextended/ox_lib/server';
import { IsPlayerAllowed } from '../utils';
import Framework from '../bridge/init';
import locale from '@common/locale';

onNet(`${cache.resource}:spawnItem`, (data: { target?: number; item: string; amount?: string; json?: string }) => {
  const allowed = IsPlayerAllowed(source);

  if (!allowed) return;

  const target: number = data?.target | source;
  const amount: number = parseInt(data?.amount) | 1;
  const metadata: Item | null = data.json ? JSON.parse(data.json) : null;
  const item: string = data.item;

  const player = Framework.getPlayerFromId(target);

  if (!player) return;

  player.addItem(item, amount, metadata);

  emitNet(
    `${cache.resource}:notify`,
    source,
    locale('notifications.spawn_item', amount, item, GetPlayerName(player.source)),
    'inform',
  );
});
