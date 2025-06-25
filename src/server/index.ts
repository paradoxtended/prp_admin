import Locale from 'locale';
import Config from '@common/config';
import { addCommand, cache } from '@overextended/ox_lib/server';
import './bridge/init';
import './commands/index';
import { IsPlayerAllowed } from './utils';

if (Config.Panel.Command) {
  addCommand(
    Config.Panel.Command,
    async (playerId) => {
      if (!playerId || !IsPlayerAllowed(playerId)) return;

      let players: Player[] = [];

      getPlayers().map((playerId) => {
        players.push({
          name: GetPlayerName(playerId),
          id: playerId,
          steamId:
            getPlayerIdentifiers(playerId).find((id) => id.includes('steam')) ||
            getPlayerIdentifiers(playerId).find((id) => id.includes('fivem')),
        });
      });

      emitNet(`${cache.resource}:openAdminPanel`, playerId, players);
    },
    {
      help: Locale('admin_panel_help'),
      restricted: Config.Panel.AllowedGroups,
    },
  );
};