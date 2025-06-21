import { Locale } from '../store/locale';
import { AdminMenu } from '../typings/adminMenu';
import DashboardChart from './DashboardChart';

const Dashboard: React.FC<{
  props: AdminMenu;
  allPlayers: Function;
}> = ({ props, allPlayers }) => {
  return (
    <div className="flex flex-col gap-3 pr-10">
      <div className="text-white h-1/2 flex gap-3">
        <div className="bg-neutral-900 w-2/3 p-5 rounded-lg border border-neutral-700 h-fit">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{Locale.current_players || 'Current Players on Server'}</p>
            <p className="text-lime-500 font-bold text-xl">{props.players.total}</p>
          </div>
          <div className="my-5 flex gap-3 flex-wrap max-h-[152px] overflow-auto">
            <div className="flex gap-3 items-center text-yellow-300 bg-yellow-400/10 w-fit px-2 py-1 rounded-md border border-yellow-300 text-sm">
              <p>{Locale.doj || 'DOJ'}</p>
              <p className="text-white font-bold">{props.players.doj || 0}</p>
            </div>
            <div className="flex gap-3 items-center text-red-300 bg-red-500/10 w-fit px-2 py-1 rounded-md border border-red-500 text-sm">
              <p>{Locale.medical || 'Medical'}</p>
              <p className="text-white font-bold">{props.players.medical || 0}</p>
            </div>
            <div className="flex gap-3 items-center text-blue-500 bg-blue-500/10 w-fit px-2 py-1 rounded-md border border-blue-500 text-sm">
              <p>{Locale.police || 'Police'}</p>
              <p className="text-white font-bold">{props.players.police || 0}</p>
            </div>
          </div>
          <div>
            <button
              onClick={() => allPlayers()}
              className="text-sm font-medium bg-neutral-800 px-4 py-1.5 rounded-full border border-neutral-700
                        hover:bg-neutral-200/10 hover:border-neutral-600 duration-200"
            >
              {Locale.all_players || 'All Players'}
            </button>
          </div>
        </div>
        <div className="bg-neutral-900 w-1/3 p-5 pr-0 h-full rounded-lg border border-neutral-700">
          <div className="flex items-center justify-between pr-5">
            <p className="font-semibold">{Locale.admins_online || 'Admins Online'}</p>
            <p className="text-lime-500 font-bold text-xl">{props.admins.length}</p>
          </div>
          <div className="flex flex-col gap-3 mt-3 overflow-auto max-h-56 pr-5">
            {props.admins.map((admin, index) => (
              <div
                key={`admin-${index}`}
                className="bg-neutral-800 border border-neutral-700 rounded-md py-1.5 px-2 text-sm flex items-center justify-between"
              >
                <p>{admin.name}</p>
                <p className="bg-lime-900/70 border border-lime-500 rounded-lg px-1.5 py-0.5 text-[12px]">
                  {admin.label || admin.role.charAt(0).toUpperCase() + admin.role.slice(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-neutral-900 w-full p-5 rounded-lg border border-neutral-700 h-1/2">
        <p className="text-white font-semibold mb-5">{Locale.players_activity || 'Players Activity'}</p>
        <DashboardChart data={props.dashboard} />
      </div>
    </div>
  );
};

export default Dashboard;
