export let Framework = {} as SharedObjectClient;

if (GetResourceState('qb-core') === 'started') {
  const sharedObject = global.exports['qb-core'].GetCoreObject();

  Framework.name = 'qb-core';
  Framework.object = sharedObject;

  Framework.isPlayerLoaded = () => !!sharedObject.Functions.GetPlayerData().citizenid;

  Framework.onPlayerLoaded = (cb) => {
    if (Framework.isPlayerLoaded()) cb();
    on('QBCore:Client:OnPlayerLoaded', cb);
  };

  Framework.onPlayerLogout = (cb) => {
    on('QBCore:Client:OnPlayerUnload', cb);
  };

  Framework.getJob = () => {
    const data = sharedObject.Functions.GetPlayerData();
    return data?.job?.name || false;
  };

  Framework.getJobGrade = () => {
    return sharedObject.Functions.GetPlayerData().job.grade.level;
  };

  Framework.hasItem = (name: string) => {
    if (GetResourceState('ox_inventory') === 'started') {
      return global.exports.ox_inventory.GetItemCount(name) > 0;
    }
    if (GetResourceState('codem-inventory') === 'started') {
      const inventory = global.exports['codem-inventory'].GetClientPlayerInventory() || [];
      return inventory.some((i: any) => i.name === name);
    }
    return !!sharedObject.Functions.HasItem(name);
  };

  Framework.getInventory = () => {
    if (GetResourceState('codem-inventory') === 'started') {
      return global.exports['codem-inventory'].GetClientPlayerInventory() || [];
    }
    return sharedObject.Functions.GetPlayerData().items || [];
  };

  Framework.getIdentifier = () => {
    return sharedObject.Functions.GetPlayerData().citizenid;
  };

  Framework.getCharacterName = () => {
    const data = sharedObject.Functions.GetPlayerData();
    return `${data?.charinfo?.firstname || ''} ${data?.charinfo?.lastname || ''}`.trim();
  };

  Framework.getStatus = (type: 'hunger' | 'thirst') => {
    const playerState = sharedObject.Functions.GetPlayerData();
    // compatibility for ESX-style status (0-10000)
    return playerState.Functions.GetMetaData(type) * 10000;
  };

  Framework.setStatus = (values: Record<'hunger' | 'thirst', number>) => {
    const playerState = sharedObject.Functions.GetPlayerData();

    for (const [name, rawValue] of Object.entries(values) as ['hunger' | 'thirst', number][]) {
        let value = rawValue;

        // scale down if using ESX-style large numbers
        if (value > 100 || value < -100) {
            value *= 0.0001;
        }

        const current = playerState.Functions.GetMetaData(name);
        playerState.Functions.SetMetaData(name, current + value);
    }
  };
}
