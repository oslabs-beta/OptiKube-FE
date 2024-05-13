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
  const [timeOption, setTimeOption] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [data, setData] = useState([
    {
      Namespace: null,
      CPU: null,
      GPU: null,
      RAW: null,
      Network: null,
      pvBytes: null,
      Efficiency: null,
    },
  ]);

  const handleTimeChange = (event) => {
    const newTimeOption = event.target.value;
    setTimeOption(newTimeOption);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/model/allocation?window=${timeOption}&aggregate=namespace&accumulate=true`
        );
        // console.log('>>> response.data: ', response.data.data[0]);

        const fetchedData = response.data.data[0];
        const fetchTimeStart = fetchedData['__idle__'].start;
        const fetchTimeEnd = fetchedData['__idle__'].end;
        setTimeStart(fetchTimeStart);
        setTimeEnd(fetchTimeEnd);

        const entries = Object.entries(fetchedData);
        const newData = []; // Initialize a new array to hold the data for all namespaces
        entries.forEach(([key, value]) => {
          newData.push({
            Namespace: fetchedData[key].name,
            CPU: fetchedData[key].cpuCores,
            GPU: fetchedData[key].gpuCount,
            RAW: fetchedData[key].ramBytes,
            Network: fetchedData[key].networkTransferBytes,
            pvBytes: fetchedData[key].pvBytes,
            Efficiency: Number(fetchedData[key].totalEfficiency) * 100,
          });
        });

        setData(newData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [timeOption]);

  useEffect(() => {
    if (data && Object.values(data).some((item) => item !== null)) {
      console.log('>>> current data:', data);
    }
  }, [data]);

  return (
    <div className='flex flex-col'>
      <NavBar />
      <div className='flex flex-col items-left mt-14 mb-0 ml-8 mx-3'>
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
            <option value='15d'>15d</option>
            <option value='30d'>30d</option>
          </select>
          <label> by namespace</label>
        </h2>
        <div className='flex flex-col'>
          <h2 className='text-base ml-2 mt-6 mb-2'> Time Start: {timeStart}</h2>
          <h2 className='text-base ml-2'> Time End: {timeEnd} </h2>
        </div>
      </div>

      <div className='flex flex-row items-center bg-slate-200 my-6 mx-3'>
        <Table>
          <TableHeader className='font-bold bg-slate-700 text-white'>
            <TableColumn>Namespace</TableColumn>
            <TableColumn>cpuCores</TableColumn>
            <TableColumn>gpuCount</TableColumn>
            <TableColumn>ramBytes</TableColumn>
            <TableColumn>networkTransferBytes</TableColumn>
            <TableColumn>pvBytes</TableColumn>
            <TableColumn>totalEfficiency(%)</TableColumn>
          </TableHeader>

          <TableBody>
            {data &&
              !loading &&
              data.map((item, index) =>
                item !== null ? (
                  <TableRow key={index}>
                    <TableCell className='text-center'>
                      {item.Namespace}
                    </TableCell>
                    <TableCell className='text-center'>{item.CPU}</TableCell>
                    <TableCell className='text-center'>{item.GPU}</TableCell>
                    <TableCell className='text-center'>{item.RAW}</TableCell>
                    <TableCell className='text-center'>
                      {item.Network}
                    </TableCell>
                    <TableCell className='text-center'>
                      {item.pvBytes}
                    </TableCell>
                    <TableCell className='text-center'>
                      {item.Efficiency}
                    </TableCell>
                  </TableRow>
                ) : null
              )}
          </TableBody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default TrendsDashboard;
