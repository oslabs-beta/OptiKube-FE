// UserDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GridBackgroundDemo } from '../components/GridBackground';
import AreaCharts from '../components/AreaCharts';
import DonutCharts from '../components/DonutCharts';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

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

  return (
    <div className='flex flex-col'>
      <NavBar />
      <div className='flex flex-row'>
        <div className='w-1/2 p-4 flex flex-col items-left mt-14 mb-0 ml-8 mx-3'>
          <h2 className='font-bold text-2xl'>Daily Cost for the Last Week</h2>
          <div className='flex flex-col'>
            <h2 className='text-base ml-2 mt-6 mb-2'>
              Time Start: {timeStartWeek}
            </h2>
            <h2 className='text-base ml-2'> Time End: {timeEndWeek} </h2>
          </div>
          <div className='pt-10'>
            {serverDataWeek.length > 0 && (
              <AreaCharts
                data={serverDataWeek}
                xName='Time'
                yName='Total Cost'
              />
            )}
          </div>
        </div>

        <div className='w-1/2 p-4 flex flex-col items-left mt-14 mb-0 ml-8 mx-3'>
          <h2 className='font-bold text-2xl'>Weekly Cost per Category</h2>
          <div className='flex flex-col'>
            <h2 className='text-base ml-2 mt-6 mb-2'>
              Time Start: {timeStartDay}
            </h2>
            <h2 className='text-base ml-2'> Time End: {timeEndDay} </h2>
          </div>
          <div className='justify-center mt-6'>
            <PieChart width={400} height={400}>
              <Pie
                dataKey='value'
                isAnimationActive={false}
                data={allocationData}
                cx={150}
                cy={150}
                outerRadius={140}
                // fill='#8884d8'
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
