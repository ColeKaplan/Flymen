import { Poppins } from 'next/font/google'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import React from 'react';
import './HorizontalCard.css';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '700', '900'],
  });

function HorizontalCard(props: any) {
    const isTextRight = props.isTextRight

    return (
        <a href={props.link}>
        <button className='bg-[#c2e2f9] border-2 rounded-xl shadow-xl p-3 m-3 text-center
        active:bg-[#82cbff] active:text-black hover:bg-[#9fd7ff] hover:text-black max-w-xl
        grow'>
        <div className={`flex ${isTextRight ? 'flex-row-reverse' : 'flex-row'} items-center`}>
            <div className="">
                <Image className='rounded-md max-w-60 max-h-40' src={props.image} width={420} height={320} alt={`${props.title} picture`} priority={true}></Image>
            </div>
            <div className="ml-4 mr-4">
                <h2 className={`${montserrat} font-black text-2xl`}>{props.title}</h2>
                <p className={`text-sm`}>{props.text}</p>
            </div>
        </div>
        </button>
        </a>
    );
}

export default HorizontalCard