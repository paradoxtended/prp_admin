import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import { Locale } from '../store/locale';

const DashboardChart: React.FC<{
  data: any;
}> = ({ data }) => {
  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} horizontal={false} />
          <XAxis dataKey="time" tick={{ fill: '#888', fontSize: 12 }} dx={0} dy={10} />
          <YAxis tick={{ fill: '#888', fontSize: 12 }} dx={-10} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#222',
              border: '1px solid #505050',
              borderRadius: 5,
              padding: '7px 12px',
            }}
            labelStyle={{ color: '#fff' }}
            formatter={(value: number) => [value, Locale.players || 'Players']}
          />
          <Area type="monotone" dataKey="players" stroke="#84cc16" fill="url(#gradient)" />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#84cc16" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#84cc16" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
