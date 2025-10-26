import React from 'react';
import type { PatientRequest, Message } from '../../types';

interface PatientCardProps {
  request: PatientRequest;
  onApprove: (request: PatientRequest) => void;
  onBack: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ request, onApprove, onBack }) => {
  const urgencyColor = {
    EMERGENCY: 'bg-red-100 text-red-800',
    URGENT: 'bg-yellow-100 text-yellow-800',
    ROUTINE: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <div className="mb-6">
        <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800 font-medium">
          &larr; Back to Dashboard
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-indigo-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold">{request.doctorId === 0 ? `Patient #${request.id}` : request.patient.name}</h2>
              {request.doctorId !== 0 && <p className="text-indigo-200">{request.patient.age} years old, {request.patient.gender}</p>}
            </div>
            <div className="text-right">
              <p className="text-sm text-indigo-200">Request Date: {new Date(request.requestDate).toLocaleDateString()}</p>
              <p className="text-sm text-indigo-200">Insurance: {request.patient.insurance}</p>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">Initial Symptoms</h3>
              <p className="text-gray-700 text-lg">{request.symptoms}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">Nurse Eva Evaluation</h3>
              <div className="h-80 overflow-y-auto p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
                {request.conversation.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-lg max-w-lg shadow-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-1">
            <div className={`p-4 rounded-lg ${urgencyColor[request.triageResult.urgency]}`}>
              <h3 className="text-lg font-bold mb-2">AI Triage Summary</h3>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold">Urgency:</p>
                  <p className={`text-2xl font-bold`}>{request.triageResult.urgency}</p>
                </div>
                <div>
                  <p className="font-semibold">Confidence:</p>
                  <p className="text-xl font-bold">{Math.round(request.triageResult.confidenceScore * 100)}%</p>
                </div>
                <div>
                  <p className="font-semibold">Suggested Specialist:</p>
                  <p className="text-lg">{request.triageResult.specialist}</p>
                </div>
                <div>
                  <p className="font-semibold">Keywords:</p>
                  <p className="text-sm">{request.triageResult.keywords.join(', ')}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">AI Recommendation</h4>
                <p className="text-sm text-gray-700">{request.triageResult.recommendation}</p>
            </div>
          </div>
        </div>

        {request.status === 'Pending' && (
          <div className="p-6 bg-gray-50 border-t">
            <button 
              onClick={() => onApprove(request)}
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Approve Urgent Slot
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
