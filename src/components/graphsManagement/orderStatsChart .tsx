import React, { useState, useEffect } from 'react';
import BaseGraph from '../../common/components/Graphs/BaseGraph';
import { fetchOrderStats } from './graphsfunc';
import { useAppSelector } from '../../app/hooks';

export interface orderStats {
  date: Date;
  count: number;
}

const OrderStatsChart: React.FC = () => {
  console.log('Rendering Graphs component');

  const [dataPoints, setDataPoints] = useState<{ x: Date; y: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentEmployee = useAppSelector(
      (state) => state.currentUserSlice.employeeDetails,
    );
    const businessId = currentEmployee.businessId;

    fetchOrderStats(businessId)
      .then((orderStats: { date: string; count: number }[]) => {
        console.log('Fetched order stats:', orderStats);

        const formattedDataPoints = orderStats.map((stat) => ({
          x: new Date(stat.date),
          y: stat.count,
        }));
        setDataPoints(formattedDataPoints);
      })
      .catch((err) => {
        setError('Failed to fetch order stats');
        console.error('Error in fetchOrderStats:', err);
      });
  }, []);

  if (error) {
    console.error('Error in component rendering:', error);
    return <div>Error: {error}</div>;
  }

  console.log('Data points being passed to BaseGraph:', dataPoints);

  return (
    <div>
      <BaseGraph
        animationEnabled={true}
        exportEnabled={false}
        theme='light2'
        text='Amount of orders in the last two weeks'
        includeZero={true}
        type='spline'
        indexLabelFontColor='#5A5757'
        indexLabelPlacement='outside'
        dataPoints={dataPoints}
        startAngle={-90}
      />
    </div>
  );
};

export default OrderStatsChart;
