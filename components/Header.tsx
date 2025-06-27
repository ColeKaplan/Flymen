import React from 'react';
import UserGreetText from './UserGreetText';
import LoginLogoutButton from './LoginLogoutButton';

const Header: React.FC = () => {
  return (
    <div className='flex flex-row items-start w-full pb-16'>
      <div id="greetingAndLogout" className='flex flex-col mt-4'>
        <UserGreetText className="mb-2"/>
        <LoginLogoutButton />
      </div>
      
      <div id="banner" className="absolute left-1/2 transform -translate-x-1/2 text-center mb-8">
        <div className="inline-block bg-bg2 rounded border-gray-300 retro-shadow p-5">
          <h1 className="font-pixel text-2xl font-bold text-gray-800 mb-2">
            Flymen
          </h1>
          <div className="font-pixel text-xs text-gray-600 mb-2">
            A Public Correspondence Archive
          </div>
          <div className="flex justify-center space-x-3 text-xs font-pixel text-gray-600">
            <span className="">•</span>
            <span>open the curtain on conversations</span>
            <span className="">•</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;