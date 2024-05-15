import React, { useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";

interface RealtimeChartProps {
  data: { x: number; y: number }[];
  xName: string;
  yName: string;
}

const RealtimeChart: React.FC<RealtimeChartProps> = ({
  data,
  xName,
  yName,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadApexCharts = async () => {
      if (typeof window !== "undefined") return;
      const ApexCharts = await import("apexcharts");

      const options: ApexOptions = {
        series: [{ name: yName, data: data }], // Use chartData instead of data
        chart: {
          id: "realtime-totalCost",
          height: 350,
          type: "line",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Real-time Chart",
          align: "left",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
          range: 60000, // 1 minute range for X-axis
          title: {
            text: xName,
          },
        },
        yaxis: {
          title: {
            text: yName,
          },
        },
        legend: {
          show: false,
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
    };

    loadApexCharts();
  }, [data, xName, yName]);

  return <div id="realtime-chart" ref={chartRef} />;
};

export default RealtimeChart;
