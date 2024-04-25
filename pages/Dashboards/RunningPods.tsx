import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";


interface RunningPod {
  index: number;
  value: number;
}

interface GetRunningPodsChartProps {
  data: RunningPod[];
}

const GetRunningPodsChart: React.FC<GetRunningPodsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400} minWidth={780}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="index"
          tick={{ fill: "black" }}
          type="number"
          domain={[0, "auto"]}
        />
        <YAxis tick={{ fill: "black" }} />
        <Tooltip labelStyle={{ color: "black" }} />
        <Legend iconType="line" verticalAlign="bottom" height={36} />
        <Line
          type="monotone"
          dataKey="value"
          name="Number of Active Pods"
          stroke="black"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const RunningPodsPage: React.FC<{ runningPods: RunningPod[] }> = ({
  runningPods,
}) => {
  const [runningPodsData, setRunningPodsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator

  const fetchRunningPodsData = async () => {
    try {
      const response = await fetch("/api/fetchRunningPods");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setRunningPodsData((prevData) => [
        ...prevData,
        { index: prevData.length * 10, value: data },
      ]);
      setLoading(false); // Set loading to false after successful fetch
    } catch (error) {
      console.error("Error fetching running pods data: ", error);
      setLoading(false); // Set loading to false on error
    }
  };

  useEffect(() => {
    fetchRunningPodsData(); // Initial fetch

    const intervalId = setInterval(fetchRunningPodsData, 10000); // Fetch data every 10 seconds

    return () => {
      clearInterval(intervalId); // Clean up interval on component unmount
    };
  }, []);

  useEffect(() => {
    console.log(">>> current data into chart: ", runningPodsData);
  }, [runningPodsData]);

  return (
    <div className="flex flex-col relative items-center">
      <h1 className="font-bold text-lg mx-auto">
        Figure 1. Number of Active Pods
      </h1>
      <GetRunningPodsChart data={runningPods} />
    </div>
  );
};

export default RunningPodsPage;
