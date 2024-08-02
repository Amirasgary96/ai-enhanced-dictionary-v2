import React, { useState } from 'react';

function ResultDisplay({ result, darkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!result) return null;

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-4">{result.Term}</h2>
      <p className="mb-4 text-lg">{result.Definition}</p>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
        {result['Policy Title']}, {result['Policy Number']}
      </p>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{result.Section}</p>
      
      <div className="flex space-x-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
        <button
          onClick={() => alert('Coming Soon')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          Find References
        </button>
      </div>
      
      {isExpanded && (
        <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p>Additional information would go here...</p>
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;