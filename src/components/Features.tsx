import React from 'react';
import { Bot, MapPin, Calendar, Star } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Recommendations',
      description: 'Get personalized suggestions based on your preferences, budget, and travel style.',
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: 'Discover Hidden Gems',
      description: 'Find unique places and experiences that match your interests and travel goals.',
      color: 'text-purple-600'
    },
    {
      icon: Calendar,
      title: 'Smart Itinerary Builder',
      description: 'Create detailed day-by-day plans with optimal routing and timing.',
      color: 'text-teal-600'
    },
    {
      icon: Star,
      title: 'Expert Local Insights',
      description: 'Access curated recommendations from locals and travel experts worldwide.',
      color: 'text-yellow-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose TRIPPING?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of travel planning with our AI-powered platform 
            that makes creating your perfect trip effortless and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-transform duration-200"
            >
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full group-hover:bg-gray-100 transition-colors">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;