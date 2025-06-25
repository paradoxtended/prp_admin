export let Framework: SharedObjectServer = null;

if (GetResourceState('qb-core') === 'started') {
  const sharedObject = global.exports['qb-core'].GetCoreObject();

  const playerPrototype = {
    source: 0 as number,
    qbPlayer: null as any,

    hasGroup(name: string): boolean {
      return sharedObject.Functions.HasPermission(this.source, name) === name;
    },

    hasOneOfGroups(groups: Record<string, boolean> | string[]): boolean {
      if (Array.isArray(groups)) {
        return !!groups.includes(this.qbPlayer.PlayerData.job.name);
      } else {
        return !!groups[this.qbPlayer.PlayerData.job.name];
      }
    },

    addItem(name: string, count = 1, metadata?: any): boolean {
      if (GetResourceState('codem-inventory') === 'started') {
        return global.exports['codem-inventory'].AddItem(this.source, name, count, null, metadata);
      } else if (GetResourceState('ox_inventory') === 'started') {
        return global.exports.ox_inventory.AddItem(this.source, name, count, metadata);
      } else {
        return this.qbPlayer.Functions.AddItem(name, count, null, metadata);
      }
    },

    removeItem(name: string, count = 1): void {
      if (GetResourceState('codem-inventory') === 'started') {
        global.exports['codem-inventory'].RemoveItem(this.source, name, count);
      } else if (GetResourceState('ox_inventory') === 'started') {
        global.exports.ox_inventory.RemoveItem(this.source, name, count);
      } else {
        this.qbPlayer.Functions.RemoveItem(name, count);
      }
    },

    canCarryItem(name: string, count = 1): boolean {
      if (GetResourceState('ox_inventory') === 'started') {
        return global.exports.ox_inventory.CanCarryItem(this.source, name, count);
      }
      return true; // QBCore default
    },

    getItemCount(name: string): number {
      if (GetResourceState('ox_inventory') === 'started') {
        return global.exports.ox_inventory.GetItemCount(this.source, name);
      } else if (GetResourceState('codem-inventory') === 'started') {
        return global.exports['codem-inventory'].GetItemsTotalAmount(this.source, name);
      }
      return this.qbPlayer.Functions.GetItemByName(name)?.amount || 0;
    },

    hasItem(name: string): boolean {
      return this.getItemCount(name) > 0;
    },

    getAccountMoney(account: string): number {
      return this.qbPlayer.Functions.GetMoney(account);
    },

    addAccountMoney(account: string, amount: number): void {
      this.qbPlayer.Functions.AddMoney(account, amount);
    },

    removeAccountMoney(account: string, amount: number): void {
      this.qbPlayer.Functions.RemoveMoney(account, amount);
    },

    getJob(): string {
      return this.qbPlayer.PlayerData.job.name;
    },

    getJobGrade(): number {
      return this.qbPlayer.PlayerData.job.grade.level;
    },

    setJob(name: string, grade: number): void {
      this.qbPlayer.Functions.SetJob(name, grade);
    },

    getIdentifier(): string {
      return this.qbPlayer.PlayerData.citizenid;
    },

    getFirstName(): string {
      return this.qbPlayer.PlayerData.charinfo.firstname;
    },

    getLastName(): string {
      return this.qbPlayer.PlayerData.charinfo.lastname;
    }
  };

  Framework = {
    name: 'qb-core',
    object: sharedObject,

    getPlayerFromId(id: number) {
      const playerInstance = Object.create(playerPrototype);
      playerInstance.qbPlayer = sharedObject.Functions.GetPlayer(id);
      if (!playerInstance.qbPlayer) return null;
      playerInstance.source = id;
      return playerInstance;
    },

    getPlayerFromIdentifier(identifier: string) {
      const playerInstance = Object.create(playerPrototype);
      playerInstance.qbPlayer = sharedObject.Functions.GetPlayerByCitizenId(identifier);
      if (!playerInstance.qbPlayer) return null;
      playerInstance.source = playerInstance.qbPlayer.PlayerData.source;
      return playerInstance;
    },

    registerUsableItem(...args: any[]) {
      return sharedObject.Functions.CreateUseableItem(...args);
    },

    getPlayers() {
      return sharedObject.Functions.GetQBPlayers();
    },

    getItemLabel(item: string): string | undefined {
      if (GetResourceState('ox_inventory') === 'started') {
        return global.exports.ox_inventory.Items()[item]?.label;
      } else if (GetResourceState('qs-inventory') === 'started') {
        return global.exports['qs-inventory'].GetItemList()[item]?.label;
      } else if (GetResourceState('codem-inventory') === 'started') {
        return global.exports['codem-inventory'].GetItemList()[item]?.label;
      }
      return sharedObject.Shared.Items[item]?.label;
    },

    getItems(): Record<string, any> {
      if (GetResourceState('ox_inventory') === 'started') {
        return global.exports.ox_inventory.Items();
      } else if (GetResourceState('qs-inventory') === 'started') {
        return global.exports['qs-inventory'].GetItemList();
      } else if (GetResourceState('codem-inventory') === 'started') {
        return global.exports['codem-inventory'].GetItemList();
      }
      return sharedObject.Shared.Items;
    }
  };
}