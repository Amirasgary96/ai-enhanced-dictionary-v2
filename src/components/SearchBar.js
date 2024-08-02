import React, { useState, useEffect } from 'react';
import dictionaryData from '../dictionary.json'; // Make sure this path is correct

function SearchBar({ onSearch, darkMode }) {
  const [term, setTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (term.length > 0) {
      const filteredSuggestions = dictionaryData
        .filter(item => item.Term.toLowerCase().startsWith(term.toLowerCase()))
        .map(item => item.Term);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [term]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setTerm(suggestion);
    onSearch(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for a term..."
            className={`flex-grow p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
            }`}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Find
          </button>
        </div>
      </form>
      {suggestions.length > 0 && (
        <ul className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg ${
          darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
        }`}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`p-2 cursor-pointer hover:bg-blue-500 hover:text-white ${
                index === suggestions.length - 1 ? 'rounded-b-lg' : ''
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;