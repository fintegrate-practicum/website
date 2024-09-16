import React from 'react';
import OrderStatsChart from './orderStatsChart';
import StatusDistributionChart from './statusDistributionChart';
import LowStockProductsList from './lowStockProductsList';
import OpenTasksByEmployee from './openTasksByEmployee';

const Graphs: React.FC = () => {
  return (
    <div>
      <h1>Graphs Overview</h1>
      <OrderStatsChart />
      <StatusDistributionChart />
      <LowStockProductsList />
      <OpenTasksByEmployee />
    </div>
  );
};

export default Graphs;
