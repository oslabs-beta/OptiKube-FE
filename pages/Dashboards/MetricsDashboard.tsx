// pages/placeholder-page.tsx
import React from 'react';
import Link from 'next/link';
import { BentoGridSecondDemo } from '../../components/bento-2x2';
import { GridBackgroundDemo } from '../../components/GridBackground'

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer"

const MetricsDashboard = () => {
  return (
    <div>
      <NavBar />
      {/* <GridBackgroundDemo /> */}
      <p className="flex flex-col items-center justify-center h-90 bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text text-4xl font-bold m-20">Currently Under Construction</p>
      <div className='flex flex-col items-center justify-center'>

      </div>
      {/* <BentoGridDemo /> */}
      <BentoGridSecondDemo />
      {/* <BentoGridThirdDemo /> */}
      <Footer />
      <Link href="/UserDashboard" passHref>
        <button className="mt-20 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm h-20 px-10 py-2.5 text-center me-2 mb-2 ">To Main Dashboard</button>
      </Link>
    </div>

  );
};

export default MetricsDashboard;
