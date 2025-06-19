import { useEffect, useState } from "react";
import { debugData } from "./utils/debugData";
import useNuiEvent from "./hooks/useNuiEvent";
import { Locale } from "./store/locale";
import { fetchNui } from "./utils/fetchNui";
import Slide from "./components/utils/transitions/Slide";

debugData([
  {
    action: 'openAdminPanel',
    data: {}
  }
])

const App: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

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
    setTimeout(() => setVisible(false), 5000)
  });

  return (
    <Slide in={visible}>
      <div className="container"></div>
    </Slide>
  )
};

export default App