// // pages/landing-page.tsx

// // If in the future you decide to add props to this component, you would define an interface or type for those props and add it to the component definition.
// const LandingPage = () => {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-4xl font-bold text-blue-600">Welcome to the Landing Page</h1>
//     </div>
//   );
// };

// export default LandingPage;

// pages/index.tsx
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
      {/* Other homepage content */}
      
      <Link href="/UserDashboard" passHref>
        <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">Go to User Dashboard</button>
      </Link>
    </div>
  );
};

export default Home;
