import React from 'react';
import UserGreetText from './UserGreetText';
import LoginLogoutButton from './LoginLogoutButton';

const Header: React.FC = () => {
  return (
    <div className='px-4 pt-4'>
      <div className='flex flex-row items-start w-full'>
        <div id="greetingAndLogout" className='flex flex-col items-end w-full'>
          <UserGreetText className="mb-2" />
          <LoginLogoutButton />
        </div>

        <div id="banner" className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <div className="inline-block rounded border-gray-300 retro-shadow">
            <h1 className="font-pixel text-2xl font-bold text-accent1 mb-2">
              Flymen
            </h1>
            <div className="font-pixel text-xs text-accent1 mb-2">
              A Public Correspondence Archive
            </div>
            <div className="flex justify-center space-x-3 text-xs font-pixel text-accent1">
              <span className="">•</span>
              <span>open the curtain on conversations</span>
              <span className="">•</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-2 border-accent1 mt-8" />
    </div>
  );
};

export default Header;