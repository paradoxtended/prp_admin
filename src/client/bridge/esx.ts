export let Framework = {} as SharedObjectClient;

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

  Framework.hasItem = (name: string) =>
    (sharedObject?.GetPlayerData().inventory || []).some((i: any) => i.name === name);

  Framework.getIdentifier = () => sharedObject?.GetPlayerData().identifier;

  Framework.getCharacterName = () => {
    const data = sharedObject?.GetPlayerData();
    return `${data?.firstname || ''} ${data?.lastname || ''}`.trim();
  };

  Framework.getInventory = () => sharedObject?.GetPlayerData().inventory || [];

  Framework.getStatus = async (type: 'hunger' | 'thirst') => {
    return new Promise((resolve) => {
        emit('esx_status:getStatus', name, (status: { val: number }) => {
            resolve(status.val);
        });
    });
  };

  Framework.setStatus = (values: Record<'hunger' | 'thirst', number>) => {
    for (const [name, value] of Object.entries(values) as ['hunger' | 'thirst', number][]) {
        if (value > 0) {
            emit('esx_status:add', name, value);
        } else {
            emit('esx_status:remove', name, -value);
        }
    }
  };

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
