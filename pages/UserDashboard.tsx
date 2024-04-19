import Link from 'next/link';
import { GridBackgroundDemo } from "../components/GridBackground";
import { InfiniteMovingCards } from '../components/Infinite-Moving-Cards';

const userDashboardItems = [
  {
    quote: "Not that expensive.",
    name: "Cluster Cost",
    title: "Daily Overview"
  },
  {
    quote: "But this week was relatively expensive.",
    name: "Cluster Cost",
    title: "Weekly Overview"
  },
  {
    quote: "Still within budget for the month though!",
    name: "Cluster Cost",
    title: "Monthly Overview"
  },
];

const UserDashboard = () => {
  return (
    <div className="relative h-[50rem]"> {/* Set the relative positioning and height */}
      <GridBackgroundDemo />
      <div className="absolute inset-0 flex items-center justify-center"> {/* Center the content */}
        <InfiniteMovingCards items={userDashboardItems} />
      </div>
    </div>
  );
};


export default UserDashboard;

