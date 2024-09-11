import React, { useState, useEffect } from 'react';
import BaseGraph from '../../common/components/Graphs/BaseGraph';
import { fetchStatusDistribution } from './graphsfunc';
import { useAppSelector } from '../../app/hooks';

export interface orderStatus {
  status: string;
  count: number;
}

const StatusDistributionChart: React.FC = () => {
  console.log('Rendering statusGraph component');

  const [dataPoints, setDataPoints] = useState<{ x: string; y: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentEmployee = useAppSelector(
      (state) => state.currentUserSlice.employeeDetails,
    );
    const businessId= currentEmployee.businessId;    

    fetchStatusDistribution(businessId)
      .then((orderStats: { status: string; count: number }[]) => {
        console.log('Fetched order Fstats:', orderStats);

        const formattedDataPoints = orderStats.map((stat) => ({
          x: stat.status,
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
        text='Orders by status'
        type='pie'
        indexLabel='{x}'
        dataPoints={dataPoints}
        startAngle={-90}
      />
    </div>
  );
};

export default StatusDistributionChart;
