export interface AdminData {
    nickname: string;
    role: string;
    online?: { nickname: string; role: string; }[];
}