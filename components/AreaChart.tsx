// @ts-ignore
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const DynamicApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const AreaChart = ({ data, xName, yName }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data && data.length > 0) {
      import('apexcharts').then(({ default: ApexCharts }) => {
        const metrixesKeys = data.map((item) => item.timeStart);
        const metrixesValues = data.map((item) => item.totalCost);

        const options = {
          series: [{ name: yName, data: metrixesValues }],
          chart: { height: 350, width: 600, type: 'area' },
          xaxis: { categories: metrixesKeys },
          plotOptions: {
            bar: {
              dataLabels: { position: 'top' }, // Label on top of figure
            },
          },
          legend: {
            show: true, // Shows legend
            position: 'bottom', // Position legend at the bottom
          },
          dataLabels: { enabled: false },
        };

        const chart = new ApexCharts(chartRef.current, options);
        chart.render();

        return () => {
          chart.destroy();
        };
      });
    }
  }, [data, xName, yName]);

  return <div className='w-1/2 p-4' ref={chartRef} />;
};

export default AreaChart;
