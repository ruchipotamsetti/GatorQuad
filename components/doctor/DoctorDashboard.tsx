import React from 'react';
import type { PatientRequest } from '../../types';

interface DoctorDashboardProps {
  directRequests: PatientRequest[];
  smartQueueRequests: PatientRequest[];
  onSelectRequest: (request: PatientRequest) => void;
  onClaimRequest: (request: PatientRequest) => void;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ directRequests, smartQueueRequests, onSelectRequest, onClaimRequest }) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Doctor Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Direct Requests</h2>
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {directRequests.length > 0 ? (
              directRequests.map(request => (
                <li key={request.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => onSelectRequest(request)}>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{request.patient.name}</p>
                      <p className="text-sm text-gray-600">{request.symptoms}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${request.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                        {request.status}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(request.requestDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500">No direct requests at this time.</li>
            )}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Smart Queue</h2>
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {smartQueueRequests.length > 0 ? (
              smartQueueRequests.map(request => (
                <li key={request.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="cursor-pointer" onClick={() => onSelectRequest(request)}>
                      <p className="text-lg font-semibold text-gray-800">Patient #{request.id}</p>
                      <p className="text-sm text-gray-600">{request.symptoms}</p>
                    </div>
                    <div className="text-right">
                      <button 
                        onClick={() => onClaimRequest(request)}
                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                      >
                        Claim
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500">The Smart Queue is empty.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
