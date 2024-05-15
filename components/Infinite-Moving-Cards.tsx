// "use client";

// import { cn } from "../utils/cn";
// import React, { useEffect, useState } from "react";

// export const InfiniteMovingCards = ({
//   items,
//   direction = "left",
//   speed = "fast",
//   pauseOnHover = true,
//   className,
// }: {
//   items: {
//     quote: string;
//     name: string;
//     title: string;
//   }[];
//   direction?: "left" | "right";
//   speed?: "fast" | "normal" | "slow";
//   pauseOnHover?: boolean;
//   className?: string;
// }) => {
//   const containerRef = React.useRef<HTMLDivElement>(null);
//   const scrollerRef = React.useRef<HTMLUListElement>(null);

//   useEffect(() => {
//     addAnimation();
//   }, []);
//   const [start, setStart] = useState(false);
//   function addAnimation() {
//     if (containerRef.current && scrollerRef.current) {
//       const scrollerContent = Array.from(scrollerRef.current.children);

//       scrollerContent.forEach((item) => {
//         const duplicatedItem = item.cloneNode(true);
//         if (scrollerRef.current) {
//           scrollerRef.current.appendChild(duplicatedItem);
//         }
//       });

//       getDirection();
//       getSpeed();
//       setStart(true);
//     }
//   }
//   const getDirection = () => {
//     if (containerRef.current) {
//       if (direction === "left") {
//         containerRef.current.style.setProperty(
//           "--animation-direction",
//           "forwards"
//         );
//       } else {
//         containerRef.current.style.setProperty(
//           "--animation-direction",
//           "reverse"
//         );
//       }
//     }
//   };
//   const getSpeed = () => {
//     if (containerRef.current) {
//       if (speed === "fast") {
//         containerRef.current.style.setProperty("--animation-duration", "20s");
//       } else if (speed === "normal") {
//         containerRef.current.style.setProperty("--animation-duration", "40s");
//       } else {
//         containerRef.current.style.setProperty("--animation-duration", "80s");
//       }
//     }
//   };
//   return (
//     <div
//       ref={containerRef}
//       className={cn(
//         "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
//         className
//       )}
//     >
//       <ul
//         ref={scrollerRef}
//         className={cn(
//           " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
//           start && "animate-scroll ",
//           pauseOnHover && "hover:[animation-play-state:paused]"
//         )}
//       >
//         {items.map((item, idx) => (
//           <li
//             className="w-[350px] max-w-full relative h-64 rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
//             style={{
//               background:
//                 "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
//             }}
//             key={item.name}
//           >
//             <blockquote>
//               <div
//                 aria-hidden="true"
//                 className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
//               ></div>
//               <span className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
//                 {item.quote}
//               </span>
//               <div className="relative z-20 mt-6 flex flex-row items-center">
//                 <span className="flex flex-col gap-1">
//                   <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
//                     {item.name}
//                   </span>
//                   <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
//                     {item.title}
//                   </span>
//                 </span>
//               </div>
//             </blockquote>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// import { cn } from "../utils/cn";
// import React, { useEffect, useState } from "react";
// import DonutChart from './DonutChart';
// import AreaChart from './AreaChart';

// export const InfiniteMovingCards = ({
//   items,
//   direction = "left",
//   speed = "fast",
//   pauseOnHover = true,
//   className,
// }: {
//   items: any[]; // Updated to any[] to accept different item types
//   direction?: "left" | "right";
//   speed?: "fast" | "normal" | "slow";
//   pauseOnHover?: boolean;
//   className?: string;
// }) => {
//   const containerRef = React.useRef<HTMLDivElement>(null);
//   const scrollerRef = React.useRef<HTMLUListElement>(null);

//   useEffect(() => {
//     addAnimation();
//   }, []);
//   const [start, setStart] = useState(false);
//   function addAnimation() {
//     if (containerRef.current && scrollerRef.current) {
//       const scrollerContent = Array.from(scrollerRef.current.children);

//       scrollerContent.forEach((item) => {
//         const duplicatedItem = item.cloneNode(true);
//         scrollerRef.current.appendChild(duplicatedItem);
//       });

//       getDirection();
//       getSpeed();
//       setStart(true);
//     }
//   }
//   const getDirection = () => {
//     containerRef.current.style.setProperty(
//       "--animation-direction",
//       direction === "left" ? "forwards" : "reverse"
//     );
//   };
//   const getSpeed = () => {
//     const duration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
//     containerRef.current.style.setProperty("--animation-duration", duration);
//   };
//   return (
//     <div
//       ref={containerRef}
//       className={cn(
//         "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
//         className
//       )}
//     >
//       <ul
//         ref={scrollerRef}
//         className={cn(
//           "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
//           start && "animate-scroll",
//           pauseOnHover && "hover:[animation-play-state:paused]"
//         )}
//       >
//         {items.map((item, idx) => (
//           <li
//             className="w-[700px] max-w-full relative h-128 top-20 rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[750px]"
//             style={{ background: "linear-gradient(180deg, var(--slate-800), var(--slate-900)" }}
//             key={idx}
//           >
//             {/* Dynamic component rendering based on item type */}
//             {item.type === 'donut' && <DonutChart data={item.data} xName={item.xName} yName={item.yName} />}
//             {item.type === 'area' && <AreaChart data={item.data} xName={item.xName} yName={item.yName} />}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default InfiniteMovingCards;

import { cn } from "../utils/cn";
import React, { useEffect, useRef } from "react";
import DonutChart from './DonutChart';
import AreaChart from './AreaChart';

type Item = {
  type: string;
  data: any[];
  xName: string;
  yName: string;
  className?: string;  // Making className optional
};

type InfiniteMovingCardsProps = {
  items: Item[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
};

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    let animationFrameId;

    const scrollEffect = () => {
      if (direction === "left") {
        scrollContainer.scrollLeft += 1;
      } else {
        scrollContainer.scrollLeft -= 1;
      }

      // Reset scroll position
      if (direction === "left" && scrollContainer.scrollWidth - scrollContainer.scrollLeft <= scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else if (direction === "right" && scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      }

      animationFrameId = requestAnimationFrame(scrollEffect);
    };

    const startScrolling = () => animationFrameId = requestAnimationFrame(scrollEffect);
    const stopScrolling = () => cancelAnimationFrame(animationFrameId);

    startScrolling();

    // Optional: Pause on hover
    if (pauseOnHover) {
      scrollContainer.addEventListener('mouseenter', stopScrolling);
      scrollContainer.addEventListener('mouseleave', startScrolling);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (pauseOnHover) {
        scrollContainer.removeEventListener('mouseenter', stopScrolling);
        scrollContainer.removeEventListener('mouseleave', startScrolling);
      }
    };
  }, [direction, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        className={cn(
          "flex min-w-[200%] shrink-0 gap-4 py-4 w-max flex-nowrap",
          "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.concat(items).map((item, idx) => (
          <li
            className="w-[700px] max-w-full relative min-h-[32rem] top-20 rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[750px]"
            style={{ background: "linear-gradient(180deg, var(--slate-800), var(--slate-900)" }}
            key={idx}
          >
            {item.type === 'donut' && <DonutChart data={item.data} xName={item.xName} yName={item.yName} />}
            {item.type === 'area' && <AreaChart data={item.data} xName={item.xName} yName={item.yName} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
