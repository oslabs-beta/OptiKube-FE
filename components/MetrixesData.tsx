import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MetrixesData = (timeOption) => {
  const [data, setData] = useState({
    namespace: null,
    CPU: null,
    GPU: null,
    RAW: null,
    Network: null,
    LoadBalance: null,
    Efficiency: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/model/allocation?window=${timeOption}&aggregate=namespace&accumulate=true`
        );
        console.log('>>> response.data: ', response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return null;
};

export default MetrixesData;
