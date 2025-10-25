import React from 'react';
import type { RankedSpecialist } from '../types';

interface DoctorCardProps {
  doctor: RankedSpecialist;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg md:text-xl font-bold text-indigo-700">{doctor.name}</h3>
        <p className="text-gray-600">{doctor.specialty}</p>
        <p className="text-sm text-gray-500 mt-1">{doctor.location.address}</p>
        <p className="text-sm font-semibold text-gray-700 mt-2">{doctor.distance.toFixed(1)} miles away</p>

        <div className="mt-4">
          <h4 className="font-semibold text-sm text-gray-800">Expertise:</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {doctor.expertise.slice(0, 3).map(e => (
              <span key={e} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{e}</span>
            ))}
          </div>
        </div>

        <div className="mt-3">
           <h4 className="font-semibold text-sm text-gray-800">Accepted Insurance:</h4>
            <p className="text-sm text-gray-600">{doctor.acceptedInsurance.join(', ')}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        {doctor.urgentAvailability ? (
          <p className="text-sm font-semibold text-green-700">
            Urgent Slot Available: {new Date(doctor.urgentAvailability).toLocaleDateString()}
          </p>
        ) : (
          <p className="text-sm text-gray-500">No urgent slots listed</p>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
