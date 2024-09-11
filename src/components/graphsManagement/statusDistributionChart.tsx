import React, { useState, useEffect } from 'react';
import BaseGraph from '../../common/components/Graphs/BaseGraph';
import { fetchStatusDistribution } from './graphsfunc';

export interface orderStatus {
  status: string;
  count: number;
}

const StatusDistributionChart: React.FC = () => {
  console.log("Rendering statusGraph component");

  const [dataPoints, setDataPoints] = useState<{ x: string; y: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const businessCode = 'business12345';

    fetchStatusDistribution(businessCode)
      .then((orderStats: { status: string; count: number }[]) => {
        console.log("Fetched order stats:", orderStats);

        const formattedDataPoints = orderStats.map((stat) => ({
          x: stat.status,
          y: stat.count,
        }));
        setDataPoints(formattedDataPoints);
      })
      .catch((err) => {
        setError('Failed to fetch order stats');
        console.error("Error in fetchOrderStats:", err);
      });

  }, []);

  if (error) {
    console.error("Error in component rendering:", error);
    return <div>Error: {error}</div>;
  }

  console.log("Data points being passed to BaseGraph:", dataPoints);

  return (
    <div>
      <BaseGraph
        animationEnabled={true}
        exportEnabled={false}
        theme="light2"
        text="Orders Status"
        type="pie"
        indexLabel="{x}"
        dataPoints={dataPoints}
        startAngle={-90}
      />
    </div>
  );
};

export default StatusDistributionChart;
