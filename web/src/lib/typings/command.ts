import { Item } from './item';
import { PlayerAdminData } from './player';

export interface Command {
  name: string;
  label: string;
  category: string;
  favorite?: boolean;
  expandable?: boolean;
  boundedTo?: string;
  active?: boolean;
  setFavorite?: (name: string, status: boolean) => void;
  players?: PlayerAdminData[];
  items?: Item[];
}
