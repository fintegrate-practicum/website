import React, { useState, useEffect } from 'react';
import BaseGraph from '../../common/components/Graphs/BaseGraph';
import { fetchLowStockProducts } from './graphsfunc';
import { useAppSelector } from '../../app/hooks';
import { useTheme } from '@mui/material/styles';

export interface ProductStock {
  productName: string;
  count: number;
}

const LowStockProductsList: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<
    { indexLabel: string; y: number }[]
  >([]);
  const currentEmployee = useAppSelector(
    (state) => state.currentUserSlice.employeeDetails,
  );
  const theme = useTheme();
  useEffect(() => {
    const businessId = currentEmployee.businessId;
    fetchLowStockProducts(businessId)
      .then((products: ProductStock[]) => {
        const formattedDataPoints = products.map((p) => ({
          indexLabel: p.productName,
          y: p.count,
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
        text='The list of products that are close to being finished'
        includeZero={false}
        type='column'
        indexLabelFontColor={theme.palette.info.main}
        indexLabelPlacement='outside'
        dataPoints={dataPoints}
        startAngle={-90}
      />
    </div>
  );
};

export default LowStockProductsList;
