import { PlayerAdminData } from './player';

export interface Command {
  name: string;
  label: string;
  category: string;
  favorite?: boolean;
  expandable?: boolean;
  boundedTo?: string;
  setFavorite?: (name: string, status: boolean) => void;
  players?: PlayerAdminData[];
}
