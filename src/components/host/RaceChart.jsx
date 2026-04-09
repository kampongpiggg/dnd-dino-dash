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
          tick={{ fill: '#d4c4a8', fontSize: 16, fontFamily: 'Almendra, Georgia, serif' }}
          tickLine={{ stroke: '#8b7355' }}
          axisLine={{ stroke: '#8b7355' }}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={160}
          tick={{ fill: '#c9a227', fontSize: 18, fontWeight: 'bold', fontFamily: 'Almendra, Georgia, serif' }}
          tickLine={false}
          axisLine={false}
        />
        <ReferenceLine
          x={FINISH_LINE}
          stroke="#c9a227"
          strokeWidth={4}
          strokeDasharray="5 5"
          label={{
            value: 'FINISH',
            position: 'top',
            fill: '#c9a227',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'Almendra, Georgia, serif',
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
            fill="#f5e6c8"
            fontSize={16}
            fontWeight="bold"
            style={{ fontFamily: 'Almendra, Georgia, serif' }}
            formatter={(value) => `${value}ft`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
