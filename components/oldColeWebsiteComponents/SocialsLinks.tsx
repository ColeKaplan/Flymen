import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';


function SocialsLinks(){


    return(
        <div id="bottomPageLinks" className='flex border border-[#dd8b6b79] border-[#d4edff] p-1 
        bg-[#bcd5f7] rounded space-x-2'>
            <Link href="https://github.com/ColeKaplan" target="_blank" rel="noopener noreferrer" 
            className='hover:text-[#84afe7]'>
                <FaGithub size={30}/>
            </Link>
            
            <Link href="https://linkedin.com/in/colekaplan" target="_blank" rel="noopener noreferrer" 
            className='hover:text-[#84afe7]'>
                <FaLinkedin size={30}/>
            </Link>
        </div>

    );
}

export default SocialsLinks