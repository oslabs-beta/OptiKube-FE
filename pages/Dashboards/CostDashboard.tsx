// @ts-ignore

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import BarChart from "../../components/BarCharts";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const CostDashboard = () => {
  const [cpuCost, setCpuCost] = useState({});
  const [loadBalancerCost, setLoadBalancerCost] = useState({});
  const [ramCost, setRamCost] = useState({});

  useEffect(() => {
    const fetchCost = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/model/allocation?window=6h&aggregate=controllerKind,controller&accumulate=true"
        );

        const cpuCostObj = {};
        const loadBalancerCostObj = {};
        const rawCostObj = {};

        const fetchedData = response.data.data[0];
        console.log(">>> fetchedData: ", fetchedData);

        const namespace = Object.keys(fetchedData);
        namespace.forEach((subNameSpace) => {
          cpuCostObj[subNameSpace] = fetchedData[subNameSpace].cpuCost;
          loadBalancerCostObj[subNameSpace] =
            fetchedData[subNameSpace].loadBalancerCost;
          rawCostObj[subNameSpace] = fetchedData[subNameSpace].ramCost;
        });

        console.log(">>> cpuCostObj: ", cpuCostObj);
        console.log(">>> loadBalancerCost value: ", loadBalancerCostObj);
        console.log(">>> ramCost value: ", rawCostObj);

        setCpuCost(cpuCostObj);
        setLoadBalancerCost(loadBalancerCostObj);
        setRamCost(rawCostObj);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCost();
  }, []);

  return (
    <div className="flex flex-col">
      <NavBar />

      <div className="flex flex-row">
        <div className="w-1/2 p-4">
          <BarChart data={cpuCost} xName="Namespace" yName="CPU Cost" />
          <h1 className="font-bold justify-items-center text-center m-4">
            Figure 1. Top 10 CPU Cost per Namespace
          </h1>
        </div>
        <div className="w-1/2 p-4">
          <BarChart
            data={loadBalancerCost}
            xName="Namespace"
            yName="Network Cost"
          />
          <h1 className="font-bold justify-items-center text-center m-4">
            Figure 2. Top 10 LoadBalancer Cost per Namespace
          </h1>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/2 p-4">
          <BarChart data={ramCost} xName="Namespace" yName="RAM Cost" />
          <h1 className="font-bold justify-items-center text-center m-4">
            Figure 3. Top 10 Raw Cost per Namespace
          </h1>
        </div>
        <div className="w-1/2 p-4">

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CostDashboard;
