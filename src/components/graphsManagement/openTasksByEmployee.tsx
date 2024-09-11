import React, { useState, useEffect } from 'react';
import BaseGraph from '../../common/components/Graphs/BaseGraph';
import { fetchOpenTasksByEmployee } from './graphsfunc';

export interface Task {
  employeeId: string;
  count: number;
}

const OpenTasksByEmployee: React.FC = () => {
  console.log("Rendering Graphs component");

  const [dataPoints, setDataPoints] = useState<{ indexLabel: string; y: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const businessCode = '66dd4c430710892c92ab3f37';

    fetchOpenTasksByEmployee(businessCode)
      .then((task: Task[]) => {
        console.log("Fetched order stats:", task);

        const formattedDataPoints = task.map((t) => ({
          indexLabel: t.employeeId,
          y: t.count
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
        text="Open Tasks"
        includeZero={false}
        type="column"
        indexLabelFontColor="#5A5757"
        indexLabelPlacement="inside"
        dataPoints={dataPoints}
        startAngle={-90}      
      />
    </div>
  );
};

export default OpenTasksByEmployee;
