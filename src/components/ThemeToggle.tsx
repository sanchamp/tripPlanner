import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 h-5 w-5 text-yellow-500 transition-all duration-300 ${
            theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        <Moon 
          className={`absolute inset-0 h-5 w-5 text-blue-400 transition-all duration-300 ${
            theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;