export let Framework: SharedObjectServer = null;

if (GetResourceState('es_extended') === 'started') {
  const sharedObject = global.exports['es_extended'].getSharedObject();

  const playerPrototype = {
    source: 0 as number,
    xPlayer: null as any,

    hasGroup(name: string): boolean {
      return this.xPlayer.getGroup() === name;
    },

    hasOneOfGroups(groups: Record<string, boolean> | string[]): boolean {
      if (Array.isArray(groups)) {
        return !!groups.includes(this.xPlayer.getGroup());
      } else {
        return !!groups[this.xPlayer.getGroup()];
      }
    },

    addItem(name: string, count = 1, metadata?: any): boolean {
      if (!this.canCarryItem(name, count)) return false;

      if (GetResourceState('codem-inventory') === 'started') {
        return global.exports['codem-inventory'].AddItem(this.source, name, count, null, metadata);
      } else if (GetResourceState('ox_inventory') === 'started') {
        return global.exports.ox_inventory.AddItem(this.source, name, count, metadata);
      } else {
        this.xPlayer.addInventoryItem(name, count);
        return true;
      }
    },

    removeItem(name: string, count = 1): void {
      if (GetResourceState('codem-inventory') === 'started') {
        global.exports['codem-inventory'].RemoveItem(this.source, name, count);
      } else {
        this.xPlayer.removeInventoryItem(name, count);
      }
    },

    canCarryItem(name: string, count: number): boolean {
      return this.xPlayer.canCarryItem(name, count);
    },

    getItemCount(name: string): number {
      if (GetResourceState('codem-inventory') === 'started') {
        return global.exports['codem-inventory'].GetItemsTotalAmount(this.source, name);
      }
      return this.xPlayer.getInventoryItem(name)?.count || 0;
    },

    hasItem(name: string): boolean {
      return this.getItemCount(name) > 0;
    },

    getAccountMoney(account: string): number {
      return this.xPlayer.getAccount(account).money;
    },

    addAccountMoney(account: string, amount: number): void {
      this.xPlayer.addAccountMoney(account, amount);
    },

    removeAccountMoney(account: string, amount: number): void {
      this.xPlayer.removeAccountMoney(account, amount);
    },

    getJob(): string {
      return this.xPlayer.getJob().name;
    },

    getJobGrade(): number {
      return this.xPlayer.getJob().grade;
    },

    setJob(name: string, grade: number): void {
      this.xPlayer.setJob(name, grade);
    },

    getIdentifier(): string {
      return this.xPlayer.getIdentifier();
    },

    getFirstName(): string {
      return this.xPlayer.get('firstName');
    },

    getLastName(): string {
      return this.xPlayer.get('lastName');
    },
  };

  Framework = {
    name: 'es_extended',
    object: sharedObject,

    getPlayerFromId(id: number) {
      const playerInstance = Object.create(playerPrototype);
      playerInstance.xPlayer = sharedObject.GetPlayerFromId(id);
      if (!playerInstance.xPlayer) return null;
      playerInstance.source = id;
      return playerInstance;
    },

    getPlayerFromIdentifier(identifier: string) {
      const playerInstance = Object.create(playerPrototype);
      playerInstance.xPlayer = sharedObject.GetPlayerFromIdentifier(identifier);
      if (!playerInstance.xPlayer) return null;
      playerInstance.source = playerInstance.xPlayer.source;
      return playerInstance;
    },

    registerUsableItem(...args: any[]) {
      return sharedObject.RegisterUsableItem(...args);
    },

    getPlayers() {
      return sharedObject.GetExtendedPlayers();
    },

    getItemLabel(item: string): string | undefined {
      if (GetResourceState('ox_inventory') === 'started') {
        return global.exports.ox_inventory.Items()?.[item]?.label;
      } else if (GetResourceState('qs-inventory') === 'started') {
        return global.exports['qs-inventory'].GetItemList()?.[item]?.label;
      } else if (GetResourceState('codem-inventory') === 'started') {
        return global.exports['codem-inventory'].GetItemList()?.[item]?.label;
      }
      return sharedObject.GetItemLabel(item);
    },

    getItems(): Record<string, any> {
      if (GetResourceState('ox_inventory') === 'started') {
        return global.exports.ox_inventory.Items();
      } else if (GetResourceState('qs-inventory') === 'started') {
        return global.exports['qs-inventory'].GetItemList();
      } else if (GetResourceState('codem-inventory') === 'started') {
        return global.exports['codem-inventory'].GetItemList();
      }
      return sharedObject.Items;
    },
  };

  on('esx:setPlayerData', (key: string, val: any, last: any) => {
    if (GetInvokingResource() === 'es_extended' && sharedObject) {
      (sharedObject.PlayerData as any)[key] = val;
    }
  });

  on('esx:playerLoaded', (xPlayer: any) => {
    if (sharedObject) {
      sharedObject.PlayerData = xPlayer;
      sharedObject.PlayerLoaded = true;
    }
  });

  on('esx:onPlayerLogout', () => {
    if (sharedObject) {
      sharedObject.PlayerLoaded = false;
      sharedObject.PlayerData = {};
    }
  });
}
