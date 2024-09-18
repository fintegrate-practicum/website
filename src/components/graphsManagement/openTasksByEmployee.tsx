import React, { useState, useEffect } from 'react';
import BaseGraph from '../../common/components/Graphs/BaseGraph';
import { fetchOpenTasksByEmployee } from './graphsfunc';
import { useAppSelector } from '../../app/hooks';
import { useTheme } from '@mui/material/styles';

export interface Task {
  count: number;
  employeeId: string;
}

const OpenTasksByEmployee: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<
    { y: number; indexLabel: string }[]
  >([]);
  const currentEmployee = useAppSelector(
    (state) => state.currentUserSlice.employeeDetails,
  );
  const theme = useTheme();
  useEffect(() => {
    const businessId = currentEmployee.businessId;

    fetchOpenTasksByEmployee(businessId)
      .then((task: Task[]) => {
        const formattedDataPoints = task.map((t) => ({
          y: t.count,
          indexLabel: t.employeeId,
        }));
        setDataPoints(formattedDataPoints);
      })
      .catch((err) => {
        console.error('Error in fetchOrderStats:', err);
      });
  }, []);

  return (
    <div>
      <BaseGraph
        animationEnabled={true}
        exportEnabled={false}
        theme='light2'
        text='Open tasks by employee'
        includeZero={false}
        type='column'
        indexLabelFontColor={theme.palette.info.main}
        indexLabelPlacement='inside'
        dataPoints={dataPoints}
        startAngle={-90}
      />
    </div>
  );
};

export default OpenTasksByEmployee;
