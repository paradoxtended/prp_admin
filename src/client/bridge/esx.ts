export const Framework: SharedObjectClient = {
  name: '',
  object: null,
  isPlayerLoaded() {
    return false;
  },
  onPlayerLoaded() {
    return;
  },
  onPlayerLogout() {
    return;
  },
  getJob() {
    return false;
  },
  getJobGrade() {
    return undefined;
  },
  hasItem() {
    return false;
  },
  getIdentifier() {
    return undefined;
  },
  getCharacterName() {
    return '';
  },
  getInventory() {
    return [];
  },
};

if (GetResourceState('es_extended') === 'started') {
  const sharedObject = global.exports['es_extended'].getSharedObject();

  Framework.name = 'es_extended';
  Framework.object = sharedObject;

  Framework.isPlayerLoaded = () => sharedObject?.IsPlayerLoaded() || false;

  Framework.onPlayerLoaded = (cb) => {
    if (Framework.isPlayerLoaded()) cb();
    on('esx:playerLoaded', cb);
  };

  Framework.onPlayerLogout = (cb) => on('esx:onPlayerLogout', cb);

  Framework.getJob = () => (Framework.isPlayerLoaded() ? sharedObject?.GetPlayerData().job.name : false);

  Framework.getJobGrade = () => sharedObject?.GetPlayerData().job.grade;

  Framework.hasItem = (name: string) => (sharedObject?.GetPlayerData().inventory || []).some((i: any) => i.name === name);

  Framework.getIdentifier = () => sharedObject?.GetPlayerData().identifier;

  Framework.getCharacterName = () => {
    const data = sharedObject?.GetPlayerData();
    return `${data?.firstname || ''} ${data?.lastname || ''}`.trim();
  };

  Framework.getInventory = () => sharedObject?.GetPlayerData().inventory || [];

  // Sync PlayerData event
  on('esx:setPlayerData', (key: string, val: any) => {
    if (GetInvokingResource() === 'es_extended' && sharedObject) {
      (sharedObject.PlayerData as any)[key] = val;
    }
  });

  on('esx:playerLoaded', (xPlayer: PlayerDataClient) => {
    if (sharedObject) {
      sharedObject.PlayerData = xPlayer;
      sharedObject.PlayerLoaded = true;
    }
  });

  on('esx:onPlayerLogout', () => {
    if (sharedObject) {
      sharedObject.PlayerLoaded = false;
      sharedObject.PlayerData = {} as PlayerDataClient;
    }
  });
}
