import React from 'react';
import type { Doctor } from '../types';

interface HeaderProps {
  loggedInDoctor: Doctor | null;
  loggedInPatient: string | null;
  onLogout: () => void;
  onPatientLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ loggedInDoctor, loggedInPatient, onLogout, onPatientLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <a href="#/" className="text-2xl font-bold text-indigo-600">Mediconnect</a>
        <div>
          {loggedInDoctor ? (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-4">Welcome, {loggedInDoctor.name}</span>
              <button onClick={onLogout} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Logout</button>
            </div>
          ) : loggedInPatient ? (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-4">Welcome, Patient</span>
              <button onClick={onPatientLogout} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Logout</button>
            </div>
          ) : (
            <div>
              <a href="#/patient/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600 mr-4">Patient Login</a>
              <a href="#/doctor" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Doctor Portal</a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
