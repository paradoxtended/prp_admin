import { useState } from 'react';
import Navbar from './components/Navbar';
import useNuiEvent from './hooks/useNuiEvent';
import { Locale } from './store/locale';
import { AdminMenu } from './typings/adminMenu';
import { debugData } from './utils/debugData';
import { fetchNui } from './utils/fetchNui';

debugData<AdminMenu>([
  {
    action: 'openAdminMenu',
    data: {
      players: {
        total: 263,
        doj: 1,
        medical: 5,
        police: 17,
      },
      admins: [
        { name: 'Zephyrbell', role: 'admin' },
        { name: 'Ravage', role: 'admin' },
        { name: 'Cheddar', role: 'admin' },
        { name: 'Taire', role: 'admin' },
        { name: 'kylend', role: 'admin' },
      ],
      dashboard: [
        { time: '11:00AM', players: 120 },
        { time: '11:05AM', players: 125 },
        { time: '11:10AM', players: 114 },
        { time: '11:15AM', players: 119 },
        { time: '11:20AM', players: 130 },
        { time: '11:25AM', players: 60 },
        { time: '11:30AM', players: 72 },
        { time: '11:35AM', players: 89 },
        { time: '11:40AM', players: 114 },
        { time: '11:45AM', players: 142 },
        { time: '11:50AM', players: 160 },
        { time: '11:55AM', players: 152 },
        { time: '12:00AM', players: 138 },
      ],
    },
  },
]);

const App: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [props, setProps] = useState<AdminMenu>();

  useNuiEvent<{
    locale: { [key: string]: string };
  }>('init', ({ locale }) => {
    for (const name in locale) Locale[name] = locale[name];
  });

  fetchNui('uiLoaded', {});

  useNuiEvent('openAdminMenu', (data) => {
    setProps(data);
    setVisible(true);
  });

  return (
    visible && (
      <div className="w-3/5 h-2/3 bg-gradient-to-r from-black/90 to-lime-950/90 border-2 border-neutral-500 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-between py-5 px-10">
          <img src="./public/logo.webp" className="w-56" />
          <i className="fa-regular fa-circle-xmark text-white text-lg cursor-pointer duration-200 hover:text-lime-500"></i>
        </div>
        <Navbar props={props} />
      </div>
    )
  );
};

export default App;
