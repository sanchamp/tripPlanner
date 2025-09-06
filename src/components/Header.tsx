import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
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
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Destinations</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">My Trips</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 transition-colors">Sign In</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Destinations</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">My Trips</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">About</a>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <button className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600">Sign In</button>
              <button className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-2">
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