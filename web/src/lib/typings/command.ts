export interface Command {
    name: string;
    label: string;
    favorite?: boolean;
    expandable?: boolean;
    boundedTo?: string;
    setFavorite?: (name: string, status: boolean) => void;
};