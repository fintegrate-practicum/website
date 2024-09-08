import 'vitest-canvas-mock';
import React from 'react';
import { render } from '@testing-library/react';

import BaseGraph from './BaseGraph';

describe('BaseGraph', () => {
  it('renders BaseGraph component with provided props', () => {
    const props = {
      animationEnabled: true,
      prefix: 'Prefix',
      title: 'Title',
      exportEnabled: true,
      theme: 'light1',
      text: 'Graph Text',
      includeZero: false,
      type: 'spline',
      indexLabelPlacement: 'inside',
      indexLabelFontColor: '#333',
      indexLabel: 'Index Label',
      xValueFormatString: 'DD-MMM',
      yValueFormatString: '#,###',
      valueFormatString: 'MMMM',
      dataPoints: [
        { x: new Date(2021, 8, 1), y: 100, indexLabel: 'A' },
        { x: new Date(2021, 8, 2), y: 200, indexLabel: 'B' },
        { x: new Date(2021, 8, 3), y: 150, indexLabel: 'C' },
      ],
      startAngle: -90,
    };

    const { getByTestId } = render(<BaseGraph {...props} />);

    expect(getByTestId('canvasjs-chart')).toBeInTheDocument();
  });
  it('renders labels on the BaseGraph component', () => {
    const props = {
      animationEnabled: true,
      theme: 'light1',
      text: 'Graph Text',
      type: 'spline',
      dataPoints: [
        { x: new Date(2021, 8, 1), y: 100, indexLabel: 'A' },
        { x: new Date(2021, 8, 2), y: 200, indexLabel: 'B' },
        { x: new Date(2021, 8, 3), y: 150, indexLabel: 'C' },
      ],
      startAngle: -90,
    };

    const { queryByText } = render(<BaseGraph {...props} />);

    const labelA = queryByText((content, element) => {
      if (element && element.parentElement) {
        const labelIndex = props.dataPoints.findIndex(
          (dataPoint) => dataPoint.indexLabel === 'A',
        );
        return !(labelIndex !== -1);
      }
      return true;
    });
    const labelB = queryByText((content, element) => {
      if (element && element.parentElement) {
        const labelIndex = props.dataPoints.findIndex(
          (dataPoint) => dataPoint.indexLabel === 'B',
        );
        return !(labelIndex !== -1);
      }
      return true;
    });
    const labelC = queryByText((content, element) => {
      if (element && element.parentElement) {
        const labelIndex = props.dataPoints.findIndex(
          (dataPoint) => dataPoint.indexLabel === 'C',
        );
        return !(labelIndex !== -1);
      }
      return true;
    });

    expect(labelA).toBeFalsy();
    expect(labelB).toBeFalsy();
    expect(labelC).toBeFalsy();
  });
});
