import React, { useState, useEffect } from 'react';
import BaseGraph from '../../common/components/Graphs/BaseGraph';
import { fetchLowStockProducts } from './graphsfunc';

export interface ProductStock {
  productName: string;
  count: number;
}

const LowStockProductsList: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<{ indexLabel: string, y: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLowStockProducts('66dd4c430710892c92ab3f37')
      .then((products: ProductStock[]) => {
        console.log("Fetched order stats:", products);

        const formattedDataPoints = products.map((p) => ({
          indexLabel: p.productName,
          y: p.count
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
        text="Products stocks"
        includeZero={false}
        type="column"
        indexLabelFontColor="#5A5757"
        indexLabelPlacement="outside"
        dataPoints={dataPoints}
        startAngle={-90}
      />
    </div>
  );
};

export default LowStockProductsList;
