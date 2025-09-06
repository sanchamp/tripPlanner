import React, { useState } from 'react';
import { Search, MapPin, Star, Users, Clock } from 'lucide-react';

const Destinations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Destinations' },
    { id: 'popular', name: 'Popular' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'culture', name: 'Culture' },
    { id: 'beach', name: 'Beach' },
    { id: 'city', name: 'City' }
  ];

  const destinations = [
    {
      id: 1,
      name: 'Tokyo, Japan',
      category: 'popular',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      reviews: 2847,
      duration: '5-7 days',
      description: 'Experience the perfect blend of traditional culture and modern innovation in Japan\'s bustling capital.',
      highlights: ['Shibuya Crossing', 'Tokyo Skytree', 'Senso-ji Temple', 'Tsukiji Fish Market']
    },
    {
      id: 2,
      name: 'Paris, France',
      category: 'culture',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.7,
      reviews: 3521,
      duration: '4-6 days',
      description: 'The City of Light offers world-class museums, iconic landmarks, and unparalleled culinary experiences.',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées']
    },
    {
      id: 3,
      name: 'Bali, Indonesia',
      category: 'beach',
      image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.6,
      reviews: 1923,
      duration: '6-8 days',
      description: 'Tropical paradise with stunning beaches, ancient temples, and vibrant cultural experiences.',
      highlights: ['Uluwatu Temple', 'Rice Terraces', 'Seminyak Beach', 'Ubud Monkey Forest']
    },
    {
      id: 4,
      name: 'New York, USA',
      category: 'city',
      image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.5,
      reviews: 4102,
      duration: '4-5 days',
      description: 'The city that never sleeps offers Broadway shows, world-class museums, and iconic skylines.',
      highlights: ['Statue of Liberty', 'Central Park', 'Times Square', 'Brooklyn Bridge']
    },
    {
      id: 5,
      name: 'Santorini, Greece',
      category: 'beach',
      image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
      reviews: 1654,
      duration: '3-5 days',
      description: 'Breathtaking sunsets, white-washed buildings, and crystal-clear waters make this a romantic paradise.',
      highlights: ['Oia Sunset', 'Red Beach', 'Fira Town', 'Wine Tasting']
    },
    {
      id: 6,
      name: 'Machu Picchu, Peru',
      category: 'adventure',
      image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      reviews: 987,
      duration: '3-4 days',
      description: 'Ancient Incan citadel perched high in the Andes, offering incredible history and stunning views.',
      highlights: ['Inca Trail', 'Huayna Picchu', 'Sacred Valley', 'Cusco City']
    }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Amazing Destinations
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover your next adventure from our curated collection of world-class destinations
            </p>
            
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations..."
                  className="w-full px-6 py-4 text-lg rounded-full text-gray-900 dark:text-white dark:bg-gray-800 pl-14 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {destination.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {destination.duration}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {destination.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-1" />
                    {destination.reviews.toLocaleString()} reviews
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Top Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Plan Trip to {destination.name.split(',')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No destinations found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;