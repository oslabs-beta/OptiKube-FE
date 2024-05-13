import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { Tooltip } from '@nextui-org/tooltip';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Recommendation from 'components/Recommendation';

const SavingDashboard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [windowOption, setWindowOption] = useState('7d');
  const [algorithmCPU, setAlgorithmCPU] = useState('max');
  const [algorithmRAW, setAlgorithmRAW] = useState('max');
  const [algorithmqCPU, setAlgorithmqCPU] = useState(0.95);
  const [targetCPUUtilization, setTargetCPUUtilization] = useState(0.7);

  const [plotData, setPlotData] = useState([]);
  const [totalSaving, setTotalSaving] = useState('');
  const [count, setCount] = useState('');

  const handleAlgorithmCPUChange = (value) => {
    setAlgorithmCPU(value);
    // if (value !== 'quantile') {
    //   setAlgorithmqCPU(0.95);
    // }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const getRecommendation = async () => {
      try {
        const url = `http://localhost:9090/model/savings/requestSizingV2?window=${windowOption}&algorithmCPU=${algorithmCPU}&algorithmRAM=${algorithmRAW}&qCPU=${algorithmqCPU}&targetCPUUtilization=${targetCPUUtilization}&sortBy=totalSavings`;
        const response = await axios.get(url);
        const data = response.data;
        setPlotData(data.Recommendations);
        setTotalSaving(data.TotalMonthlySavings);
        setCount(data.Count);
        setIsLoading(false);

        // console.log('>>> plotdata in await: ', plotData);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getRecommendation();
  };

  useEffect(() => {
    if (plotData && plotData.length > 0) {
      console.log('>>> plotData:', plotData);
    }
  }, [plotData]);

  return (
    <div className='flex flex-col'>
      <NavBar />
      <div className='h-full w-full flex flex-row items-center justify-center'>
        <div className='flex flex-row'>
          <h2 className='font-bold text-2xl items-left mt-14 mb-0 ml-8 mx-3 text-slate-800'>
            Predict your next savings:
          </h2>
          <Button
            onPress={onOpen}
            className='bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 mt-14 rounded'
          >
            Start Here
          </Button>
        </div>

        <div className='w-1/2 p-4 flex flex-col items-center justify-center'>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement='center'
            className='w-1/2 bg-slate-900 text-white p-6 rounded-lg shadow-lg'
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className='flex text-center items-center justify-center mt-8'>
                    Sizing Recommendation
                  </ModalHeader>
                  <ModalBody>
                    <form id='recommendation-form'>
                      <div>
                        <h3 className='flex text-center items-left text-sm'>
                          Time Window <label className='text-red-500'> *</label>
                        </h3>
                        <select
                          required
                          value={windowOption}
                          onChange={(e) => setWindowOption(e.target.value)}
                          className='mt-2 mb-2 w-full border rounded  bg-slate-900 text-white indent-2'
                        >
                          <option value='3d'>3d</option>
                          <option value='7d'>7d</option>
                          <option value='14d'>14d</option>
                          <option value='21d'>21d</option>
                          <option value='30d'>30d</option>
                          <option value='60d'>60d</option>
                          <option value='90d'>90d</option>
                        </select>
                      </div>

                      <div>
                        <h3 className='flex text-center items-left text-sm'>
                          CPU Algorithum
                        </h3>
                        <select
                          value={algorithmCPU}
                          onChange={(e) =>
                            handleAlgorithmCPUChange(e.target.value)
                          }
                          className='mt-2 mb-2 w-full border rounded  bg-slate-900 text-white indent-2'
                        >
                          <option value='select'>-</option>
                          <option value='max'>max</option>
                          <option value='quantile'>quantile</option>
                          <option value='quantileOfAverages'>
                            quantileOfAverages
                          </option>
                          <option value='quantileOfMaxes'>
                            quantileOfMaxes
                          </option>
                        </select>
                      </div>

                      <div>
                        <h3 className='flex text-center items-left text-sm'>
                          RAW Algorithum
                        </h3>
                        <select
                          value={algorithmRAW}
                          onChange={(e) => setAlgorithmRAW(e.target.value)}
                          className='mt-2 mb-2 w-full border rounded  bg-slate-900 text-white indent-2'
                        >
                          <option value='select'>-</option>
                          <option value='max'>max</option>
                          <option value='quantile'>quantile</option>
                        </select>
                      </div>

                      <div>
                        <h3 className='flex text-center items-left text-sm'>
                          qCPU Algorithm
                        </h3>
                        <input
                          type='number'
                          step='0.1'
                          min='0'
                          max='1'
                          value={algorithmqCPU}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value) && value >= 0 && value <= 1) {
                              setAlgorithmqCPU(value);
                            }
                          }}
                          className='h-6 mt-2 mb-2 w-full border rounded bg-slate-900 text-white text-sm items-start align-middle place-content-start indent-4'
                        />
                      </div>

                      <div>
                        <h3 className='flex text-center items-left text-sm'>
                          targetCPUUtilization
                        </h3>
                        <input
                          type='number'
                          step='0.1'
                          min='0'
                          max='1'
                          value={targetCPUUtilization}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value) && value >= 0 && value <= 1) {
                              setTargetCPUUtilization(value);
                            }
                          }}
                          className='h-6 mt-2 mb-2 w-full border rounded bg-slate-900  text-white text-sm items-start align-middle place-content-start indent-4'
                        />
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className='border-slate-400 text-zinc-200'
                      variant='flat'
                      onPress={onClose}
                    >
                      Close
                    </Button>
                    <Button
                      className='x-4 py-2 text-zinc-200 bg-slate-600 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center'
                      onClick={handleFormSubmit}
                      onPress={onClose}
                    >
                      Submit
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>

      {/* {isLoading && <div>Loading...</div>} */}

      {totalSaving && count ? (
        <>
          <div className='gap-4 p-4 mt-4 text-slate-800 font-bold text-center text-decoration:underline'>
            Total Savings: {totalSaving} (for the following {count}{' '}
            recommendations)
          </div>
        </>
      ) : (
        <></>
      )}

      {plotData && plotData.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-0'>
          {plotData.map((item, index) => (
            <Recommendation key={index} recommendation={item} />
          ))}
        </div>
      ) : (
        <div
          style={{ height: '55vh' }}
          className='flex gap-4 ml-10 mt-8 font-bold items-left justify-center'
        >
          No data available
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SavingDashboard;
