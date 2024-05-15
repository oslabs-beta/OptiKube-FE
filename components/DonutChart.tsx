// @ts-ignore
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const DynamicApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const DonutChart = ({ data, xName, yName }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      chartRef.current &&
      data &&
      data.length > 0
    ) {
      // Dynamically import ApexCharts only when window is defined (client-side)
      import('apexcharts').then(({ default: ApexCharts }) => {
        const options = {
          series: data.map((item) => item.value),
          labels: data.map((item) => item.name),
          chart: {
            height: 500,
            type: 'donut',
          },
          plotOptions: {
            pie: {
              donut: {
                size: '70%', // Adjust the size of the donut chart
              },
            },
          },
          legend: {
            show: true, // Show legend
            // position: 'bottom', // Position legend at the bottom
          },
        };

        const chart = new ApexCharts(chartRef.current, options);
        chart.render();

        // Clean up function to destroy the chart when the component unmounts
        return () => {
          chart.destroy();
        };
      });
    }
  }, [data]);

  return <div className='w-1/2 p-4' ref={chartRef} />;
};

export default DonutChart;