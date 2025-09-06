import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Edit, Trash2, Download, Plus } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  status: 'planned' | 'ongoing' | 'completed';
  image: string;
  totalCost: string;
  activities: number;
}

const MyTrips: React.FC = () => {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'all' | 'planned' | 'ongoing' | 'completed'>('all');

  // Mock data - in a real app, this would come from an API or database
  const trips: Trip[] = [
    {
      id: '1',
      destination: 'Tokyo, Japan',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      travelers: 2,
      status: 'planned',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400',
      totalCost: formatPrice(2450),
      activities: 12
    },
    {
      id: '2',
      destination: 'Paris, France',
      startDate: '2024-01-10',
      endDate: '2024-01-17',
      travelers: 1,
      status: 'completed',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=400',
      totalCost: formatPrice(1890),
      activities: 8
    },
    {
      id: '3',
      destination: 'Bali, Indonesia',
      startDate: '2024-02-01',
      endDate: '2024-02-08',
      travelers: 4,
      status: 'ongoing',
      image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=400',
      totalCost: formatPrice(3200),
      activities: 15
    },
    {
      id: '4',
      destination: 'New York, USA',
      startDate: '2024-04-05',
      endDate: '2024-04-10',
      travelers: 3,
      status: 'planned',
      image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=400',
      totalCost: formatPrice(1650),
      activities: 10
    }
  ];

  const filteredTrips = activeTab === 'all' ? trips : trips.filter(trip => trip.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planned': return 'Planned';
      case 'ongoing': return 'Ongoing';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Trips</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Manage and track all your travel adventures</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Plan New Trip
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-8 w-fit">
          {[
            { id: 'all', label: 'All Trips', count: trips.length },
            { id: 'planned', label: 'Planned', count: trips.filter(t => t.status === 'planned').length },
            { id: 'ongoing', label: 'Ongoing', count: trips.filter(t => t.status === 'ongoing').length },
            { id: 'completed', label: 'Completed', count: trips.filter(t => t.status === 'completed').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Trips Grid */}
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                      {getStatusText(trip.status)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {trip.destination}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-2" />
                      {getDuration(trip.startDate, trip.endDate)}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      {trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      {trip.activities} activities planned
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-green-600">
                      {trip.totalCost}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      View Details
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No {activeTab !== 'all' ? activeTab : ''} trips found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {activeTab === 'all' 
                ? "You haven't planned any trips yet. Start your adventure today!"
                : `You don't have any ${activeTab} trips at the moment.`
              }
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Plan Your First Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;