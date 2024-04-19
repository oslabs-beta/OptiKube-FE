// "use client";
import React from "react";
import { Boxes } from "../components/background-boxes";
import { cn } from "../utils/cn";
import Link from 'next/link';


const Home = () => {
  return (
    <div >


      <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <div className="absolute top-0 right-0 m-4 z-50">

          <Link href="/testPage" passHref>
            <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 z-30 relative">Test Page</button>
          </Link>
        </div>

        < Boxes />
        <h1 className={cn("md:text-6xl text-xl text-white font-semibold relative z-20 mt-5")}>
          Welcome to Optikube
        </h1>
        <h3 className="mt-5 text-2xl text-gray-400 z-30 relative">
          Quick explanation of app here
        </h3>

        <br></br>
        <Link href="/UserDashboard" passHref>
          <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 z-30 relative">To Dashboard</button>
        </Link>
      </div>





    </div>
  );
}

export default Home;