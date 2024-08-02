import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import QuickAccessTags from './components/QuickAccessTags';
import ResultDisplay from './components/ResultDisplay';
import dictionaryData from './dictionary.json';

function App() {
  const [searchResult, setSearchResult] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleSearch = (term) => {
    const result = dictionaryData.find(item => item.Term.toLowerCase() === term.toLowerCase());
    setSearchResult(result);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} darkMode={darkMode} />
        <QuickAccessTags onTagClick={handleSearch} darkMode={darkMode} />
        {searchResult && <ResultDisplay result={searchResult} darkMode={darkMode} />}
      </main>
    </div>
  );
}

export default App;