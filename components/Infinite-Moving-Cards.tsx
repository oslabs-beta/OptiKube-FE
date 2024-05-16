import { cn } from '../utils/cn';
import React, { useEffect, useRef } from 'react';
import DonutChart from './DonutChart';
import AreaChart from './AreaChart';

type Item = {
  type: string;
  data: any[];
  xName: string;
  yName: string;
  className?: string; // Making className optional
};

type InfiniteMovingCardsProps = {
  items: Item[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
};

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    let animationFrameId;

    const scrollEffect = () => {
      if (direction === 'left') {
        scrollContainer.scrollLeft += 1;
      } else {
        scrollContainer.scrollLeft -= 1;
      }

      // Reset scroll position
      if (
        direction === 'left' &&
        scrollContainer.scrollWidth - scrollContainer.scrollLeft <=
          scrollContainer.clientWidth
      ) {
        scrollContainer.scrollLeft = 0;
      } else if (direction === 'right' && scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollLeft =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;
      }

      animationFrameId = requestAnimationFrame(scrollEffect);
    };

    const startScrolling = () =>
      (animationFrameId = requestAnimationFrame(scrollEffect));
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
        'scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        className={cn(
          'flex min-w-[200%] shrink-0 gap-4 py-4 w-max flex-nowrap',
          'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.concat(items).map((item, idx) => (
          <li
            className='w-[700px] max-w-full relative min-h-[32rem] top-20 rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-10 py-8 md:w-[750px] flex flex-col items-center justify-center' // Adjusted for column layout and content alignment
            style={{
              background:
                'linear-gradient(180deg, var(--slate-800), var(--slate-900)',
            }}
            key={idx}
          >
            {item.type === 'area' && (
              <div className='w-full'>
                {' '}
                <p className='text-sm text-white mb-2 text-center'>
                  Daily Cost for the Last Week
                </p>{' '}
                <AreaChart
                  data={item.data}
                  xName={item.xName}
                  yName={item.yName}
                />
              </div>
            )}
            {item.type === 'donut' && (
              <div className='flex flex-1 flex-col justify-center items-center w-full'>
                {' '}
                <p className='text-sm text-white mb-4 text-center w-full'>
                  Weekly Resource Allocation
                </p>
                <DonutChart data={item.data} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
