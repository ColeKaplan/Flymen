import React from 'react';

export default function About(){
    return(
        <div className=''>
             <div id='background' className='flex flex-col justify-items-start items-center min-h-screen py-10 bg-slate-500'>
                <h1 className='text-4xl font-bold text-[#FFFFFF]'>About</h1>

                <div id='stuffAboutMe' className='flex flex-row items-center p-2 border rounded-md border-2 border-spacing-60'>

                    <div id='interestsContainer'>
                        <h1 className='texta-xl font-bold text-[#FFFFFF]'> Interests </h1>
                        <div id='interests' className='flex flex-col items-center'>
                            <ul className='list-disc list-inside'>
                                <li className='text-lg text-[#FFFFFF]'> Tennis </li>
                                <li className='text-lg text-[#FFFFFF]'> Ping Pong </li>
                                <li className='text-lg text-[#FFFFFF]'> Ultimate Frisbee </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
