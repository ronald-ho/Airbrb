import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

function ProfitGraph ({ profitData }) {
  return (
    <LineChart width={600} height={300} data={profitData}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="day" label={{ value: 'Days Ago', position: 'insideBottomRight', offset: 0 }}/>
      <YAxis label={{ value: 'Profit ($)', angle: -90, position: 'insideLeft' }}/>
      <Tooltip/>
      <Legend/>
      <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }}/>
    </LineChart>
  );
}

export default ProfitGraph;
