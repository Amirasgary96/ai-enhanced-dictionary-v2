import React from 'react';
import backgroundImage from '../assets/hospital-background.jpg'; // Make sure this path is correct

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="relative bg-blue-600 text-white p-4 shadow-lg">
      <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="relative container mx-auto flex justify-between items-center z-10">
        <h1 className="text-3xl font-bold">AI-enhanced Dictionary</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-full transition-colors duration-200 ${
            darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'
          }`}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
}

export default Header;