// @ts-ignore

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import BarChart from "../../components/BarCharts";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const CostDashboard = () => {
  const [displayOption, setDisplayOption] = useState("namespace");
  const [cpuCostPerNamespace, setCpuCostPerNamespace] = useState({});
  const [loadBalancerCostPerNamespace, setLoadBalancerCostPerNamespace] =
    useState({});
  const [ramCostPerNamespace, setRamCostPerNamespace] = useState({});
  const [totalCostPerNamespace, setTotalCostPerNamespace] = useState({});
  const [timeStartPerNamespace, setTimeStartPerNamespace] = useState("");
  const [timeEndPerNamespace, setTimeEndPerNamespace] = useState("");

  const [cpuCostPerNode, setCpuCostPerNode] = useState({});
  const [loadBalancerCostPerNode, setLoadBalancerCostPerNode] = useState({});
  const [ramCostPerNode, setRamCostPerNode] = useState({});
  const [totalCostPerNode, setTotalCostPerNode] = useState({});
  const [timeStartPerNode, setTimeStartPerNode] = useState("");
  const [timeEndPerNode, setTimeEndPerNode] = useState("");

  const handleOptionChange = (event) => {
    setDisplayOption(event.target.value);
  };

  // cost per Namespace
  useEffect(() => {
    const fetchCost = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/model/allocation?window=24h&aggregate=controllerKind,controller&accumulate=true"
        );

        const cpuCostPerNamespaceObj = {};
        const loadBalancerCostPerNamespaceObj = {};
        const rawCostPerNamespaceObj = {};
        const totalCostPerNamespaceObj = {};

        const fetchedData = response.data.data[0];
        console.log(">>> fetchedData: ", fetchedData);

        const namespace = Object.keys(fetchedData);
        namespace.forEach((subNameSpace) => {
          cpuCostPerNamespaceObj[subNameSpace] =
            fetchedData[subNameSpace].cpuCost;
          loadBalancerCostPerNamespaceObj[subNameSpace] =
            fetchedData[subNameSpace].loadBalancerCost;
          rawCostPerNamespaceObj[subNameSpace] =
            fetchedData[subNameSpace].ramCost;
          totalCostPerNamespaceObj[subNameSpace] =
            fetchedData[subNameSpace].totalCost;
        });

        console.log(">>> cpuCostObj: ", cpuCostPerNamespaceObj);
        console.log(
          ">>> loadBalancerCost value: ",
          loadBalancerCostPerNamespaceObj
        );
        console.log(">>> ramCost value: ", rawCostPerNamespaceObj);
        console.log(">>> total value: ", totalCostPerNamespaceObj);

        setCpuCostPerNamespace(cpuCostPerNamespaceObj);
        setLoadBalancerCostPerNamespace(loadBalancerCostPerNamespaceObj);
        setRamCostPerNamespace(rawCostPerNamespaceObj);
        setTotalCostPerNamespace(totalCostPerNamespaceObj);

        const fetchTimeStart = fetchedData["__idle__/__idle__"].start;
        const fetchTimeEnd = fetchedData["__idle__/__idle__"].end;
        console.log(">>> fetchTimeStart: ", fetchTimeStart);
        console.log(">>> fetchTimeEnd: ", fetchTimeEnd);
        setTimeStartPerNamespace(fetchTimeStart);
        setTimeEndPerNamespace(fetchTimeEnd);
      } catch (error) {
        console.error("Error fetching sub cost data per namespace:", error);
      }
    };

    fetchCost();
  }, []);

  // cost per Node
  useEffect(() => {
    const fetchCost = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/model/allocation?window=24h&aggregate=node&accumulate=true"
        );

        const cpuCostPerNodeObj = {};
        const loadBalancerCostPerNodeObj = {};
        const rawCostPerNodeObj = {};
        const totalCostPerNodeObj = {};

        const fetchedData = response.data.data[0];
        console.log(">>> fetchedData by Node: ", fetchedData);

        const node = Object.keys(fetchedData);
        node.forEach((subNode) => {
          cpuCostPerNodeObj[subNode] = fetchedData[subNode].cpuCost;
          loadBalancerCostPerNodeObj[subNode] =
            fetchedData[subNode].loadBalancerCost;
          rawCostPerNodeObj[subNode] = fetchedData[subNode].ramCost;
          totalCostPerNodeObj[subNode] = fetchedData[subNode].totalCost;
        });

        console.log(">>> cpuCostObj per Node: ", cpuCostPerNodeObj);
        console.log(
          ">>> loadBalancerCost value per Node: ",
          loadBalancerCostPerNodeObj
        );
        console.log(">>> ramCost value per Node: ", rawCostPerNodeObj);
        console.log(">>> total value per Node: ", totalCostPerNodeObj);

        setCpuCostPerNode(cpuCostPerNodeObj);
        setLoadBalancerCostPerNode(loadBalancerCostPerNodeObj);
        setRamCostPerNode(rawCostPerNodeObj);
        setTotalCostPerNode(totalCostPerNodeObj);

        const fetchTimeStart = fetchedData["__idle__"].start;
        const fetchTimeEnd = fetchedData["__idle__"].end;
        console.log(">>> fetchTimeStart: ", fetchTimeStart);
        console.log(">>> fetchTimeEnd: ", fetchTimeEnd);
        setTimeStartPerNode(fetchTimeStart);
        setTimeEndPerNode(fetchTimeEnd);
      } catch (error) {
        console.error("Error fetching sub cost data per node:", error);
      }
    };

    fetchCost();
  }, []);

  // useEffect(() => {
  //   const fetchTotalCost = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:9090/api/v1/costData"
  //       );
  //       console.log(">>> total cost: ", response.data);
  //       const totalCost = response.data.data[0]?.totalCost || 0;
  //       setTotalCost((prevData) => [...prevData, totalCost]);
  //     } catch (error) {
  //       console.error("Error fetching total cost data:", error);
  //     }
  //   };

  //   // Fetch initial data when component mounts
  //   fetchTotalCost();

  //   // Fetch data every 5 minutes
  //   const interval = setInterval(fetchTotalCost, 300000); // 5 * 60 * 1000 milliseconds

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(interval);
  // }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex flex-row text-center mx-auto my-8 font-base">
        <label htmlFor="display-option" className="mr-2">
          Display by:
        </label>
        <select
          id="display-option"
          value={displayOption}
          onChange={handleOptionChange}
          className="w-30pt px-2 py-1 border border-gray-300 rounded font-bold"
        >
          <option value="namespace">Namespace</option>
          <option value="node">Node</option>
          <option value="realtime">Realtime</option>
        </select>
      </div>

      {displayOption == "namespace" && (
        <>
          <h2 className="text-base ml-10">
            time start: {timeStartPerNamespace}
          </h2>
          <h2 className="text-base ml-10"> time end: {timeEndPerNamespace} </h2>
          <div className="flex flex-row">
            <div className="w-1/2 p-4">
              <BarChart
                data={cpuCostPerNamespace}
                xName="Namespace"
                yName="CPU Cost"
              />
              <h1 className="font-bold justify-items-center text-center m-4">
                Figure 1. Top 10 CPU Cost per Namespace per 24 hour
              </h1>
            </div>
            <div className="w-1/2 p-4">
              <BarChart
                data={loadBalancerCostPerNamespace}
                xName="Namespace"
                yName="Network Cost"
              />
              <h1 className="font-bold justify-items-center text-center m-4">
                Figure 2. Top 10 LoadBalancer Cost per Namespace per 24 hour
              </h1>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/2 p-4">
              <BarChart
                data={ramCostPerNamespace}
                xName="Namespace"
                yName="RAM Cost"
              />
              <h1 className="font-bold justify-items-center text-center m-4">
                Figure 3. Top 10 Raw Cost per Namespace per 24 hour
              </h1>
            </div>
            <div className="w-1/2 p-4">
              <BarChart
                data={totalCostPerNamespace}
                xName="Namespace"
                yName="Total Cost"
              />
              <h1 className="font-bold justify-items-center text-center m-4">
                Figure 4. Top 10 Total Cost per Namespace per 24 hour
              </h1>
            </div>
          </div>
        </>
      )}

      {displayOption == "node" && (
        <>
          <h2 className="text-base ml-10">time start: {timeStartPerNode}</h2>
          <h2 className="text-base ml-10"> time end: {timeEndPerNode} </h2>
          <div className="flex flex-row">
            <div className="w-1/2 p-4">
              <BarChart
                data={cpuCostPerNode}
                xName="Node Name"
                yName="CPU Cost"
              />
              <h1 className="font-bold justify-items-center text-center m-4">
                Figure 1. CPU Cost per Node per 24 hour
              </h1>
            </div>
            <div className="w-1/2 p-4">
              <BarChart
                data={loadBalancerCostPerNode}
                xName="Node Name"
                yName="Network Cost"
              />
              <h1 className="font-bold justify-items-center text-center m-4">
                Figure 2. LoadBalancer Cost per Node per 24 hour
              </h1>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/2 p-4">
              <BarChart
                data={ramCostPerNode}
                xName="Node Name"
                yName="RAM Cost"
              />
              <h1 className="font-bold justify-items-center text-center m-4">
                Figure 3. Raw Cost per Node per 24 hour
              </h1>
            </div>
            <div className="w-1/2 p-4">
              <BarChart
                data={totalCostPerNode}
                xName="Namespace"
                yName="Total Cost"
              />
              <h1 className="font-bold justify-items-center text-center m-4">
                Figure 4. Total Cost per Node per 24 hour
              </h1>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default CostDashboard;
