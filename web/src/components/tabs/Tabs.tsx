import React, { useState } from "react";
import './tabs.scss';
import Commands from "./commands/Commands";

interface Tab {
    name: string;
    label?: string;
    icon?: string;
    color: any
};

const Tabs: React.FC<
    { searchQuery: any; tab: string }
> = ({ searchQuery, tab }) => {
    const [currentTab, setCurrentTab] = useState<string>('commands');
    const [tabs, setTabs] = useState<Tab[]>([
        { name: 'commands', label: 'Commands', icon: 'fa-solid fa-jedi', color: '#17ffd1' },
        { name: 'playerList', label: 'Player List', icon: 'fa-solid fa-list-ul', color: '#048ddb' }
    ]);

    return (
        <div className="wrapper">
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <div onClick={() => setCurrentTab(tab.name)} className="tab" key={`tab-${index}`} style={
                        { border: `1px solid ${tab.color}`, color: `${tab.color}`, background: `linear-gradient(${tab.color + '00'}, ${tab.color + 50})` }
                    }>
                        {tab.icon && <i className={tab.icon}></i>}
                        <p>{tab?.label || tab.name}</p>
                    </div>
                ))}
            </div>
            {currentTab === 'commands' && <Commands searchQuery={searchQuery} tab={tab} />}
        </div>
    )
};

export default Tabs;