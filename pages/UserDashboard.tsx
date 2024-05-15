import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GridBackgroundDemo } from '../components/GridBackground';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { InfiniteMovingCards } from 'components/Infinite-Moving-Cards';
import { CLIENT_STATIC_FILES_RUNTIME_AMP } from 'next/dist/shared/lib/constants';

const UserDashboard = () => {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [serverDataWeek, setServerDataWeek] = useState([]);
  const [timeStartWeek, setTimeStartWeek] = useState('');
  const [timeEndWeek, setTimeEndWeek] = useState('');

  const [timeStartDay, setTimeStartDay] = useState('');
  const [timeEndDay, setTimeEndDay] = useState('');
  const [isAollocationDataFetched, setIsAollocationDataFetched] =
    useState(false);
  const [allocationData, setAllocationData] = useState([
    { name: 'CPU Cost', value: 0 },
    { name: 'GPU Cost', value: 0 },
    { name: 'RAM Cost', value: 0 },
    { name: 'Network Cost', value: 0 },
    { name: 'Load Balancer Cost', value: 0 },
    { name: 'PV Cost', value: 0 },
    { name: 'Shared Cost', value: 0 },
    { name: 'External Cost', value: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:9090/model/allocation/summary?window=lastweek&aggregate=cluster&accumulate=false'
        );
        const fetchedData = response.data.data.sets;
        // console.log(fetchedData);

        const newData = fetchedData.map((item) => ({
          timeStart: item.window.start,
          timeEnd: item.window.end,
          totalCost: item.allocations['cluster-one'].totalCost,
        }));

        setServerDataWeek(newData);
        setIsDataFetched(true);
        setTimeStartWeek(newData[0]?.timeStart);
        setTimeEndWeek(newData[newData.length - 1]?.timeEnd);
      } catch (error) {
        console.error('Error fetching totalcost data:', error);
      }
    };

    if (!isDataFetched) {
      fetchData();
    }
  }, [isDataFetched]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:9090/model/allocation/summary/topline?window=7d&aggregate=cluster&accumulate=false'
        );
        const fetchedData = response.data.data.combined.allocations['total'];
        console.log('resource allocation: ', fetchedData);

        const newData = [
          { name: 'CPU Cost', value: fetchedData.cpuCost },
          { name: 'GPU Cost', value: fetchedData.gpuCost },
          { name: 'RAM Cost', value: fetchedData.ramCost },
          { name: 'Network Cost', value: fetchedData.networkCost },
          { name: 'Load Balancer Cost', value: fetchedData.loadBalancerCost },
          { name: 'PV Cost', value: fetchedData.pvCost },
          { name: 'Shared Cost', value: fetchedData.sharedCost },
          { name: 'External Cost', value: fetchedData.externalCost },
        ];
        console.log('>>> newData: ', newData);
        setAllocationData(newData);
        setIsAollocationDataFetched(true);

        console.log('>>> newData timeStart: ', fetchedData.start);
        setTimeStartDay(fetchedData.start);
        setTimeEndDay(fetchedData.end);
      } catch (error) {
        console.error('Error fetching allocation data:', error);
      }
    };

    if (!isDataFetched) {
      fetchData();
    }
  }, [isAollocationDataFetched]);

  const chartItems = [
    {
      type: 'donut',
      data: allocationData, // Data for DonutChart
      xName: '',
      yName: '', // Any additional props if needed
    },
    {
      type: 'area',
      data: serverDataWeek, // Data for AreaChart
      xName: 'Time',
      yName: 'Total Cost',
    },
  ];

  return (
    <div className='relative h-[55rem]'>
      <NavBar />
      <GridBackgroundDemo />
      <div className='absolute top-[100px] inset-0 flex items-center justify-center'>
        <InfiniteMovingCards
          items={chartItems}
          direction='left'
          speed='normal'
          pauseOnHover={true}
        />
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
