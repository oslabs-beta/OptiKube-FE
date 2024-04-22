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


  "use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../../components/lamp";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer"

const HPADashboard = () => {

  return (
    <div>

      <NavBar />
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Under Construction
      </motion.h1>
    </LampContainer>
          </div>
  );
}

export default HPADashboard;
  