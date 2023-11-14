import React, { useEffect, useState } from 'react';
import { getProfitData } from '../api/booking';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

function Profits () {
  const [profitData, setProfitData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfitData();
        setProfitData(response);
      } catch (error) {
        console.error('Error fetching profit data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width="80vw" height="70vh" data={profitData}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="day" label={{ value: 'Days Ago', position: 'insideBottomRight', offset: 0 }}/>
        <YAxis label={{ value: 'Profit ($)', angle: -90, position: 'insideLeft' }}/>
        <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }}/>
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Profits;
