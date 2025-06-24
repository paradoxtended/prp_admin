import Config from '@common/config';
import Framework from './bridge/init';

export let IsPlayerAllowed = (id: number) => {
  const player = Framework.getPlayerFromId(id);

  if (!player?.hasOneOfGroups(Config.Panel.AllowedGroups)) return false;

  return true;
};
