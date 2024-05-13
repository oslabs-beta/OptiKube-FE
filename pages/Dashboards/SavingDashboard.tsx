// pages/placeholder-page.tsx
import React from 'react';
import Link from 'next/link';
import { BentoGridSecondDemo } from '../../components/bento-2x2';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const MetricsDashboard = () => {
  return (
    <div className='flex flex-col'>
      <NavBar />
      <div className='h-full w-full flex flex-row'>
        <h2 className='font-bold text-2xl items-left mt-14 mb-0 ml-8 mx-3'>
          Predict your next savings:
        </h2>
        <div className='w-1/2 p-4 flex flex-col items-left mt-14 mb-0 ml-8 mx-3'></div>
      </div>
      <Footer />
    </div>
  );
};

export default MetricsDashboard;
