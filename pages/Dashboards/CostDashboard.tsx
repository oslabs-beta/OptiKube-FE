// @ts-ignore

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

interface CostData {
  timestamp: string;
  value: number;
}

const CostDashboard = () => {
  const [cpuCost, setCpuCost] = useState<CostData[] | undefined>({});

  useEffect(() => {
    const fetchCpuCost = async () => {
      try {
        const response = await axios.get<CostData[]>(
          "http://localhost:9090/model/allocation?window=6h&aggregate=controllerKind,controller&accumulate=true"
        );
        const cpuCostArr = {};

        Object.keys(response.data).forEach((key) => {
          const item = response.data[key];
          console.log(">>> item: ", item);
          
          Object.entries(item).forEach(([subKey, value]) => {
            console.log(">>> subkey 1: ", subKey);
            if (subKey == "cpuCost") {
                console.log(">>> subkey: ", subKey);
                console.log(">>> value: ", value);
              cpuCostArr[key] = { name: item.name, cpuCost: value };
            }
          });
        });

        console.log(">>> cpuCostArr: ", cpuCostArr);
        setCpuCost(cpuCostArr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCpuCost();
  }, []);

  const TimeSeriesChart = () => {
    if (!cpuCost) {
      return <div>Loading...</div>; // Handle loading state
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={cpuCost}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-90">
      <NavBar />
      <div>
        <TimeSeriesChart />
      </div>
      <Footer />
    </div>
  );
};

export default CostDashboard;
