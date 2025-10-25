import React from 'react';
import type { RankedSpecialist, TriageResult, UrgentCareCenter } from '../types';
import { Urgency } from '../types';
import DoctorCard from './DoctorCard';

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  triageResult: TriageResult | null;
  rankedSpecialists: RankedSpecialist[] | null;
  urgentCareCenters: UrgentCareCenter[] | null;
  userLocation: { latitude: number; longitude: number; } | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  isLoading,
  error,
  triageResult,
  rankedSpecialists,
  urgentCareCenters,
}) => {
  if (isLoading) {
    return (
      <div className="mt-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">AI is analyzing your symptoms...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 text-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <p className="font-bold">An error occurred:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!triageResult) {
    return null; 
  }

  const renderContent = () => {
    switch (triageResult.urgency) {
      case Urgency.EMERGENCY:
        return (
          <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-r-lg">
            <h2 className="text-2xl font-bold mb-2">EMERGENCY</h2>
            <p className="text-lg">{triageResult.recommendation}</p>
          </div>
        );
      case Urgency.URGENT:
        return (
          <div className="p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-r-lg">
            <h2 className="text-2xl font-bold mb-2">URGENT CARE RECOMMENDED</h2>
            <p className="mb-4">{triageResult.recommendation}</p>
            <h3 className="text-xl font-semibold mb-3">Nearby Urgent Care Centers:</h3>
            <div className="space-y-3">
              {urgentCareCenters?.map(center => (
                <div key={center.id} className="p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                  <p className="font-bold">{center.name}</p>
                  <p className="text-sm">{center.location.address}</p>
                  <p className="text-sm text-gray-600">Hours: {center.hours}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case Urgency.ROUTINE:
        if (!rankedSpecialists || rankedSpecialists.length === 0) {
          return (
            <div className="p-6 bg-blue-100 border-l-4 border-blue-500 text-blue-800 rounded-r-lg">
              <h2 className="text-2xl font-bold mb-2">ROUTINE CARE NEEDED</h2>
              <p>{triageResult.recommendation}</p>
            </div>
          );
        }
        return (
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-1 text-green-800">ROUTINE CARE NEEDED</h2>
            <p className="text-gray-700 mb-4">{triageResult.recommendation}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rankedSpecialists.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Triage Summary</h3>
        <p><span className="font-semibold">Urgency Level:</span> <span className={`font-bold ${
            triageResult.urgency === Urgency.EMERGENCY ? 'text-red-600' :
            triageResult.urgency === Urgency.URGENT ? 'text-yellow-600' :
            'text-green-600'
          }`}>{triageResult.urgency}</span></p>
        {triageResult.specialist && <p><span className="font-semibold">Suggested Specialist:</span> {triageResult.specialist}</p>}
        <p><span className="font-semibold">Symptom Keywords:</span> {triageResult.keywords.join(', ')}</p>
        {triageResult.confidenceScore && <p><span className="font-semibold">Confidence:</span> {Math.round(triageResult.confidenceScore * 100)}%</p>}
      </div>
      {renderContent()}
    </div>
  );
};

export default ResultsDisplay;
