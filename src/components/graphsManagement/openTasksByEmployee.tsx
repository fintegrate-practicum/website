import React, { useState, useEffect } from 'react';
import BaseGraph from '../../common/components/Graphs/BaseGraph';
import { fetchOpenTasksByEmployee } from './graphsfunc';
import { useAppSelector } from '../../app/hooks';

export interface Task {
  count: number;
  employeeId: string;
}

const OpenTasksByEmployee: React.FC = () => {
  console.log('Rendering Graphs component');

  const [dataPoints, setDataPoints] = useState<
    { y: number; indexLabel: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentEmployee = useAppSelector(
      (state) => state.currentUserSlice.employeeDetails,
    );
    const businessId = currentEmployee.businessId;

    const businessCode = businessId;

    fetchOpenTasksByEmployee(businessCode)
      .then((task: Task[]) => {
        console.log('Fetched order stats:', task);

        const formattedDataPoints = task.map((t) => ({
          y: t.count,
          indexLabel: t.employeeId,
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
        text='Open tasks by employee'
        includeZero={false}
        type='column'
        indexLabelFontColor='#5A5757'
        indexLabelPlacement='inside'
        dataPoints={dataPoints}
        startAngle={-90}
      />
    </div>
  );
};

export default OpenTasksByEmployee;
