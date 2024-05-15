import React from 'react';
import Link from 'next/link';
import { BentoGridSecondDemo } from '../../components/bento-2x2';

import NavBar from "../../components/NavBar";
import HPAForm from 'components/HPA-Form';


export default function testPage() {



    return (

        <div>
            <NavBar />
            <HPAForm />
            <div className='flex flex-col items-center justify-center'>
                <Link href="/" passHref>
                    <button className="mt-20 text-black bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm h-20 px-10 py-2.5 text-center me-2 mb-2 ">Back home</button>
                </Link>

            </div>
            {/* <BentoGridDemo /> */}
            {/* <BentoGridSecondDemo /> */}
            {/* <BentoGridThirdDemo /> */}

        </div>


    )
}