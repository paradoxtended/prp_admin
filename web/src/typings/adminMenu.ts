interface PlayersData {
  total: number;
  doj?: number;
  medical?: number;
  police?: number;
}

interface AdminData {
  role: string;
  label?: string;
  name: string;
}

interface DashboardChart {
  time: string;
  players: number;
}

export interface AdminMenu {
  players: PlayersData;
  admins: AdminData[];
  dashboard: DashboardChart[];
}
