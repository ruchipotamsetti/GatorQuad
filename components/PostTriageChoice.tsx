import React from 'react';

interface PostTriageChoiceProps {
  onSelectSpecificDoctor: () => void;
  onEnterSmartQueue: () => void;
}

const PostTriageChoice: React.FC<PostTriageChoiceProps> = ({ onSelectSpecificDoctor, onEnterSmartQueue }) => {
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">What would you like to do next?</h2>
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">Send to a Specific Doctor</h3>
          <p className="text-sm text-gray-600 mb-4">Choose a specialist from a list and send your request directly to their office.</p>
          <button 
            onClick={onSelectSpecificDoctor}
            className="w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Choose a Doctor
          </button>
        </div>
        <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">Find the Fastest Available Specialist</h3>
          <p className="text-sm text-gray-600 mb-4">Enter the Smart Queue to have your request sent to a pool of relevant specialists. The first available doctor will claim your request.</p>
          <button 
            onClick={onEnterSmartQueue}
            className="w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
          >
            Enter Smart Queue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostTriageChoice;
