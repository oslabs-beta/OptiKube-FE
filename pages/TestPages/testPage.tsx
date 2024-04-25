import React from 'react';
import Link from 'next/link';
import { BackgroundGradientAnimation } from '../../components/background-gradient-animation';


export default function testPage() {
    return (

        <div>

            <BackgroundGradientAnimation>
                <div className="absolute z-50 inset-0 flex flex-col items-center justify-center text-white font-bold px-4  text-3xl text-center md:text-4xl lg:text-7xl">
                    <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                        Test Page for Aceternity Components
                    </p>

                    <Link href="/" passHref>
                        <button className="mt-20 text-black bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm h-20 px-10 py-2.5 text-center me-2 mb-2 ">Back home</button>
                    </Link>
                </div>
            </BackgroundGradientAnimation>


        </div>
    )
}
