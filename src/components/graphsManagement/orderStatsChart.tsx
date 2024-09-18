import React, { useState, useEffect } from 'react';
import BaseGraph from '../../common/components/Graphs/BaseGraph';
import { fetchOrderStats } from './graphsfunc';
import { useAppSelector } from '../../app/hooks';
import { useTheme } from '@mui/material/styles';

export interface orderStats {
  date: Date;
  count: number;
}

const OrderStatsChart: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<{ x: Date; y: number }[]>([]);
  const currentEmployee = useAppSelector(
    (state) => state.currentUserSlice.employeeDetails,
  );
  const theme = useTheme();

  useEffect(() => {
    const businessId = currentEmployee.businessId;

    fetchOrderStats(businessId)
      .then((orderStats: { date: string; count: number }[]) => {
        const formattedDataPoints = orderStats.map((stat) => ({
          x: new Date(stat.date),
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
        text='Amount of orders in the last two weeks'
        includeZero={true}
        type='spline'
        indexLabelFontColor={theme.palette.info.main}
        indexLabelPlacement='outside'
        dataPoints={dataPoints}
        startAngle={-90}
      />
    </div>
  );
};

export default OrderStatsChart;
