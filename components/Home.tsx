import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">Mediconnect</h1>
        <div className="space-y-4">
          <a 
            href="#/patient/login"
            className="block w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Login as Patient
          </a>
          <a 
            href="#/doctor"
            className="block w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Login as Doctor
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
