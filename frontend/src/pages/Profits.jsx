import React from 'react';
import ProfitGraph from '../components/ProfitGraph';
import { getProfitData } from '../api/booking';

function Profits () {
  return (
    <ProfitGraph profitData={getProfitData()}/>
  );
}

export default Profits;
