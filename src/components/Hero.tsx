import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartPlanning: (destination: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onStartPlanning }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onStartPlanning(searchQuery.trim());
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-yellow-500 mr-3" />
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              AI-Powered Travel Planning
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Plan Your Perfect Trip with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TRIPPING
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover hidden gems, create personalized itineraries, and get recommendations 
            tailored just for you. Your dream vacation is just a search away.
          </p>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Where would you like to go?"
                className="w-full px-6 py-4 text-lg rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-14 shadow-lg"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-md"
              >
                Plan Trip
              </button>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Tokyo, Japan', 'Paris, France', 'Bali, Indonesia', 'New York, USA'].map((destination) => (
              <button
                key={destination}
                onClick={() => {
                  setSearchQuery(destination);
                  onStartPlanning(destination);
                }}
                className="px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all"
              >
                {destination}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;