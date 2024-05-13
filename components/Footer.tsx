import React, { useState } from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [menu, setMenu] = useState<string>('');

  return (
    <footer className='relative h-auto bg-slate-600 w-ful flex flex-col items-center justify-center bg-opacity-15 mt-4 mb-0'>
      <div className='block text-priblue text-start no-underline leading-10 items-center align-middle text-sm mx-4 font-bold mt-4 mb-0'>
        Quick Links
      </div>
      <div className='flex flex-row'>
        <ul className='navbar flex flex-row items-center text-center'>
          <li
            className='block text-priblue text-start no-underline font-normal leading-10 items-center align-middle gap-5 text-sm mx-4'
            onClick={() => setMenu('User')}
          >
            <Link href={'/UserDashboard'}>
              <p style={{ textDecoration: 'none' }}>
                • User
                {menu === 'User' ? <hr className='bg-secwhite' /> : <></>}
              </p>
            </Link>
          </li>

          <li
            className='block text-priblue text-start no-underline font-normal leading-10 items-center align-middle gap-5 text-sm mx-4'
            onClick={() => setMenu('Metrics')}
          >
            <Link href={'/Dashboards/MetricsDashboard'}>
              <p style={{ textDecoration: 'none' }}>
                • Metrics {menu === 'Matrixes' ? <hr /> : <></>}
              </p>
            </Link>
          </li>

          <li
            className='block text-priblue text-start no-underline font-normal leading-10 items-center align-middle gap-5 text-sm mx-4'
            onClick={() => setMenu('HPA')}
          >
            <Link href={'/HPADashboard'}>
              <p style={{ textDecoration: 'none' }}>
                • HPA{menu === 'HPA' ? <hr /> : <></>}
              </p>
            </Link>
          </li>

          <li
            className='block text-priblue text-start no-underline font-normal leading-10 items-center align-middle gap-5 text-sm mx-4'
            onClick={() => setMenu('GitHub')}
          >
            <Link href={'https://github.com/oslabs-beta/Kubernetes-OSP'}>
              <p style={{ textDecoration: 'none' }}>
                • GitHub {menu === 'GitHub' ? <hr /> : <></>}
              </p>
            </Link>
          </li>
        </ul>
      </div>
      <div className='block text-priblue text-start no-underline font-normal leading-10 items-center align-middle gap-5 text-sm mx-4 font-sm mt-2'>
        ©2023 - 2024 Optikube. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
