import React, { useState, useEffect } from 'react';
import BaseGraph from '../../common/components/Graphs/BaseGraph';
import { fetchStatusDistribution } from './graphsfunc';
import { useAppSelector } from '../../app/hooks';
import { useTheme } from '@mui/material/styles';

export interface orderStatus {
  status: string;
  count: number;
}

const StatusDistributionChart: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<{ x: string; y: number }[]>([]);
  const currentEmployee = useAppSelector(
    (state) => state.currentUserSlice.employeeDetails,
  );
  const theme = useTheme();

  useEffect(() => {
    const businessId = currentEmployee.businessId;

    fetchStatusDistribution(businessId)
      .then((orderStats: { status: string; count: number }[]) => {
        const formattedDataPoints = orderStats.map((stat) => ({
          x: stat.status,
          y: stat.count,
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
        text='Orders by status'
        type='pie'
        indexLabel='{x}'
        indexLabelFontColor={theme.palette.info.main}
        dataPoints={dataPoints}
        startAngle={-90}
      />
    </div>
  );
};

export default StatusDistributionChart;
