import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
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
  );
};

export default Header;