import { Player } from './player';

export interface Command {
  name: string;
  label: string;
  favorite?: boolean;
  expandable?: boolean;
  boundedTo?: string;
  setFavorite?: (name: string, status: boolean) => void;
  players?: Player[];
}
