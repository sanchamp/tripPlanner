import React from 'react';
import { User, Menu, X } from 'lucide-react';

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
            <User className="h-8 w-8 text-blue-600" />
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