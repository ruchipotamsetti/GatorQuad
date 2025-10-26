// components/Header.tsx  (root/components)
import React from 'react';
import type { Doctor } from '../types';

interface HeaderProps {
  loggedInDoctor: Doctor | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ loggedInDoctor, onLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <a href="#/" className="text-2xl font-bold text-indigo-600">PrecisionPass AI</a>
        <div>
          {loggedInDoctor ? (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-4">Welcome, {loggedInDoctor.name}</span>
              <button onClick={onLogout} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Logout</button>
            </div>
          ) : (
            <a href="#/doctor" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Doctor Portal</a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
