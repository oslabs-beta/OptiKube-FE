// pages/placeholder-page.tsx
import {  BentoGridThirdDemo } from '../../components/bento-custom';
import { GridBackgroundDemoNoText } from 'components/GridBackgroundNoText';

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer"


const MoneyDashboard = () => {
    return (
      
      <div className="flex flex-col items-center justify-center h-90">
        <NavBar />
        <div className="absolute inset-0 z-[-1]">
          <GridBackgroundDemoNoText />
        </div>
        <p className="flex self-stretch left-1 bg-gradient-to-b from-neutral-200 to-neutral-500 text-transparent bg-clip-text text-4xl font-bold mt-5 mb-2">
        Cost Dashboard
        </p>
        {/* <h1 className="text-xl font-bold">Cost Dashboard</h1>
        <h3 className="text-xl font-bold">Page Under Construction</h3>
        <p className="mt-2">This page is currently being built. Please check back later!</p> */}
        <div>

        <BentoGridThirdDemo />
        </div>
        <Footer />
      </div>
    );
  };
  
  export default MoneyDashboard;
  