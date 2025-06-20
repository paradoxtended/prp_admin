import { useEffect, useState } from 'react';
import './commands.scss';

interface Command {
    name: string;
    label: string;
    type: string; // From navbar
    opened?: boolean;
    data: {
        inputs: { 
            type: 'text' | 'number' | 'select';
            label: string;
            name: string;
        }[];
        confirm: {
            label?: string;
        }
    }
}

interface CommandsProps {
    searchQuery: string;
    tab: string;
}

const Commands: React.FC<CommandsProps> = ({ searchQuery, tab }) => {
    const [commands, setCommands] = useState<Command[]>([
        { name: 'bring', label: 'Bring', type: 'players', data: {
            inputs: [
                {
                    type: 'text',
                    name: 'player',
                    label: 'Select a player'
                },
                {
                    type: 'number',
                    name: 'amount',
                    label: 'Enter amount'
                }
            ],
            confirm: {
                label: 'Bring'
            }
        }}
    ]);
    const [filterCmd, setFilterCmd] = useState<Command[]>([]); 

    useEffect(() => {
        const normalized = searchQuery.toLowerCase();
        const filtered = commands.filter((cmd) => {
            const matchesSearch = cmd.name.toLowerCase().includes(normalized);
            const matchesTab = tab === 'all' || tab === cmd.type;
            return matchesSearch && matchesTab;
        });
        setFilterCmd(filtered);
    }, [searchQuery, tab, commands]);

    return (
        <div className="commands">
            {filterCmd.map((command, index) => (
                <div className="card" 
                key={`command-${index}`} 
                style={ command?.opened ? { maxHeight: '500px' } : {} }
                >
                    <div className="top" onClick={() => setCommands((prev) => prev.map((cmd) => cmd.name === command.name ? { ...cmd, opened: !cmd.opened } : cmd))}>
                        <div className="leftSide">
                            <i className="fa-solid fa-star"></i>
                            <p className="label">{command.label}</p>
                        </div>
                        <div className="rightSide">
                            <i className={`${command.opened ? `fa-solid fa-chevron-up`: `fa-solid fa-chevron-down`}`}></i>
                        </div>
                    </div>
                    <div className="options">
                        {command.data.inputs.map((input, index) => (
                            <div className="option" key={index}>
                                <p className='label'>{input.label}</p>
                                {input.type === 'text' && <input type='text'></input>}
                                {input.type === 'number' && <input type='number'></input>}
                            </div>
                        ))}
                    </div>
                    <button>{command.data.confirm.label}</button>
                </div>
            ))}
        </div>
    )
};

export default Commands;