// @ts-ignore

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/table';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const TrendsDashboard = () => {
  // const [kubecost, setKubecost] = useState({});

  // const rows = ['CPU', 'RAW', 'LoadBalance', 'TotalCost', 'Saving'];

  // const columns = [
  //   '__idle__',
  //   'kube-system',
  //   'kubecost',
  //   'dummy-nginx',
  //   'optikube',
  //   'keda',
  //   'dummy-php',
  //   'gmp-system',
  //   '__unmounted__',
  // ];

  // const fetchTrend = async (name) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:9090/model/allocation/trends?window=1d&aggregate=namespace&names=${name}&accumulate=true`
  //     );

  //     const totalCostValue =
  //       Number(
  //         response.data.data.sets[0]?.allocationTrends?.kubecost?.trends?.costs
  //           ?.totalCost?.relativeChange?.value
  //       ) * 100;
  //     console.log('>>> totalCostValue', totalCostValue);
  //     return totalCostValue;
  //   } catch (error) {
  //     console.error('Error fetching trend:', error);
  //     return 0; // Return a default value if fetching fails
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const results = await Promise.all(
  //         columns.map((column) => fetchTrend(column)) // Use column instead of row
  //       );
  //       const kubecostData = {};
  //       results.forEach((totalCost, index) => {
  //         kubecostData[columns[index]] = totalCost;
  //       });
  //       setKubecost(kubecostData);
  //       console.log('kubecost:', kubecostData);
  //     } catch (error) {
  //       console.error('Error fetching trends:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Empty dependency array for useEffect to run once on mount

  const [timeOption, setTimeOption] = useState('7d');
  const [data, setData] = useState({
    Namespace: null,
    CPU: null,
    GPU: null,
    RAW: null,
    Network: null,
    pvBytes: null,
    Efficiency: null,
  });

  const handleTimeChange = (event) => {
    const newTimeOption = event.target.value;
    setTimeOption(newTimeOption);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/model/allocation?window=7d&aggregate=namespace&accumulate=true`
        );
        console.log('>>> response.data: ', response.data.data[0]);

        const fetchedData = response.data.data[0];
        const entries = Object.entries(fetchedData);

        entries.forEach(([key, value]) => {
          console.log('>>> current data in data: ', fetchedData[key].cpuCores);
          setData((prevData) => ({
            ...prevData,
            [key]: {
              Namespace: key,
              CPU: fetchedData[key].cpuCores,
              GPU: fetchedData[key].gpuCount,
              RAW: fetchedData[key].ramBytes,
              Network: fetchedData[key].networkTransferBytes,
              pvBytes: fetchedData[key].pvBytes,
              Efficiency: fetchedData[key].totalEfficiency,
            },
          }));
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col'>
      <NavBar />
      <div className='flex flex-row items-center mt-14 mb-0 ml-8 mx-3'>
        <h2 className='font-bold text-2xl'>
          <label>Cumulative cost for last </label>
          <select
            id='display-option'
            value={timeOption}
            onChange={handleTimeChange}
            className='w-30 px-3 py-1 border border-gray-300 rounded font-bold mx-2 '
          >
            <option value='1d'>1d</option>
            <option value='7d'>7d</option>
            <option value='30d'>30d</option>
          </select>
          <label> by namespace</label>
        </h2>
      </div>

      <div className='flex flex-row  bg-slate-200 my-6 mx-3'>
        <Table isStriped aria-label='Example static collection table'>
          <TableHeader className='font-bold'>
            <TableColumn>Namespace</TableColumn>
            <TableColumn>CPU</TableColumn>
            <TableColumn>GPU</TableColumn>
            <TableColumn>RAW</TableColumn>
            <TableColumn>Network</TableColumn>
            <TableColumn>pvBytes</TableColumn>
            <TableColumn>Efficiency</TableColumn>
          </TableHeader>
          {/* <TableBody>
            <TableRow key='1'>
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key='2'>
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key='3'>
              <TableCell>Jane Fisher</TableCell>
              <TableCell>Senior Developer</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key='4'>
              <TableCell>William Howard</TableCell>
              <TableCell>Community Manager</TableCell>
              <TableCell>Vacation</TableCell>
            </TableRow> 
          </TableBody> */}
          <TableBody>
            {data &&
              Object.values(data).map((item) => (
                <TableRow key={item.Namespace}>
                  <TableCell>{item.Namespace}</TableCell>
                  <TableCell>{item.CPU}</TableCell>
                  <TableCell>{item.GPU}</TableCell>
                  <TableCell>{item.RAW}</TableCell>
                  <TableCell>{item.Network}</TableCell>
                  <TableCell>{item.pvBytes}</TableCell>
                  <TableCell>{item.Efficiency}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default TrendsDashboard;
