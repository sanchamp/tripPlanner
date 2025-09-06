import React from 'react';
import { Users, Award, Globe, Heart, Sparkles, Shield, Clock, Star } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Happy Travelers', value: '50,000+' },
    { icon: Globe, label: 'Destinations', value: '200+' },
    { icon: Award, label: 'Awards Won', value: '15' },
    { icon: Star, label: 'Average Rating', value: '4.9' }
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Planning',
      description: 'Our advanced AI analyzes millions of data points to create personalized itineraries that match your unique preferences and travel style.'
    },
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'Your data is protected with enterprise-grade security. We partner only with verified providers to ensure safe and reliable travel experiences.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our dedicated travel experts are available around the clock to assist you before, during, and after your trip.'
    },
    {
      icon: Heart,
      title: 'Personalized Experience',
      description: 'Every recommendation is tailored to your interests, budget, and travel goals, ensuring each trip is uniquely yours.'
    }
  ];

  const team = [
    {
      name: 'Mithilesh',
      role: 'Data Architect',
      image: '/public/image.png',
      bio: 'Expert data architect with extensive experience in building scalable data solutions and analytics platforms.'
    },
    {
      name: 'Sandeep',
      role: 'Data Scientist',
      image: '/public/image.png',
      bio: 'Data scientist specializing in machine learning and AI-powered recommendation systems for travel planning.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Travel',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Travel enthusiast who has visited 80+ countries and specializes in creating authentic local experiences.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TRIPPING
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              We're on a mission to make travel planning effortless and inspiring. Using cutting-edge AI technology, 
              we help millions of travelers discover amazing destinations and create unforgettable experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  TRIPPING was born from a simple frustration: planning the perfect trip shouldn't take weeks of research. 
                  Our founders, avid travelers themselves, experienced firsthand the overwhelming process of sifting through 
                  countless websites, reviews, and recommendations.
                </p>
                <p>
                  In 2023, we set out to revolutionize travel planning by combining artificial intelligence with deep travel 
                  expertise. Our platform learns from millions of successful trips to provide personalized recommendations 
                  that save time and create better experiences.
                </p>
                <p>
                  Today, we're proud to help thousands of travelers discover their perfect destinations, from hidden local 
                  gems to world-famous landmarks, all tailored to their unique preferences and budget.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Travel planning"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We combine cutting-edge technology with human expertise to deliver travel planning that's both intelligent and personal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate travelers and technology experts working together to transform how you plan your adventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust TRIPPING to plan their perfect adventures.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg">
            Start Planning Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;