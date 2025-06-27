'use client';

import React from "react";
import { useRef } from "react";
import emailjs from '@emailjs/browser';


export default function ContactForm() {
    var sendFailed : boolean = false;
    const form = useRef<HTMLFormElement>(null);
    const sendEmail = (e: any) => {
        e.preventDefault();

        if (form.current) {
            emailjs
              .sendForm('service_bfjfieb', 'template_xd8m83d', form.current, {
                publicKey: 'LxQ_V8hZ7-jbfsKCx',
              })
              .then(
                () => {
                  console.log('SUCCESS!');
                  sendFailed = false;
                  e.target.reset();
                },
                (error) => {
                  console.log('FAILED...', error.text);
                  sendFailed = true;
                },
              );
        } else {
            console.log('Form is not initialized');
        }
      };


    return(
        <div className="mt-8 lg:w-1/2 lg:mx-6">
            <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-[#d4edff] shadow-2xl rounded-xl dark:bg-gray-900 lg:max-w-xl mb-5">

                <form className="mt-0" ref={form} onSubmit={sendEmail}>
                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-semibold text-gray-600 dark:text-gray-200">Full Name</label>
                        <input type="text" name="their_name" placeholder="Your Name" className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>

                    <div className="flex-1 mt-6">
                        <label className="block mb-2 text-sm font-semibold text-gray-600 dark:text-gray-200">Email address</label>
                        <input type="email" name="their_email" placeholder="your.email@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>

                    <div className="w-full mt-6">
                        <label className="block mb-2 text-sm font-semibold text-gray-600 dark:text-gray-200">Message</label>
                        <textarea name="message" className="block w-full h-20 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-32 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder="Message"></textarea>
                    </div>

                    <button className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                        get in touch
                    </button>
                    { sendFailed && (<div> <h1>Your form did not send properly. Please try again or reach out to me at colegkaplan@gatech.edu</h1></div>)}
                </form>
            </div>
        </div>
    );
}
