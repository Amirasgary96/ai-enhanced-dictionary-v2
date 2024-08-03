import React, { useState } from 'react';
import LoadingAnimation from './LoadingAnimation';

function ResultDisplay({ result, darkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedContent, setExpandedContent] = useState('');
  const [references, setReferences] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExpand = async () => {
    if (!isExpanded && !expandedContent) {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch('/api/expand', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ term: result.Term, definition: result.Definition }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExpandedContent(data.expanded);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch expanded content. Please try again.');
      }
      setIsLoading(false);
    }
    setIsExpanded(!isExpanded);
  };

  const handleFindReferences = async () => {
    if (!references) {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch('/api/find-references', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ term: result.Term }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReferences(data.references);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch references. Please try again.');
      }
      setIsLoading(false);
    }
  };

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
          onClick={handleExpand}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
        <button
          onClick={handleFindReferences}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          Find References
        </button>
      </div>
      
      {isLoading && <LoadingAnimation />}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {isExpanded && expandedContent && (
        <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border-2 border-blue-500`}>
          <h3 className="text-xl font-bold mb-2 text-blue-500">AI-Generated Expansion:</h3>
          <p>{expandedContent}</p>
        </div>
      )}
      
      {references && (
        <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border-2 border-green-500`}>
          <h3 className="text-xl font-bold mb-2 text-green-500">AI-Generated References:</h3>
          <ul className="list-disc pl-5">
            {references.split('\n').filter(ref => ref.trim()).map((ref, index) => (
              <li key={index} className="mb-2">{ref.trim()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;