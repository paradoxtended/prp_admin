declare interface Player {
  name: string;
  id: string;
  steamId: string;
};

declare interface PlayerDataClient {
  job: {
    name: string;
    grade: number;
  };
  inventory: Array<{ name: string; [key: string]: any }>;
  identifier?: string;
  firstname?: string;
  lastname?: string;
};

declare interface SharedObjectClient {
  name: string;
  object: any;

  isPlayerLoaded(): boolean;
  onPlayerLoaded(cb: any): void;
  onPlayerLogout(cb: any): void;
  getJob(): string | false;
  getJobGrade(): number;
  hasItem(name: string): boolean;
  getIdentifier(): string;
  getCharacterName(): string;
  getInventory(): any[]; // todo find out what is this returning
};

declare interface PlayerDataServer {
  source: any;

  hasGroup(name: string): boolean;
  hasOneOfGroups(groups: Record<string, boolean> | string[]): boolean;

  addItem(name: string, count?: number, metadata?: any): boolean | void;
  removeItem(name: string, count?: number): void;
  canCarryItem(name: string, count?: number): boolean;

  getItemCount(name: string): number;
  hasItem(name: string): boolean;

  getAccountMoney(account: string): number;
  addAccountMoney(account: string, amount: number): void;
  removeAccountMoney(account: string, amount: number): void;

  getJob(): string;
  getJobGrade(): number;
  setJob(name: string, grade: number): void;

  getIdentifier(): string;
  getFirstName(): string | undefined;
  getLastName(): string | undefined;
};

declare interface SharedObjectServer {
  name: string;
  object: any;

  getPlayerFromId(id: number): PlayerDataServer | undefined;
  getPlayerFromIdentifier(identifier: string): PlayerDataServer | undefined;

  registerUsableItem(name: string, cb: Function): void;
  getPlayers(): any[];

  getItemLabel(item: string): string | undefined;
  getItems(): Record<string, any>;
};

declare type NuiCb = (value: unknown) => void;

declare interface InitializingData { 
  favorites: string[];
  activeCommands: Record<string, boolean>;
};

declare interface Item {
  stack: boolean;
  name: string;
  weight: number;
  close: boolean;
  label: string;
};