import React from 'react';

function QuickAccessTags({ onTagClick, darkMode }) {
  const tags = ['DASA', 'Irritability', 'Agitation'];

  return (
    <div className="mb-6">
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => onTagClick(tag)}
          className={`mr-2 mb-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            darkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default QuickAccessTags;