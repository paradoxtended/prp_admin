import { useEffect, useState } from 'react';
import { Locale } from '../store/locale';
import { fetchNui } from '../utils/fetchNui';
import { setClipboard } from '../utils/setClipboard';
import { isEnvBrowser } from '../utils/misc';
import Loader from './Loader';

interface Tab {
  name: string;
  label: string;
  active?: boolean;
}

interface Player {
  charName: string;
  stateId: number;
  license: string;
  accName: string;
  online: boolean;
}

type SortKey = 'charName' | 'stateId' | 'accName' | null;
type SortOrder = 'asc' | 'desc';

const Players: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [visible, setVisible] = useState<boolean>(false);
  const [tabs, setTabs] = useState<Tab[]>([
    { name: 'all', label: Locale.all_players || 'All Players', active: true },
    { name: 'online', label: Locale.online_players || 'Online Players' },
  ]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState<any>('');

  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10; // Number of players per page

  useEffect(() => {
    (async () => {
      setTimeout(() => setVisible(true), 500);

      if (isEnvBrowser()) {
        setPlayers([
          { charName: 'Tedd Bundy', stateId: 157, license: '15648561328654', accName: 'lilteddie', online: false },
          { charName: 'Esteban Ravage', stateId: 357, license: '15648561328654', accName: 'mr.ravage', online: false },
          { charName: 'Ravage James', stateId: 214, license: '15648561328654', accName: 'ravage', online: true },
          { charName: 'Prodigy Ted', stateId: 845, license: '15648561328654', accName: 'prodigy', online: false },
          { charName: 'Linden Luke', stateId: 1154, license: '15648561328654', accName: 'linden', online: true },
          { charName: 'Tedd Bundy', stateId: 157, license: '15648561328654', accName: 'lilteddie', online: false },
          { charName: 'Esteban Ravage', stateId: 357, license: '15648561328654', accName: 'mr.ravage', online: false },
          { charName: 'Ravage James', stateId: 214, license: '15648561328654', accName: 'ravage', online: true },
          { charName: 'Prodigy Ted', stateId: 845, license: '15648561328654', accName: 'prodigy', online: false },
          { charName: 'Linden Luke', stateId: 1154, license: '15648561328654', accName: 'linden', online: true },
          { charName: 'Tedd Bundy', stateId: 157, license: '15648561328654', accName: 'lilteddie', online: false },
          { charName: 'Esteban Ravage', stateId: 357, license: '15648561328654', accName: 'mr.ravage', online: false },
          { charName: 'Ravage James', stateId: 214, license: '15648561328654', accName: 'ravage', online: true },
          { charName: 'Prodigy Ted', stateId: 845, license: '15648561328654', accName: 'prodigy', online: false },
          { charName: 'Linden Luke', stateId: 1154, license: '15648561328654', accName: 'linden', online: true },
        ]);

        return;
      }

      const ply = await fetchNui<Player[]>('getPlayers');
      setPlayers(ply);
    })();
  }, []);

  const displayedPlayers = [...players]
    .filter((p) => (activeTab === 'online' ? p.online : true))
    .filter((player) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();

      return (
        player.charName.toLowerCase().includes(q) ||
        player.accName.toLowerCase().includes(q) ||
        player.stateId.toString().includes(q) ||
        player.license.toString().includes(q)
      );
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      let A: string | number = a[sortKey];
      let B: string | number = b[sortKey];
      if (typeof A === 'string') A = A.toLowerCase();
      if (typeof B === 'string') B = B.toLowerCase();

      if (A < B) return sortOrder === 'asc' ? -1 : 1;
      if (A > B) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const totalPages = Math.ceil(displayedPlayers.length / pageSize);
  const paginatedPlayers = displayedPlayers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return visible ? (
    <div className="flex flex-col gap-5 pr-10">
      <div className="w-fit h-10 bg-neutral-900 mx-auto rounded-full flex items-center px-5 py-1">
        {tabs.map((tab, index) => (
          <div
            key={`tab-${index}`}
            className={`text-white text-sm px-20 py-1 rounded-sm cursor-pointer
                    ${tab.active ? 'bg-lime-500/20 border border-lime-600' : 'border-none'}
                    `}
            onClick={() => {
              setActiveTab(tab.name);
              setTabs(tabs.map((t) => ({ ...t, active: t.name === tab.name })));
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div>
        <div className="relative">
          <input
            type="text"
            placeholder={Locale.search || 'Search...'}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="w-full bg-neutral-900 focus:border-lime-600 text-white focus:outline-none text-sm px-3 py-1.5 rounded-lg border border-neutral-700
                    placeholder:text-neutral-400"
          />
          <i className="fa-solid fa-magnifying-glass absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400"></i>
        </div>
        <table className="w-full bg-neutral-900 rounded-sm mt-5">
          <thead className="border-b border-neutral-700">
            <tr className="text-white text-sm">
              <th className="text-left py-2 px-3">
                <div className="flex items-center gap-5">
                  <p>{Locale.character_name || 'Character Name'}</p>
                  <i
                    className={`fa-solid ${sortOrder === 'desc' ? 'fa-arrow-down-wide-short' : 'fa-arrow-up-short-wide'} text-neutral-500 cursor-pointer hover:text-lime-500 duration-200`}
                    onClick={() => handleSort('charName')}
                  ></i>
                </div>
              </th>
              <th className="text-left py-2 px-3">
                <div className="flex items-center gap-5">
                  <p>{Locale.state_id || 'State ID'}</p>
                  <i
                    className={`fa-solid ${sortOrder === 'desc' ? 'fa-arrow-down-wide-short' : 'fa-arrow-up-short-wide'} text-neutral-500 cursor-pointer hover:text-lime-500 duration-200`}
                    onClick={() => handleSort('stateId')}
                  ></i>
                </div>
              </th>
              <th className="text-left py-2 px-3">{Locale.license || 'License'}</th>
              <th className="text-left py-2 px-3">
                <div className="flex items-center gap-5">
                  <p>{Locale.account_name || 'Account Name'}</p>
                  <i
                    className={`fa-solid ${sortOrder === 'desc' ? 'fa-arrow-down-wide-short' : 'fa-arrow-up-short-wide'} text-neutral-500 cursor-pointer hover:text-lime-500 duration-200`}
                    onClick={() => handleSort('accName')}
                  ></i>
                </div>
              </th>
              <th className="py-2 px-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedPlayers.map((player, index) => (
              <tr
                className="text-white text-sm border-b border-neutral-700 last:border-none hover:bg-neutral-800"
                key={`player-${index}`}
              >
                <td className="py-2 px-3">
                  <div className="flex items-center justify-between">
                    <p className="hover:text-lime-500 duration-200 cursor-pointer">{player.charName}</p>
                    <i
                      className="fa-regular fa-copy text-neutral-500 cursor-pointer hover:text-lime-500 duration-200"
                      onClick={() => setClipboard(player.charName)}
                    ></i>
                  </div>
                </td>
                <td className="py-2 px-3">
                  <div className="flex items-center justify-between">
                    <p>{player.stateId}</p>
                    <i
                      className="fa-regular fa-copy text-neutral-500 cursor-pointer hover:text-lime-500 duration-200"
                      onClick={() => setClipboard(player.stateId.toString())}
                    ></i>
                  </div>
                </td>
                <td className="py-2 px-3">
                  <div className="flex items-center justify-between">
                    <p>{player.license}</p>
                    <i
                      className="fa-regular fa-copy text-neutral-500 cursor-pointer hover:text-lime-500 duration-200"
                      onClick={() => setClipboard(player.license.toString())}
                    ></i>
                  </div>
                </td>
                <td className="py-2 px-3">
                  <div className="flex items-center justify-between">
                    <p>{player.accName}</p>
                    <i
                      className="fa-regular fa-copy text-neutral-500 cursor-pointer hover:text-lime-500 duration-200"
                      onClick={() => setClipboard(player.accName)}
                    ></i>
                  </div>
                </td>
                <td className="py-2 px-3 text-center">
                  <i className="fa-solid fa-ellipsis-vertical text-neutral-500 cursor-pointer hover:text-lime-500 duration-200 "></i>
                </td>
              </tr>
            ))}

            {displayedPlayers.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-white/60 text-sm">
                  {Locale.no_players || 'No Players'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="w-full flex items-center justify-end gap-1 mt-5">
          <button
            className={`text-xs text-white bg-neutral-900 px-2.5 py-1.5 border border-neutral-700 rounded-md
                        hover:bg-lime-500/10 hover:border-lime-600 duration-200
                        ${currentPage === 1 && 'pointer-events-none opacity-50'}`}
            onClick={() => goToPage(currentPage - 1)}
          >
            {Locale.previous || 'Previous'}
          </button>
          <button
            className={`text-xs text-white bg-neutral-900 px-2.5 py-1.5 border border-neutral-700 rounded-md
                        hover:bg-lime-500/10 hover:border-lime-600 duration-200
                        ${currentPage === totalPages && 'pointer-events-none opacity-50'}`}
            onClick={() => goToPage(currentPage + 1)}
          >
            {Locale.previous || 'Next'}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Players;
