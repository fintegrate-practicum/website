import React from 'react';
// @ts-expect-error  i need it to import the package @canvasjs/react-charts
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
interface DataPoint {
  x?: number | Date;
  y: number;
  indexLabel?: string;
}

interface BaseGraphProps {
  animationEnabled: boolean;
  prefix?: string;
  title?: string;
  exportEnabled?: boolean;
  theme: 'light1' | 'dark1' | 'dark2';
  text: string;
  includeZero?: boolean;
  type: 'column' | 'spline' | 'stepLine' | 'pie';
  indexLabelPlacement?:
    | 'bottom'
    | 'center'
    | 'near'
    | 'auto'
    | 'inside'
    | 'outside';
  indexLabelFontColor?: string;
  indexLabel?: string;
  xValueFormatString?: string;
  yValueFormatString?: string;
  valueFormatString?: 'MMM' | 'MMMM' | 'YYYY' | 'YY' | 'DD' | 'DDD' | 'DDDD';
  dataPoints: DataPoint[];
  startAngle: -90;
}

const BaseGraph = (
  props: React.ComponentProps<typeof CanvasJSChart> & BaseGraphProps,
) => {
  const {
    animationEnabled,
    prefix,
    title,
    exportEnabled,
    theme,
    text,
    includeZero,
    type,
    indexLabelPlacement,
    indexLabelFontColor,
    indexLabel,
    startAngle,
    dataPoints,
    yValueFormatString,
    xValueFormatString,
    valueFormatString,
  } = props;

  const axisYptionsIncludeprefix = {
    includeZero: includeZero,
    title: title,

    prefix: prefix,
  };
  const axisYptions = {
    includeZero: includeZero,
    title: title,
  };
  const options = {
    animationEnabled: animationEnabled,
    exportEnabled: exportEnabled,
    theme: theme,
    title: {
      text: text,
    },
    axisY: prefix ? axisYptionsIncludeprefix : axisYptions,
    axisX: {
      valueFormatString: valueFormatString,
    },
    data: [
      {
        indexLabel: indexLabel,
        startAngle: startAngle,
        type: type,
        indexLabelFontColor: indexLabelFontColor,
        indexLabelPlacement: indexLabelPlacement,
        yValueFormatString: yValueFormatString,
        xValueFormatString: xValueFormatString,
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div
      style={{ height: '300px', width: '100%' }}
      data-testid='canvasjs-chart'
    >
      <CanvasJSChart options={options} />
    </div>
  );
};

export default BaseGraph;
