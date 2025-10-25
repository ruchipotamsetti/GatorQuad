import React, { useState } from 'react';
import { insuranceOptions } from '../data/mockData';

interface SearchFormProps {
  onSearch: (symptoms: string, zipCode: string, insurance: string, radius: number) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [symptoms, setSymptoms] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [insurance, setInsurance] = useState('any');
  const [radius, setRadius] = useState('10'); // Default to 10 miles
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim() || !zipCode.trim()) {
      setError('Please enter your symptoms and zip code.');
      return;
    }
    setError('');
    onSearch(symptoms, zipCode, insurance, parseInt(radius, 10));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Find the Right Specialist</h2>
      <p className="text-gray-600 mb-6">
        Describe your symptoms, and our AI will triage your condition and find the best local specialist for your needs.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
            1. Describe your symptoms
          </label>
          <textarea
            id="symptoms"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 'I have a sudden, severe headache on one side of my head with sensitivity to light.'"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
              2. Your ZIP Code
            </label>
            <input
              type="text"
              id="zip"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 32801"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">
              3. Search Radius
            </label>
            <select
              id="radius"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              disabled={isLoading}
            >
              <option value="5">5 miles</option>
              <option value="10">10 miles</option>
              <option value="25">25 miles</option>
              <option value="50">50 miles</option>
            </select>
          </div>
          <div>
            <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 mb-1">
              4. Your Insurance (optional)
            </label>
            <select
              id="insurance"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              disabled={isLoading}
            >
              <option value="any">Any Insurance</option>
              {insuranceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Start AI Consultation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;