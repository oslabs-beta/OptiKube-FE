// pages/placeholder-page.tsx
import {  BentoGridThirdDemo } from '../../components/bento-custom';

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer"


const MoneyDashboard = () => {
    return (
      <div className="flex flex-col items-center justify-center h-90">
        <h1 className="text-xl font-bold">Cost Dashboard</h1>
        <h3 className="text-xl font-bold">Page Under Construction</h3>
        <p className="mt-2">This page is currently being built. Please check back later!</p>
        <NavBar />
        <div>

        <BentoGridThirdDemo />
        </div>
        <Footer />
      </div>
    );
  };
  
  export default MoneyDashboard;
  