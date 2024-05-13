// @ts-ignore
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const DynamicApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const BarChart = ({ data, xName, yName }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      chartRef.current &&
      data &&
      Object.keys(data).length > 0
    ) {
      // Dynamically import ApexCharts only when window is defined (client-side)
      import('apexcharts').then(({ default: ApexCharts }) => {
        const sortedData = Object.entries(data)
          .sort((a: [string, number], b: [string, number]) => b[1] - a[1]) // Sort by value
          .slice(0, 10); // Take top 10 data points

        const metrixesKeys = sortedData.map(([key]) => key);
        const metrixesValues = sortedData.map(([, value]) => value);

        const options = {
          series: [{ name: yName, data: metrixesValues }],
          chart: { height: 350, width: 600, type: 'pie' },
          xaxis: { categories: metrixesKeys },
          plotOptions: {
            bar: {
              dataLabels: { position: 'top' }, // Show labels at the top of each bar
            },
          },
          legend: {
            show: true, // Show legend
            position: 'bottom', // Position legend at the bottom
          },
          dataLabels: { enabled: false },
        };

        const chart = new ApexCharts(chartRef.current, options);
        chart.render();

        // Clean up function to destroy the chart when the component unmounts
        return () => {
          chart.destroy();
        };
      });
    }
  }, [data, xName, yName]);

  return <div className='w-1/2 p-4' ref={chartRef} />;
};

export default BarChart;
