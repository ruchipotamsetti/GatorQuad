import React from 'react';

const Header = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-indigo-600 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-indigo-600">PrecisionPass AI</h1>
      </div>
    </div>
  </header>
);

export default Header;