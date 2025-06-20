import { useEffect, useState } from "react";
import { debugData } from "./utils/debugData";
import useNuiEvent from "./hooks/useNuiEvent";
import { Locale } from "./store/locale";
import { fetchNui } from "./utils/fetchNui";
import Slide from "./components/utils/transitions/Slide";
import Header from "./components/header/Header";
import './index.scss';
import Tabs from "./components/tabs/Tabs";

debugData([
  {
    action: 'openAdminPanel',
    data: {}
  }
]);

export interface Navbar {
    name: string;
    label?: string;
    isActive?: boolean;
};

const App: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<any>('');
  const [navbar, setNavbar] = useState<Navbar[]>([
      { name: 'all', label: 'ALL', isActive: true },
      { name: 'players' },
      { name: 'utility' },
      { name: 'user' }
  ]);
  const [currentTab, setCurrentTab] = useState<string>('all');

  useEffect(() => setCurrentTab(navbar.find((n) => n.isActive)?.name ?? 'all'), [navbar]);

  useNuiEvent<{
    locale: { [key: string]: string };
  }>('init', ({ locale }) => {
    for (const name in locale) Locale[name] = locale[name];
  });

  fetchNui('uiLoaded', {});

  useNuiEvent('closeAdminPanel', () => {
    setVisible(false);
  });

  useNuiEvent('openAdminPanel', () => {
    setVisible(true);
  });

  return (
    <Slide in={visible}>
      <div className="container">
        <Header setSearchQuery={setSearchQuery} navbar={navbar} setNavbar={setNavbar} />
        <Tabs searchQuery={searchQuery} tab={currentTab} />
      </div>
    </Slide>
  )
};

export default App