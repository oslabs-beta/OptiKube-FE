// pages/placeholder-page.tsx
import React from 'react';
import Link from 'next/link';
import { BentoGridSecondDemo } from '../../components/bento-2x2';
import { GridBackgroundDemoNoText } from '../../components/GridBackgroundNoText'

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer"

// const MetricsDashboard = () => {
//   return (
//     <div>
//       <NavBar />
//       {/* <GridBackgroundDemo /> */}
//       <div className="absolute inset-0 z-[-1]">
//         <GridBackgroundDemoNoText />
//       </div>
//       <p className="flex self-center bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text text-4xl font-bold m-20">Currently Under Construction</p>
//       <div className='flex flex-col items-center justify-center'>

//       </div>
//       {/* <BentoGridDemo /> */}
//       <div className='self-stretch flex flex-col items-center z-10 mt-4'>
//       <BentoGridSecondDemo />
//       </div>
//       {/* <BentoGridThirdDemo /> */}
//       <Footer />
//       <Link href="/UserDashboard" passHref>
//         <button className="mt-20 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm h-20 px-10 py-2.5 text-center me-2 mb-2 ">To Main Dashboard</button>
//       </Link>
//     </div>

//   );
// };
const MetricsDashboard = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start">
      <NavBar />
      <div className="absolute inset-0 z-[-1]">
        <GridBackgroundDemoNoText />
      </div>
      {/* Reduced the margin and added a smaller top margin */}
      <p className="flex self-stretch left-1 bg-gradient-to-b from-neutral-200 to-neutral-500 text-transparent bg-clip-text text-4xl font-bold mt-5 mb-2">
        Metrics Dashboard
      </p>
      {/* Container for charts with controlled z-index and margin-top */}
      <div className='self-stretch flex flex-col items-center z-10 mt-4'>
        <BentoGridSecondDemo />
      </div>
      <Footer />
      <Link href="/UserDashboard" passHref>
        <button className="mt-20 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm h-20 px-10 py-2.5 text-center me-2 mb-1">
          To Main Dashboard
        </button>
      </Link>
    </div>
  );
};

export default MetricsDashboard;
