// pages/placeholder-page.tsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LampContainer } from '../../components/lamp';
import Deployment from '../../components/Deployment';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { GridBackgroundDemoNoText } from 'components/GridBackgroundNoText';

const HPADashboard = () => {
  const [deployments, setDeployments] = useState([]);
  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        const response = await fetch(
          'http://34.41.209.93:8080/api/deployments'
        );
        //   const response = await fetch('http://34.71.62.191:80/api/deployments');
        //   const response = await fetch('http://optikube-operator-svc.optikube:8080/api');
        const data = await response.json();
        const deploymentItems = data.response.map((item, index) => (
          <Deployment
            deployment={item.deployment}
            key={index}
            optimization={item['optimization settings'] || null}
            scaler={item['scaler settings']}
          />
        ));
        setDeployments(deploymentItems);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDeployments();
  }, []);

  return (
    <>
      <NavBar />
      {/* <div className='fixed inset-0 z-[-1]'>
        <GridBackgroundDemoNoText />
      </div> */}
      <div className='container mx-auto px-4'>
        <h1 className='text-2xl font-bold text-center my-8'>Deployments</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {deployments}
        </div>
      </div>
      <div className='bottom-0 w-full'>
        <Footer />
      </div>
    </>
    //   <>
    //       <span>Deployments:</span>
    //       {deployments}
    //   </>
  );

  // return (
  //   <div>

  //     <NavBar />
  //   <LampContainer>
  //     <motion.h1
  //       initial={{ opacity: 0.5, y: 100 }}
  //       whileInView={{ opacity: 1, y: 0 }}
  //       transition={{
  //         delay: 0.3,
  //         duration: 0.8,
  //         ease: "easeInOut",
  //       }}
  //       className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
  //       Under Construction
  //     </motion.h1>
  //   </LampContainer>
  //         </div>
  // );
};

export default HPADashboard;
