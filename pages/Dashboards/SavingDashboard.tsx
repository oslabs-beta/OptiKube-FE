import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const SavingDashboard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [windowOption, setWindowOption] = useState('');
  const [algorithmCPU, setAlgorithmCPU] = useState('-');
  const [algorithmRAW, setAlgorithmRAW] = useState('-');
  const [algorithmqCPU, setAlgorithmqCPU] = useState('-');

  const handleAlgorithmCPUChange = (value) => {
    setAlgorithmCPU(value);
    if (value !== 'quantile') {
      setAlgorithmqCPU('-');
    }
  };

  return (
    <div className='flex flex-col'>
      <NavBar />
      <div className='h-full w-full flex flex-row items-center justify-center'>
        <div className='flex flex-row' style={{ height: '100vh' }}>
          <h2 className='font-bold text-2xl items-left mt-14 mb-0 ml-8 mx-3'>
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
                    <div>
                      <h3 className='flex text-center items-left text-sm'>
                        Time Window
                      </h3>
                      <select
                        value={windowOption}
                        onChange={(e) => setWindowOption(e.target.value)}
                        className='mt-2 mb-2 w-full border rounded  bg-slate-900 text-white'
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
                        className='mt-2 mb-2 w-full border rounded  bg-slate-900 text-white'
                      >
                        <option value='select'>-</option>
                        <option value='max'>max</option>
                        <option value='quantile'>quantile</option>
                      </select>
                    </div>

                    <div>
                      <h3 className='flex text-center items-left text-sm'>
                        RAW Algorithum
                      </h3>
                      <select
                        value={algorithmRAW}
                        onChange={(e) => setAlgorithmRAW(e.target.value)}
                        className='mt-2 mb-2 w-full border rounded  bg-slate-900 text-white'
                      >
                        <option value='select'>-</option>
                        <option value='max'>max</option>
                        <option value='quantile'>quantile</option>
                      </select>
                    </div>

                    <div>
                      <h3 className='flex text-center items-left text-sm'>
                        qCPU Algorithum
                      </h3>
                      <select
                        value={algorithmqCPU}
                        disabled={algorithmCPU !== 'quantile'}
                        onChange={(e) => setAlgorithmqCPU(e.target.value)}
                        className='mt-2 mb-2 w-full border rounded  bg-slate-900 text-white'
                      >
                        <option value='select'>-</option>
                        <option value='quantileOfAverages'>
                          quantileOfAverages
                        </option>
                        <option value='quantileOfMaxes'>quantileOfMaxes</option>
                      </select>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color='danger' variant='flat' onPress={onClose}>
                      Close
                    </Button>
                    <Button color='primary' onPress={onClose}>
                      Submit
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SavingDashboard;
