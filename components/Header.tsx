import React from 'react';
import UserGreetText from './UserGreetText';
import LoginLogoutButton from './LoginLogoutButton';

const Header: React.FC = () => {
  return (
    <div className='px-4 pt-4'>
      <div className='flex flex-row items-start w-full'>
        <div id="banner" className="text-center items-center w-full">
          <a className="inline-block" href='/'>
            <h1 className="font-pixel text-2xl font-bold text-accent1 mb-2">
              Flymen
            </h1>
            <div className="text-lg text-accent1 mb-2">
              A Public Correspondence Archive
            </div>
            <div className="flex justify-center space-x-3 text-md text-accent1">
              <span className="">•</span>
              <span>open the curtain on conversations</span>
              <span className="">•</span>
            </div>
          </a>
        </div>
        <div id="greetingAndLogoutLargeScreen" className='md:flex absolute flex-col items-end right-10 hidden'>
          <UserGreetText className="" />
          <LoginLogoutButton />
        </div>
      </div>
      <hr className="my-2 border-accent1 mt-8" />
      <div id="greetingAndLogoutSmallScreen" className='flex flex-row justify-between right-10 md:hidden'>
        <UserGreetText className="mb-2" />
        <LoginLogoutButton />
      </div>
    </div>
  );
};

export default Header;