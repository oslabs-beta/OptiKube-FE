// @ts-ignore

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// import AreaChart from '../../components/AreaCharts';
import BarChart from '../../components/BarCharts';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const CostDashboard = () => {
  const [displayOption, setDisplayOption] = useState('namespace');
  const [timeOption, setTimeOption] = useState('12h');

  const [cpuCostPerNamespace, setCpuCostPerNamespace] = useState({});
  const [loadBalancerCostPerNamespace, setLoadBalancerCostPerNamespace] =
    useState({});
  const [ramCostPerNamespace, setRamCostPerNamespace] = useState({});
  const [totalCostPerNamespace, setTotalCostPerNamespace] = useState({});
  const [timeStartPerNamespace, setTimeStartPerNamespace] = useState('');
  const [timeEndPerNamespace, setTimeEndPerNamespace] = useState('');

  const [cpuCostPerNode, setCpuCostPerNode] = useState({});
  const [loadBalancerCostPerNode, setLoadBalancerCostPerNode] = useState({});
  const [ramCostPerNode, setRamCostPerNode] = useState({});
  const [totalCostPerNode, setTotalCostPerNode] = useState({});
  const [timeStartPerNode, setTimeStartPerNode] = useState('');
  const [timeEndPerNode, setTimeEndPerNode] = useState('');

  const [cpuCostPerDeployment, setCpuCostPerDeployment] = useState({});
  const [loadBalancerCostPerDeployment, setLoadBalancerCostPerDeployment] =
    useState({});
  const [ramCostPerDeployment, setRamCostPerDeployment] = useState({});
  const [totalCostPerDeployment, setTotalCostPerDeployment] = useState({});
  const [timeStartPerDeployment, setTimeStartPerDeployment] = useState('');
  const [timeEndPerDeployment, setTimeEndPerDeployment] = useState('');

  const handleOptionChange = (event) => {
    setDisplayOption(event.target.value);
  };

  // Effect to refresh the window when timeOption changes
  const handleTimeChange = (event) => {
    const newTimeOption = event.target.value;
    setTimeOption(newTimeOption);
  };

  // cost per Namespace
  useEffect(() => {
    const fetchCost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/model/allocation?window=${timeOption}&aggregate=namespace&accumulate=true`
        );

        const cpuCostPerNamespaceObj = {};
        const loadBalancerCostPerNamespaceObj = {};
        const rawCostPerNamespaceObj = {};
        const totalCostPerNamespaceObj = {};

        const fetchedData = response.data.data[0];
        console.log('>>> fetchedData: ', fetchedData);

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

        const fetchTimeStart = fetchedData['__idle__'].start;
        const fetchTimeEnd = fetchedData['__idle__'].end;
        console.log('>>> fetchTimeStart: ', fetchTimeStart);
        console.log('>>> fetchTimeEnd: ', fetchTimeEnd);
        setTimeStartPerNamespace(fetchTimeStart);
        setTimeEndPerNamespace(fetchTimeEnd);

        console.log('>>> cpuCostObj: ', cpuCostPerNamespaceObj);
        console.log(
          '>>> loadBalancerCost value: ',
          loadBalancerCostPerNamespaceObj
        );
        console.log('>>> ramCost value: ', rawCostPerNamespaceObj);
        console.log('>>> total value: ', totalCostPerNamespaceObj);

        setCpuCostPerNamespace(cpuCostPerNamespaceObj);
        setLoadBalancerCostPerNamespace(loadBalancerCostPerNamespaceObj);
        setRamCostPerNamespace(rawCostPerNamespaceObj);
        setTotalCostPerNamespace(totalCostPerNamespaceObj);
      } catch (error) {
        console.error('Error fetching sub cost data per namespace:', error);
      }
    };

    fetchCost();
  }, [timeOption]);

  // cost per Node
  useEffect(() => {
    const fetchCost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/model/allocation?window=${timeOption}&aggregate=node&accumulate=true`
        );

        const cpuCostPerNodeObj = {};
        const loadBalancerCostPerNodeObj = {};
        const rawCostPerNodeObj = {};
        const totalCostPerNodeObj = {};

        const fetchedData = response.data.data[0];
        console.log('>>> fetchedData by Node: ', fetchedData);

        const node = Object.keys(fetchedData);
        node.forEach((subNode) => {
          cpuCostPerNodeObj[subNode] = fetchedData[subNode].cpuCost;
          loadBalancerCostPerNodeObj[subNode] =
            fetchedData[subNode].loadBalancerCost;
          rawCostPerNodeObj[subNode] = fetchedData[subNode].ramCost;
          totalCostPerNodeObj[subNode] = fetchedData[subNode].totalCost;
        });

        const fetchTimeStart = fetchedData['__idle__'].start;
        const fetchTimeEnd = fetchedData['__idle__'].end;
        console.log('>>> fetchTimeStart: ', fetchTimeStart);
        console.log('>>> fetchTimeEnd: ', fetchTimeEnd);

        setTimeStartPerNode(fetchTimeStart);
        setTimeEndPerNode(fetchTimeEnd);
        setCpuCostPerNode(cpuCostPerNodeObj);
        setLoadBalancerCostPerNode(loadBalancerCostPerNodeObj);
        setRamCostPerNode(rawCostPerNodeObj);
        setTotalCostPerNode(totalCostPerNodeObj);
      } catch (error) {
        console.error('Error fetching sub cost data per node:', error);
      }
    };

    fetchCost();
  }, [timeOption]);

  // cost per Deployment
  useEffect(() => {
    const fetchCost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/model/allocation?window=${timeOption}&aggregate=controllerKind,controller&accumulate=true`
        );

        const cpuCostPerDeploymentObj = {};
        const loadBalancerCostPerDeploymentObj = {};
        const rawCostPerDeploymentObj = {};
        const totalCostPerDeploymentObj = {};

        const fetchedData = response.data.data[0];
        console.log('>>> fetchedData: ', fetchedData);

        const deployment = Object.keys(fetchedData);
        deployment.forEach((subDeployment) => {
          cpuCostPerDeploymentObj[subDeployment] =
            fetchedData[subDeployment].cpuCost;
          loadBalancerCostPerDeploymentObj[subDeployment] =
            fetchedData[subDeployment].loadBalancerCost;
          rawCostPerDeploymentObj[subDeployment] =
            fetchedData[subDeployment].ramCost;
          totalCostPerDeploymentObj[subDeployment] =
            fetchedData[subDeployment].totalCost;
        });

        const fetchTimeStart = fetchedData['__idle__/__idle__'].start;
        const fetchTimeEnd = fetchedData['__idle__/__idle__'].end;
        console.log('>>> fetchTimeStart: ', fetchTimeStart);
        console.log('>>> fetchTimeEnd: ', fetchTimeEnd);
        setTimeStartPerDeployment(fetchTimeStart);
        setTimeEndPerDeployment(fetchTimeEnd);

        console.log('>>> cpuCostObj: ', cpuCostPerDeploymentObj);
        console.log(
          '>>> loadBalancerCost value: ',
          loadBalancerCostPerDeploymentObj
        );
        console.log('>>> ramCost value: ', rawCostPerDeploymentObj);
        console.log('>>> total value: ', totalCostPerDeploymentObj);

        setCpuCostPerDeployment(cpuCostPerDeploymentObj);
        setLoadBalancerCostPerDeployment(loadBalancerCostPerDeploymentObj);
        setRamCostPerDeployment(rawCostPerDeploymentObj);
        setTotalCostPerDeployment(totalCostPerDeploymentObj);
      } catch (error) {
        console.error('Error fetching sub cost data per Deployment:', error);
      }
    };

    fetchCost();
  }, [timeOption]);

  return (
    <div className='flex flex-col'>
      <NavBar />
      <div className='flex flex-row text-center mx-auto my-8 font-base'>
        <label htmlFor='display-option' className='mr-2'>
          Display by:
        </label>
        <select
          id='display-option'
          value={displayOption}
          onChange={handleOptionChange}
          className='w-30pt px-2 py-1 border border-gray-300 rounded font-bold'
        >
          <option value='namespace'>Namespace</option>
          <option value='node'>Node</option>
          <option value='deployment'>Deployment</option>
        </select>
        <select
          id='display-option'
          value={timeOption}
          onChange={handleTimeChange}
          className='w-30pt px-2 mx-2 py-1 border border-gray-300 rounded font-bold'
        >
          <option value='12h'>12h</option>
          <option value='24h'>24h</option>
          <option value='3d'>3d</option>
          <option value='1w'>1w</option>
          <option value='30d'>30d</option>
        </select>
      </div>

      {displayOption == 'namespace' && (
        <>
          <h2 className='text-base ml-10'>
            Time Start: {timeStartPerNamespace}
          </h2>
          <h2 className='text-base ml-10 mb-4'>
            {' '}
            Time End: {timeEndPerNamespace}{' '}
          </h2>
          <div className='flex flex-row shadow-lg'>
            <div className='w-1/2 p-4 shadow-inner'>
              <BarChart
                data={cpuCostPerNamespace}
                xName='Namespace'
                yName='CPU Cost'
              />
              <h1 className='font-bold justify-items-center text-center my-0'>
                Figure 1. CPU Cost per Namespace per {timeOption}
              </h1>
            </div>
            <div className='w-1/2 p-4 shadow-inner '>
              <BarChart
                data={loadBalancerCostPerNamespace}
                xName='Namespace'
                yName='Network Cost'
              />
              <h1 className='font-bold justify-items-center text-center my-0'>
                Figure 2. LoadBalancer Cost per Namespace per {timeOption}
              </h1>
            </div>
          </div>
          <div className='flex flex-row shadow-lg'>
            <div className='w-1/2 p-4 shadow-inner'>
              <BarChart
                data={ramCostPerNamespace}
                xName='Namespace'
                yName='RAM Cost'
              />
              <h1 className='font-bold justify-items-center text-center my-0'>
                Figure 3. Raw Cost per Namespace per {timeOption}
              </h1>
            </div>
            <div className='w-1/2 p-4 shadow-inner'>
              <BarChart
                data={totalCostPerNamespace}
                xName='Namespace'
                yName='Total Cost'
              />
              <h1 className='font-bold justify-items-center text-center my-0'>
                Figure 4. Total Cost per Namespace per {timeOption}
              </h1>
            </div>
          </div>
        </>
      )}

      {displayOption == 'node' && (
        <>
          <h2 className='text-base ml-10'>time start: {timeStartPerNode}</h2>
          <h2 className='text-base ml-10 mb-4'> time end: {timeEndPerNode} </h2>
          <div className='flex flex-row shadow-lg'>
            <div className='w-1/2 p-4 shadow-inner'>
              <BarChart
                data={cpuCostPerNode}
                xName='Node Name'
                yName='CPU Cost'
              />
              <h1 className='font-bold justify-items-center text-center my-0'>
                Figure 1. CPU Cost per Node per {timeOption}
              </h1>
            </div>
            <div className='w-1/2 p-4 shadow-inner'>
              <BarChart
                data={loadBalancerCostPerNode}
                xName='Node Name'
                yName='Network Cost'
              />
              <h1 className='font-bold justify-items-center text-center my-0'>
                Figure 2. LoadBalancer Cost per Node per {timeOption}
              </h1>
            </div>
          </div>
          <div className='flex flex-row shadow-lg'>
            <div className='w-1/2 p-4'>
              <BarChart
                data={ramCostPerNode}
                xName='Node Name'
                yName='RAM Cost'
              />
              <h1 className='font-bold justify-items-center text-center my-0'>
                Figure 3. Raw Cost per Node per {timeOption}
              </h1>
            </div>
            <div className='w-1/2 p-4 shadow-inner'>
              <BarChart
                data={totalCostPerNode}
                xName='Namespace'
                yName='Total Cost'
              />
              <h1 className='font-bold justify-items-center text-center my-0'>
                Figure 4. Total Cost per Node per {timeOption}
              </h1>
            </div>
          </div>
        </>
      )}

      {displayOption == 'deployment' && (
        <>
          <h2 className='text-base ml-10'>
            time start: {timeStartPerDeployment}
          </h2>
          <h2 className='text-base ml-10 mb-4'>
            {' '}
            time end: {timeEndPerDeployment}{' '}
          </h2>
          <div className='flex flex-row shadow-lg'>
            <div className='w-1/2 p-4 shadow-inner'>
              <BarChart
                data={cpuCostPerDeployment}
                xName='Namespace'
                yName='CPU Cost'
              />
              <h1 className='font-bold justify-items-center text-center my-0'>
                Figure 1. Top 10 CPU Cost per Deployment per {timeOption}
              </h1>
            </div>
            <div className='w-1/2 p-4 shadow-inner'>
              <BarChart
                data={loadBalancerCostPerDeployment}
                xName='Namespace'
                yName='Network Cost'
              />
              <h1 className='font-bold justify-items-center text-center my-0'>
                Figure 2. Top 10 LoadBalancer Cost per Deployment per{' '}
                {timeOption}
              </h1>
            </div>
          </div>
          <div className='flex flex-row shadow-lg'>
            <div className='w-1/2 p-4 shadow-inner'>
              <BarChart
                data={ramCostPerDeployment}
                xName='Namespace'
                yName='RAM Cost'
              />
              <h1 className='font-bold justify-items-center text-center my-0'>
                Figure 3. Top 10 Raw Cost per Deployment per {timeOption}
              </h1>
            </div>
            <div className='w-1/2 p-4 shadow-inner'>
              <BarChart
                data={totalCostPerDeployment}
                xName='Namespace'
                yName='Total Cost'
              />
              <h1 className='font-bold justify-items-center text-center my-0'>
                Figure 4. Top 10 Total Cost per Deployment per {timeOption}
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
