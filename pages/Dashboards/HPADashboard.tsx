// pages/placeholder-page.tsx

// const HPADashboard = () => {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <h1 className="text-xl font-bold">HPA Dashboard</h1>
//         <h3 className="text-xl font-bold">Page Under Construction</h3>
//         <p className="mt-2">This page is currently being built. Please check back later!</p>
//       </div>
//     );
//   };
  
//   export default HPADashboard;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../../components/lamp";
import Deployment from "../../components/Deployment"; 
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { GridBackgroundDemoNoText } from "components/GridBackgroundNoText";

const HPADashboard = () => {
  const [deployments, setDeployments] = useState([]);
  useEffect(() => {
      const fetchDeployments = async () => {
          try {
              const response = await fetch('http://34.71.62.191:80/api/deployments');
              const data = await response.json();
              const deploymentItems = data.response.map((item, index) => 
                  <Deployment deployment={item.deployment} key={index} optimization={item["optimization settings"] || null} scaler={item["scaler settings"]}/>
              );
              setDeployments(deploymentItems);
          } catch (err) {
              console.log(err);
          }
      };
      fetchDeployments();
  }, []);

  return (
    <>
        <NavBar/>
        <div className="fixed inset-0 z-[-1]">
        <GridBackgroundDemoNoText />
        </div>
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-8">Deployments</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {deployments}
            </div>
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
}

export default HPADashboard;
  