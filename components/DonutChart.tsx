import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const DynamicApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const DonutChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      chartRef.current &&
      data &&
      data.length > 0
    ) {
      import('apexcharts').then(({ default: ApexCharts }) => {
        const colors = [
          '#1f77b4',
          '#ff7f0e',
          '#2ca02c',
          '#d62728',
          '#9467bd',
          '#8c564b',
          '#e377c2',
          '#7f7f7f',
          '#bcbd22',
          '#17becf',
        ];
        const options = {
          series: data.map((item) => item.value),
          labels: data.map((item) => item.name),
          colors: colors.slice(0, data.length),
          chart: {
            height: 500,
            type: 'donut',
          },
          plotOptions: {
            pie: {
              donut: {
                size: '70%',
              },
            },
          },
          legend: {
            show: true,
            position: 'bottom',
          },
          tooltip: {
            enabled: true,
            style: {
              fontSize: '16px',
            },
          },
        };

        if (!chartInstance.current) {
          chartInstance.current = new ApexCharts(chartRef.current, options);
          chartInstance.current.render();
        } else {
          chartInstance.current.updateOptions(options);
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data]);

  return <div className='w-1/2 p-4' ref={chartRef} />;
};

export default DonutChart;
