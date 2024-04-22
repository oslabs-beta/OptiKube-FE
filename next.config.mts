// @ts-check
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/metrixesdashboard/runningPods",
        destination: "http://localhost:8080/api/metrixesdashboard/runningPods",
      },
    ];
  },
};

export default nextConfig;

// next.config.js
// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: "/api/metrixesdashboard/runningPods",
//         destination: "http://localhost:8080/api/metrixesdashboard/runningPods",
//       },
//     ];
//   },
// };
