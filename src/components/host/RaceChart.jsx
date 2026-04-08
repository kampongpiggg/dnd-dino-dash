import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { FINISH_LINE, TRACK_MAX } from '../../config/dinosaurs';

const getBarColor = (dino) => {
  if (dino.status === 'Out') return '#000000';
  if (dino.status === 'Prone') return '#808080';
  return dino.color;
};

const getBarOpacity = (status) => {
  if (status === 'Out') return 0.3;
  if (status === 'Prone') return 0.5;
  return 1;
};

export const RaceChart = ({ dinosaurs }) => {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
        layout="vertical"
        data={dinosaurs}
        margin={{ top: 20, right: 60, left: 20, bottom: 20 }}
      >
        <XAxis
          type="number"
          domain={[0, TRACK_MAX]}
          tick={{ fill: '#fff', fontSize: 16 }}
          tickLine={{ stroke: '#fff' }}
          axisLine={{ stroke: '#fff' }}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={160}
          tick={{ fill: '#fff', fontSize: 18, fontWeight: 'bold' }}
          tickLine={false}
          axisLine={false}
        />
        <ReferenceLine
          x={FINISH_LINE}
          stroke="#fff"
          strokeWidth={4}
          strokeDasharray="5 5"
          label={{
            value: 'FINISH',
            position: 'top',
            fill: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        />
        <Bar
          dataKey="tally"
          isAnimationActive={true}
          animationDuration={500}
          animationEasing="ease-in-out"
          radius={[0, 8, 8, 0]}
        >
          {dinosaurs.map((dino) => (
            <Cell
              key={dino.id}
              fill={getBarColor(dino)}
              fillOpacity={getBarOpacity(dino.status)}
            />
          ))}
          <LabelList
            dataKey="tally"
            position="right"
            fill="#fff"
            fontSize={16}
            fontWeight="bold"
            formatter={(value) => `${value}ft`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
