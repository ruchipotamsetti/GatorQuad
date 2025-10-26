import React from 'react';
import type { Specialist } from '../types';

interface DoctorSelectionProps {
  doctors: Specialist[];
  onSelectDoctor: (doctorId: number) => void;
  onBack: () => void;
}

const DoctorSelection: React.FC<DoctorSelectionProps> = ({ doctors, onSelectDoctor, onBack }) => {
  return (
    <div className="mt-8 p-4 md:p-8">
      <button onClick={onBack} className="mb-6 text-indigo-600 hover:text-indigo-800 font-medium"> &larr; Back to Options</button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Select a Specialist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img src={doctor.photo} alt={doctor.name} className="w-20 h-20 rounded-full mr-4 object-cover" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                  <p className="text-indigo-600 font-semibold">{doctor.specialty}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">{doctor.bio}</p>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Expertise:</h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.expertise.map(skill => (
                    <span key={skill} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
              {doctor.urgentAvailability && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
                  <p className="font-bold">Next Urgent Slot: {new Date(doctor.urgentAvailability).toLocaleDateString()}</p>
                </div>
              )}
              <p className="text-sm text-gray-500 mb-4">{doctor.location.address}</p>
              <button 
                onClick={() => onSelectDoctor(doctor.id)}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Send Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorSelection;
