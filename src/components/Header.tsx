import React from 'react';
import { Menu, X } from 'lucide-react';
import CurrencySelector from './CurrencySelector';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  onNavigation: (view: 'home' | 'destinations' | 'mytrips' | 'about' | 'signin') => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen, onNavigation, currentView }) => {
  const isActive = (view: string) => currentView === view;

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => onNavigation('home')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="h-8 w-8 text-blue-600">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                <path d="M14 6l-4.22 5.63 1.25 1.67L14 9.33 19 16h-4l-1 4 4-4h4l-8-10z"/>
                <path d="M9.5 12.5l-2.75-3.67L3 16h4l1-4-1.5 2 3-1.5z"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <circle cx="8" cy="8" r="1"/>
                <path d="M8.5 10.5l2-2.5 3 4 4.5-6L22 16H2l6.5-5.5z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">TRIPPING</span>
          </button>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onNavigation('home')}
              className={`transition-colors ${isActive('home') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigation('destinations')}
              className={`transition-colors ${isActive('destinations') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Destinations
            </button>
            <button 
              onClick={() => onNavigation('mytrips')}
              className={`transition-colors ${isActive('mytrips') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              My Trips
            </button>
            <button 
              onClick={() => onNavigation('about')}
              className={`transition-colors ${isActive('about') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              About
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <CurrencySelector />
            <button 
              onClick={() => onNavigation('signin')}
              className={`transition-colors ${isActive('signin') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => onNavigation('signin')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={onMenuToggle}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <button 
              onClick={() => onNavigation('home')}
              className={`block w-full text-left px-3 py-2 transition-colors ${isActive('home') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigation('destinations')}
              className={`block w-full text-left px-3 py-2 transition-colors ${isActive('destinations') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Destinations
            </button>
            <button 
              onClick={() => onNavigation('mytrips')}
              className={`block w-full text-left px-3 py-2 transition-colors ${isActive('mytrips') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              My Trips
            </button>
            <button 
              onClick={() => onNavigation('about')}
              className={`block w-full text-left px-3 py-2 transition-colors ${isActive('about') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              About
            </button>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="px-3 py-2">
                <CurrencySelector />
              </div>
              <button 
                onClick={() => onNavigation('signin')}
                className={`block w-full text-left px-3 py-2 transition-colors ${isActive('signin') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => onNavigation('signin')}
                className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-2"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;