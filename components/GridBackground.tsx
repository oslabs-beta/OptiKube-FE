import React, { ReactNode } from "react";

interface GridBackgroundDemoProps {
    children?: ReactNode; // This type accepts any valid React child, including `null`, `undefined`, `ReactElement`, or even an array of these.
  }

export function GridBackgroundDemo({ children }: GridBackgroundDemoProps) {
  return (
    <div className="relative h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] flex">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      <p className="text-1xl sm:text-5xl font-bold top-40 left-20 relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Overview
      </p>
      <p className="text-4xl sm:text-7xl font-bold top-0 right-70 absolute z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        User Dashboard
      </p> */}
      
      {/* ... Rest of your code, such as the button, goes here */}
    </div>
  );
}
