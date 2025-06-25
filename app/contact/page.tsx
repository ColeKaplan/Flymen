'use client'
import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';
import React, { useEffect } from 'react';


export default function Contact(){

    {/* <!-- Google Tag Manager --> */}
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-MMJ89G6J';
        script.async = true;
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, [])
    {/* <!-- End Google Tag Manager --> */}

    return(
        <div className='min-h-screen '>
            
            <title>Contact Me</title>
            <meta name="description" content="Contact page for Cole Kaplan" />
            <link rel="canonical" href="http://colekaplan.dev/contact" />

            <header className='pb-10 min-w-full'>
                <Header />
            </header>
            <div className='flex flex-col justify-items-start items-center pb-10 bg-[#slate-500]'>
                <h1 className='text-4xl font-bold text-[#ffffff]'>Contact Me</h1>
                <ContactForm/>
            </div>
        </div>
    );
}
