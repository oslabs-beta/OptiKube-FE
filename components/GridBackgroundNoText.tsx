import React, { ReactNode } from "react";

interface GridBackgroundDemoProps {
    children?: ReactNode; // This type accepts any valid React child, including `null`, `undefined`, `ReactElement`, or even an array of these.
  }

export function GridBackgroundDemoNoText({ children }: GridBackgroundDemoProps) {
  return (
    <div className="relative h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] flex">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      
      {/* ... Rest of your code, such as the button, goes here */}
    </div>
  );
}
